var config = require('../config');
var filename = require('../utils/filename');
var helpers = require('../utils/helpers');
var crypto = require('../utils/crypto');
var OffsetStream = require('more-streams/OffsetStream');

module.exports = function() {
  return function(file, fsOptions) {
    fsOptions = fsOptions || {};
    var filePath = filename.getPathSync(file);
    var start = fsOptions.start;
    var end = fsOptions.end;
    var encoding = helpers.getEncoding(fsOptions);
    
    fsOptions.encoding = 'binary';
    delete fsOptions.start;
    delete fsOptions.end;

    var fstream = config.baseFs.createReadStream(filePath, fsOptions);
    var cstream = crypto.getDecryptStream(encoding, file);
    
    if(start || end) {
      return fstream.pipe(cstream).pipe(new OffsetStream({start:start,end:end}));
    }

    return fstream.pipe(cstream);
  };
};
