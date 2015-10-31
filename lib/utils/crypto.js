var crypto = require('crypto');
var Buffer = require('buffer').Buffer;

var config = require('../config');
var CryptoStream = require('./crypto-stream');

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

function processBuffer(data, key, cipherMethod, inputEncoding, outputEncoding) {
  var cipher = cipherMethod(key);
  var processed = Buffer.concat([cipher.update(data, inputEncoding, outputEncoding), cipher.final(outputEncoding)]);
  return processed;
}

module.exports = {
  encryptBuffer: function(data, key, inputEncoding) {
    return processBuffer(data, key, getCipher, inputEncoding);
  },

  decryptBuffer: function(data, key, outputEncoding) {
    return processBuffer(data, key, getDecipher, null, outputEncoding);
  },

  getDecryptStream: function(encoding, key) {
    return new CryptoStream({
      inputEncoding: 'binary',
      outputEncoding: encoding
    }, getDecipher(key));
  },
  getCipher: getCipher
};
