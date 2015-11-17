var _ = require('lodash');
var config = require('../config');
var filename = require('../utils/filename');

module.exports = function() {
  return function(file) {
    var args = _.toArray(arguments);
    args[0] = filename.getPathSync(file);
    var cb = args.pop();
    args.push(function(eventName, file) {
      if (file === null) {
        return cb(eventName, file);
      }
      cb(eventName, filename.decrypt(file || ''));
    });
    return config.baseFs.watch.apply(config.baseFs, args);
  };
};
