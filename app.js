const express = require('express');
const config = require('config');

const app = express();

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

app.listen(config.port, function () {
  console.log(`✨ Listening on port ${config.port}.`);
});
