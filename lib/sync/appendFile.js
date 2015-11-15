var Buffer = require('buffer').Buffer;
var helpers = require('../utils/helpers');

module.exports = function(fs) {
  return function(file, appendData, options) {
    if (helpers.existsSync(fs, file)) {
      var data = fs.readFileSync(file);
      var dataBuffer = appendData instanceof Buffer ? appendData : new Buffer(appendData);
      data = Buffer.concat([data, dataBuffer]);
      return fs.writeFileSync(file, data, options);
    } else {
      return fs.writeFileSync(file, appendData, options);
    }
  };
};
