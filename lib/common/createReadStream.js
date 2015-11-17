var config = require('../config');
var filename = require('../utils/filename');
var helpers = require('../utils/helpers');
var crypto = require('../utils/crypto');

module.exports = function() {
  return function(file, fsOptions) {
    fsOptions = fsOptions || {};
    var filePath = filename.getPathSync(file);
    var encoding = helpers.getEncoding(fsOptions);
    fsOptions.encoding = 'binary';

    var fstream = config.baseFs.createReadStream(filePath, fsOptions);
    var cstream = crypto.getDecryptStream(encoding, file);

    return fstream.pipe(cstream);
  };
};
