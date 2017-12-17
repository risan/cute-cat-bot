const InputValidator = require('./input-validator');

const inputValidator = new InputValidator([
  'meow',
  'meooow',
  'meaw',
  'puss',
  'pusss',
  'puush',
  'puuush',
  'purr',
  'purrr',
  'nyar',
  'nyaar',
  'nyaaar',
  'nyarr',
  'nyarrr'
]);

module.exports = inputValidator;
