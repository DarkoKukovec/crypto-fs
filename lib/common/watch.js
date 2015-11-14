var _ = require('lodash');
var config = require('../config');
var filename = require('../utils/filename');

module.exports = function(file) {
  var args = _.toArray(arguments);
  args[0] = filename.getPath(file);
  var cb = args.pop();
  args.push(function(eventName, file) {
    cb(eventName, filename.decrypt(file));
  });
  return config.baseFs.watch.apply(config.baseFs, args);
};
