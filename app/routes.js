const express = require('express');
const router = express.Router();
const config = require('./config');
const HttpStatus = require('./utils/http-status');
const Messenger = require('./fb-messenger/messenger');
const WebhookValidator = require('./fb-messenger/webhook-validator');
const WebhookHandler = require('./fb-messenger/webhook-handler');

const messenger = new Messenger({pageAccessToken: config.facebook.pageAccessToken, apiVersion: config.facebook.apiVersion})
const webhookValidator = new WebhookValidator(config.facebook.verifyToken);
const webhookHandler = new WebhookHandler();

webhookHandler.on('message', onReceivedMessage);

router.get('/webhook', (req, res) => {
  try {
    console.log('Validating webhook...');
    const challange = webhookValidator.validate(req);
    res.status(HttpStatus.OK).send(challange);
  } catch (e) {
    console.error(e.message);
    res.status(HttpStatus.FORBIDDEN).send(e.message);
  }
});

router.post('/webhook', (req, res) => {
  webhookHandler.handle(req);
  console.log('Webhook is received 👍');
  return res.status(HttpStatus.OK).send('Webhook is received 👍');
});

function onReceivedMessage(event) {
  const senderId = event.sender.id;
  console.log(`Received message from ${senderId}`);

  messenger.sendText(senderId, event.message.text.toUpperCase());
  //messenger.sendImage(senderId, 'https://media1.giphy.com/media/5scVaYq4hKA7u/giphy.gif');
}

module.exports = router;
