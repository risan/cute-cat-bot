const config = require('config');
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();
let catVideoIds = [];

app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function (req, res) {
  res.send("Hello I'm a Cute Cat Bot 🐱");
});

app.get('/webhook', function (req, res) {
  if (req.query['hub.mode'] === 'subscribe' && req.query['hub.verify_token'] === config.verify_token) {
    console.log('Validating token.');
    return res.send(req.query['hub.challenge']);
  }

  console.error('👎 Failed validation. Make sure the validation tokens match.');
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

  console.log(`[${timestamp}][${senderId}] via [${recipientId}]: ${messageString}`);

  const messageText = message.text;
  const messageAttachment = message.attachments;

  if (messageText) {
    sendTextMessage(senderId, messageText);
  } else if (messageAttachment) {
    sendTextMessage(senderId, 'Message with attachment is received 📎');
  }
}

function sendTextMessage(recipientId, message) {
  sendMessage({
    recipient: {
      id: recipientId
    },
    message: {
      text: getRandomCatVideoUrl()
    }
  });
}

function sendMessage(data) {
  request({
    method: 'POST',
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {
      access_token: config.page_access_token
    },
    json: data
  }, function (error, response, body) {
    if (! error && response.statusCode === 200) {
      console.log(`👍 Successfully sent a message #${body.message_id} to ${body.recipient_id}.`);
    } else {
      console.error('👎 Unable to send message.');
      console.error(error);
      console.error(response);
    }
  });
}

function retrieveCatVideoIds(onSuccess) {
  request({
    method: 'GET',
    uri: 'https://graph.facebook.com/v2.6/HappyCatsOnline/videos',
    qs: {
      access_token: config.page_access_token
    },
  }, function (error, response, body) {
    if (! error && response.statusCode === 200) {
      body = JSON.parse(body);
      const data = body.data;
      let videoIds = [];

      data.forEach(function (item) {
        videoIds.push(item.id);
      });

      onSuccess(videoIds);
      console.log(`👍 Successfully fetch ${videoIds.length} cat videos.`);
    } else {
      console.error('👎 Unable to fetch cat videos.');
      console.error(error);
      console.error(response);
    }
  });
}

function getRandomCatVideoUrl() {
  const id = catVideoIds[Math.floor(Math.random() * catVideoIds.length)];

  return `https://www.facebook.com/HappyCatsOnline/videos/${id}`;
}

app.listen(config.port, function () {
  retrieveCatVideoIds(function (videoIds) {
    catVideoIds = videoIds;
  });

  console.log(`✨ Listening on port ${config.port}.`);
});
