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
  console.log(event.message);

  //messenger.sendText(senderId, event.message.text.toUpperCase());
  //messenger.sendImage(senderId, 'https://media1.giphy.com/media/5scVaYq4hKA7u/giphy.gif');
  //messenger.sendAudio(senderId, 'https://7a1fd07e.ngrok.io/cat.mp3');
  //messenger.sendVideo(senderId, 'https://media.giphy.com/media/PcwpnqpwAfRK/giphy.mp4');
  //messenger.sendFile(senderId, 'https://7a1fd07e.ngrok.io/test.txt');

  // messenger.sendQuickReply(senderId, 'Choose wisely', [
  //   {
  //     content_type: 'text',
  //     title: '🐈 Meow',
  //     payload: 'MEOW_SELECTED'
  //   },
  //   {
  //     content_type: 'text',
  //     title: 'Purrr',
  //     image_url: 'https://7a1fd07e.ngrok.io/snow_globe.png',
  //     payload: 'PUR_SELECTED'
  //   },
  //   {
  //     content_type: 'location',
  //     title: 'Location 🌎'
  //   }
  // ]);

  // messenger.sendButtonTemplate(senderId, 'Choose wisely', [
  //   {
  //     type: 'web_url',
  //     'url': 'https://risan.io',
  //     "title": 'Homepage'
  //   },
  //   {
  //     type: 'postback',
  //     title: 'Do Magic',
  //     payload: 'MAGIC_SELECTED'
  //   }
  // ]);

  // messenger.sendGenericTemplate(senderId, [
  //   {
  //     title: "rift",
  //     subtitle: "Next-generation virtual reality",
  //     item_url: "https://www.oculus.com/en-us/rift/",
  //     image_url: 'https://risan.io/assets/img/social-image.jpg',
  //     buttons: [
  //       {
  //         type: "web_url",
  //         url: "https://www.oculus.com/en-us/rift/",
  //         title: "Open Web URL"
  //       }, 
  //       {
  //         type: "postback",
  //         title: "Call Postback",
  //         payload: "Payload for first bubble"
  //       }
  //     ]
  //   }, 
  //   {
  //     title: "touch",
  //     subtitle: "Your Hands, Now in VR",
  //     item_url: "https://www.oculus.com/en-us/touch/",
  //     image_url: 'https://risan.io/assets/img/upgrade-ssh-key-to-ed25519/key.jpg',
  //     buttons: [
  //       {
  //         type: "web_url",
  //         url: "https://www.oculus.com/en-us/touch/",
  //         title: "Open Web URL"
  //       }, 
  //       {
  //         type: "postback",
  //         title: "Call Postback",
  //         payload: "Payload for second bubble"
  //       }
  //     ]
  //   }
  // ]);

  // messenger.sendListTemplate(senderId, 'large', [
  //   {
  //     title: "rift",
  //     subtitle: "Next-generation virtual reality",
  //     image_url: 'https://risan.io/assets/img/social-image.jpg',
  //     buttons: [
  //       {
  //         title: "View",
  //         type: "web_url",
  //         url: "https://risan.io",
  //         webview_height_ratio: "tall"
  //       }
  //     ]
  //   },
  //   {
  //     title: "AI",
  //     subtitle: "Next-generation AI",
  //     image_url: 'https://risan.io/assets/img/upgrade-ssh-key-to-ed25519/key.jpg',
  //     buttons: [
  //       {
  //         title: "View",
  //         type: "web_url",
  //         url: "https://risan.io",
  //         webview_height_ratio: "tall"
  //       }
  //     ]
  //   }
  // ]);

  // messenger.sendOpenGraphTemplate(senderId, [
  //   {
  //     url: "https://open.spotify.com/track/7GhIk7Il098yCjg4BQjzvb",
  //     buttons: [
  //       {
  //         type: "web_url",
  //         url: "https://en.wikipedia.org/wiki/Rickrolling",
  //         title: "View More"
  //       }
  //     ]
  //   }
  // ]);

  // messenger.sendReceiptTemplate(senderId, {
  //   recipient_name: "Peter Chang",
  //   order_number: 1234567,
  //   currency: "USD",
  //   payment_method: "Visa 1234",
  //   timestamp: "1428444852",
  //   address: {
  //     street_1: "1 Hacker Way",
  //     street_2: "",
  //     city: "Menlo Park",
  //     postal_code: "94025",
  //     state: "CA",
  //     country: "US"
  //   },
  //   summary: {
  //     subtotal: 698.99,
  //     shipping_cost: 20.00,
  //     total_tax: 57.67,
  //     total_cost: 626.66
  //   },
  //   adjustments: [
  //     {
  //       name: "New Customer Discount",
  //       amount: -50
  //     }, 
  //     {
  //       name: "$100 Off Coupon",
  //       amount: -100
  //     }
  //   ]
  // }, 
  // [
  //   {
  //     title: "Oculus Rift",
  //     subtitle: "Includes: headset, sensor, remote",
  //     quantity: 1,
  //     price: 599.00,
  //     currency: "USD",
  //     image_url: 'https://risan.io/assets/img/social-image.jpg' 
  //   }, 
  //   {
  //     title: "Samsung Gear VR",
  //     subtitle: "Frost White",
  //     quantity: 1,
  //     price: 99.99,
  //     currency: "USD",
  //     image_url: 'https://risan.io/assets/img/upgrade-ssh-key-to-ed25519/key.jpg' 
  //   }
  // ]);

  messenger.sendMediaTemplate(senderId, [
    {
      media_type: "video",
      url: 'https://business.facebook.com/ustadzkhalid/videos/570900843242482'
    }
  ]);
}

module.exports = router;
