var _ = require('lodash');
var Buffer = require('buffer').Buffer;
var helpers = require('../utils/helpers');

module.exports = function(fs) {
  return function(file, appendData, options) {
    var args = _.toArray(arguments);
    var appendCb = args.pop();
    var appendOptions = options === appendCb ? {} : options;

    helpers.exists(fs, file, function(err) {
      if (err) {
        return fs.writeFile(file, appendData, appendOptions, appendCb);
      }
      fs.readFile(file, function(err, data) {
        var dataBuffer = appendData instanceof Buffer ? appendData : new Buffer(appendData);
        data = Buffer.concat([data, dataBuffer]);
        fs.writeFile(file, data, appendOptions, appendCb);
      });
    });
  };
};
