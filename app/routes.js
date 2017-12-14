const express = require('express');
const router = express.Router();
const config = require('./config');
const HttpStatus = require('./utils/http-status');
const catLanguageInputValidator = require('./utils/cat-language-validator');
const Messenger = require('./fb-messenger/messenger');
const WebhookValidator = require('./fb-messenger/webhook-validator');
const WebhookHandler = require('./fb-messenger/webhook-handler');

const messenger = new Messenger({pageAccessToken: config.facebook.pageAccessToken, apiVersion: config.facebook.apiVersion})
const webhookValidator = new WebhookValidator(config.facebook.verifyToken);
const webhookHandler = new WebhookHandler();

webhookHandler.on('message', onReceivedMessage);

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

function onReceivedMessage({sender: {id: senderId}, message: {text}}) {
  if (catLanguageInputValidator.isValid(text)) {
    return sendValidInputResponse(senderId);
  }

  sendInvalidInputResponse(senderId);
}

function sendValidInputResponse(recipientId) {
  messenger.sendImage(recipientId, 'https://media.giphy.com/media/vFKqnCdLPNOKc/giphy.gif')
    .then(res => console.log(res))
    .catch(e => console.error(e.message));
}

function sendInvalidInputResponse(recipientId) {
  messenger.sendQuickReply(recipientId, 'Cat does not understand your language 🐈', [
    {
      content_type: 'text',
      title: 'Meow',
      payload: 'MEOW_CLICKED',
    },
    {
      content_type: 'text',
      title: 'Pusss',
      payload: 'PUSSS_CLICKED',
    },
    {
      content_type: 'text',
      title: 'Purrr',
      payload: 'PURRR_CLICKED',
    },
    {
      content_type: 'text',
      title: 'Nyaaar',
      payload: 'NYAAAR_CLICKED',
    }])
    .then(res => console.log(res))
    .catch(e => console.error(e.message));
}

module.exports = router;
