const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');
const SignatureVerifier = require('./fb-messenger/signature-verifier');

const app = express();

const signatureVerifier = new SignatureVerifier(config.facebook.appSecret);

app.set('config', config);
app.use(bodyParser.json({verify: signatureVerifier.verify}));
app.use(express.static('public'));

app.use(routes);

module.exports = app;
