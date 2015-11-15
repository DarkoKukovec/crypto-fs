var crypto = require('./crypto');
var config = require('../config');
var filename = require('./filename');
var helpers = require('./helpers');
var _ = require('lodash');

module.exports = {
  readAsync: function(fn) {
    return function(file) {
      config.check();
      var args = _.toArray(arguments);
      var enc = typeof args[1] !== 'function' && args[1];
      var cb = args.pop();
      args[0] = filename.getPath(file);
      args[1] = null;
      args.push(helpers.asyncCb(cb, function(data) {
        var buffer = crypto.decryptBuffer(data, file);
        return helpers.formatBuffer(buffer, enc);
      }));
      config.baseFs[fn].apply(config.baseFs, args);
    };
  },

  readSync: function(fn) {
    return function(file) {
      config.check();
      var args = _.toArray(arguments);
      var encoding = args[1];
      args[0] = filename.getPath(file);
      args[1] = null;
      var data = config.baseFs[fn].apply(config.baseFs, args);
      var buffer = crypto.decryptBuffer(data, file);
      return helpers.formatBuffer(buffer, encoding);
    };
  },

  fs: function(fn) {
    return function(file) {
      config.check();
      var args = _.toArray(arguments);
      args[0] = filename.getPath(file);
      return config.baseFs[fn].apply(config.baseFs, args);
    };
  },

  write: function(fn) {
    return function(file, data, opts) {
      var encoding = helpers.getEncoding(opts, 'utf8');
      config.check();
      var args = _.toArray(arguments);
      args[0] = filename.getPath(file);
      args[1] = crypto.encryptBuffer(data, file, encoding);
      return config.baseFs[fn].apply(config.baseFs, args);
    };
  }
};
