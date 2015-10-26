// Defaults
var config = {
  baseFs: require('fs'),
  algorithm: 'aes-256-ctr',
  prefix: '',
  iv: null,
  realSize: false
};

config.check = function() {
  if (!config.initialized) {
    throw new Error('You need to call the init function first');
  }
};

module.exports = config;
