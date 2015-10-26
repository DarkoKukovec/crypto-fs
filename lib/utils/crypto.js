var crypto = require('crypto');
var Buffer = require('buffer').Buffer;

var config = require('../config');

function getCipher(key) {
  var password = key || config.password;
  if (config.iv) {
    return crypto.createCipheriv(config.algorithm, password, config.iv);
  } else {
    return crypto.createCipher(config.algorithm, password);
  }
}

function getDecipher(key) {
  var password = key || config.password;
  if (config.iv) {
    return crypto.createDecipheriv(config.algorithm, password, config.iv);
  } else {
    return crypto.createDecipher(config.algorithm, password);
  }
}

module.exports = {
  encryptBuffer: function(data, key) {
    var cipher = getCipher(key);
    var crypted = Buffer.concat([cipher.update(data), cipher.final()]);
    return crypted;
  },

  decryptBuffer: function(data, key) {
    var decipher = getDecipher(key);
    var dec = Buffer.concat([decipher.update(data), decipher.final()]);
    return dec;
  }
};
