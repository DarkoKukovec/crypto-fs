var crypto = require('crypto');
var Buffer = require('buffer').Buffer;

var config = require('../config');

function getCipher(key) {
  return createCipher(key, 'createCipher');
}

function getDecipher(key) {
  return createCipher(key, 'createDecipher');
}

function getHash(data) {
  var shasum = crypto.createHash('sha1');
  shasum.update(data);
  return shasum.digest('hex');
}

function createCipher(key, method) {
  var password = getHash(config.password + ':' + key);
  if (config.iv) {
    return crypto[method + 'iv'](config.algorithm, password, config.iv);
  } else {
    return crypto[method](config.algorithm, password);
  }
}

function processBuffer(data, key, cipherMethod) {
  var cipher = cipherMethod(key);
  var processed = Buffer.concat([cipher.update(data), cipher.final()]);
  return processed;
}

module.exports = {
  encryptBuffer: function(data, key) {
    return processBuffer(data, key, getCipher);
  },

  decryptBuffer: function(data, key) {
    return processBuffer(data, key, getDecipher);
  }
};
