const express = require('express');
const router = express.Router();
const request = require('request');
const config = require('./config');
const HttpStatus = require('./utils/http-status');
const WebhookValidator = require('./fb-messenger/webhook-validator');
const WebhookHandler = require('./fb-messenger/webhook-handler');

const webhookValidator = new WebhookValidator(config.facebook.verifyToken);
const webhookHandler = new WebhookHandler();

router.get('/webhook', (req, res) => {
  try {
    const challange = webhookValidator.validate(req);
    res.status(HttpStatus.OK).send(challange);
  } catch (e) {
    console.error(e);
    res.status(HttpStatus.FORBIDDEN).send(e.message);
  }
});

router.post('/webhook', (req, res) => {
  webhookHandler.handle(req, {
    onReceivedMessage
  });

  return res.status(HttpStatus.OK).send('Webhook is received 👍');
});

function onReceivedMessage(event) {
  const senderId = event.sender.id;

  sendMessage({
    recipient: {
      id: senderId
    },
    message: {
      text: 'Hello World 🌎'
    }
  });
}

function sendMessage(data) {
  request({
    method: 'POST',
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: config.facebook.pageAccessToken
    },
    json: data
  }, (error, response, body) => {
    if (!error && response.statusCode === HttpStatus.OK) {
      return console.log(`👍 Successfully sent a message #${body.message_id} to ${body.recipient_id}.`);
    }

    console.error('👎 Unable to send message.');
    console.error(body.error);
  });
}

module.exports = router;
