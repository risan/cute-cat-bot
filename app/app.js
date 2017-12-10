const config = require('./config');
const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./routes');

const app = express();

app.set('config', config);
app.use(bodyParser.json());
app.use(express.static('public'));

app.use(routes);

module.exports = app;
