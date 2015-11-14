var config = require('../config');
var filename = require('../utils/filename');
var crypto = require('../utils/crypto');

module.exports = function(file, fsOptions) {
  fsOptions = fsOptions || {};
  var filePath = filename.getPath(file);
  var encoding = typeof fsOptions.encoding === 'string' ? fsOptions.encoding : null;
  fsOptions.encoding = 'binary';

  var fstream = config.baseFs.createReadStream(filePath, fsOptions);
  var cstream = crypto.getDecryptStream(encoding, file);

  return fstream.pipe(cstream);
};
