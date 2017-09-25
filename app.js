require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const path = require('path');
const catVideoUrl = require('./cat-video-url');

const app = express();

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.type('text/plain').send("Hello I'm a Cute Cat Bot 🐱");
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === process.env.FB_VERIFY_TOKEN) {
    return res.send(req.query['hub.challenge']);
  }

  return res.status(403).send('👎 403 Forbidden.');
});

app.post('/webhook', function (req, res) {
  const data = req.body;

  if (data.object === 'page') {
    data.entry.forEach(function (pageEntry) {
      pageEntry.messaging.forEach(function (messagingEvent) {
        if (messagingEvent.message) {
          onMessageReceived(messagingEvent);
        } else {
          console.log('👎 Webhook is received. Unknown messaging event: ', messagingEvent);
        }
      });
    });
  }

  return res.status(200).send('👍 200 Ok.');
});

function onMessageReceived(event) {
  const senderId = event.sender.id;
  const recipientId = event.recipient.id;
  const timestamp = event.timestamp;
  const message = event.message;
  const messageString = JSON.stringify(message);
  const messageText = message.text;
  const messageAttachment = message.attachments;

  if (messageText) {
    sendRandomCatMessage(senderId);
  } else if (messageAttachment) {
    sendRandomCatMessage(senderId);
  }
}

function sendRandomCatMessage(recipientId) {
  sendMessage({
    recipient: {
      id: recipientId
    },
    message: {
      attachment: {
        type: 'video',
        payload: {
          url: catVideoUrl.random()
        }
      }
    }
  });
}

function sendMessage(data) {
  request({
    method: 'POST',
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: process.env.FB_PAGE_ACCESS_TOKEN
    },
    json: data
  }, function (error, response, body) {
    if (! error && response.statusCode === 200) {
      return console.log(`👍 Successfully sent a message #${body.message_id} to ${body.recipient_id}.`);
    }

    console.error('👎 Unable to send message.');
    console.error(error);
    console.error(response);
  });
}

app.post('/320859818:AAEtttNVMaWNoQuw8UigKgnNEMOVAbBR3go', function (req, res) {
  const data = req.body;

  if (! data.message) {
    return res.send('👍 Ok 200.');
  }

  request({
    method: 'POST',
    uri: 'https://api.telegram.org/bot320859818:AAEtttNVMaWNoQuw8UigKgnNEMOVAbBR3go/sendMessage',
    json: {
      chat_id: data.message.chat.id,
      text: data.message.text
    }
  }, function (error, response, body) {
    if (! error && response.statusCode === 200) {
      return res.send('👍 Message is sent.');
    }

    console.error(error);
    console.error(response);
    return res.status(response.statusCode).send(`👎 Error occured: ${error}`);
  });
});

app.listen(process.env.PORT, function () {
  console.log(`✨ Listening on port ${process.env.PORT}.`);
});
