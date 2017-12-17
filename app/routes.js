const express = require('express');

const router = express.Router();
const config = require('./config');
const Reply = require('./reply');
const HttpStatus = require('./utils/http-status');
const catLanguageInputValidator = require('./utils/cat-language-validator');
const WebhookValidator = require('./fb-messenger/webhook-validator');
const WebhookHandler = require('./fb-messenger/webhook-handler');

const reply = new Reply();
const webhookValidator = new WebhookValidator(config.facebook.verifyToken);
const webhookHandler = new WebhookHandler();

webhookHandler.on('message', ({ sender: { id: senderId }, message: { text } }) => {
  if (catLanguageInputValidator.isValid(text)) {
    return reply.sendRandomCatGif(senderId);
  }

  return reply.sendForInvalidInput(senderId);
});

router.get('/webhook', (req, res) => {
  try {
    const challange = webhookValidator.validate(req);
    res.status(HttpStatus.OK).send(challange);
  } catch (e) {
    console.error(e.message);
    res.status(HttpStatus.FORBIDDEN).send(e.message);
  }
});

router.post('/webhook', (req, res) => {
  webhookHandler.handle(req);
  return res.status(HttpStatus.OK).send('Webhook is received 👍');
});

module.exports = router;
