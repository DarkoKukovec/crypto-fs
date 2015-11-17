var config = require('../config');
var filename = require('../utils/filename');
var helpers = require('../utils/helpers');
var crypto = require('../utils/crypto');
var _ = require('lodash');

module.exports = function() {
  return function(file, fsOptions) {
  fsOptions = fsOptions || {};
    var filePath = filename.getPathSync(file);
    var encoding = helpers.getEncoding(fsOptions, null, 'defaultEncoding');
    fsOptions.defaultEncoding = 'binary';

    var fstream = config.baseFs.createWriteStream(filePath, fsOptions);
    var cipher = crypto.getCipher(file);

    fstream.cryptoWrite = fstream.write;
    fstream.cryptoEnd = fstream.end;
    fstream.write = function(data) {
      var args = _.toArray(arguments);
      args[0] = cipher.update(data, encoding, 'binary');
      fstream.cryptoWrite.apply(fstream, args);
    };
    fstream.end = function(data) {
      if (data) {
        fstream.write.apply(fstream, arguments);
      }
      fstream.cryptoWrite(cipher.final(), 'binary');
      fstream.cryptoEnd();
    };

    return fstream;
  };
};
