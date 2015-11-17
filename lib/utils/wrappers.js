var crypto = require('./crypto');
var config = require('../config');
var filename = require('./filename');
var helpers = require('./helpers');
var _ = require('lodash');
var async = require('async');

module.exports = function() {
  return {
    readAsync: function(fn) {
      return function(file) {
        config.check();
        var args = _.toArray(arguments);
        var enc = typeof args[1] !== 'function' && args[1];
        var cb = args.pop();
        filename.getPath(file, function(newPath) {
          args[0] = newPath;
          args[1] = null;
          args.push(helpers.asyncCb(cb, function(data) {
            var key = filename.decryptAbsolute(args[0]);
            var buffer = crypto.decryptBuffer(data, key);
            return helpers.formatBuffer(buffer, enc);
          }));
          config.baseFs[fn].apply(config.baseFs, args);
        });
      };
    },

    readSync: function(fn) {
      return function(file) {
        config.check();
        var args = _.toArray(arguments);
        var encoding = args[1];
        args[0] = filename.getPathSync(file);
        args[1] = null;
        var data = config.baseFs[fn].apply(config.baseFs, args);
        var key = filename.decryptAbsolute(args[0]);
        var buffer = crypto.decryptBuffer(data, key);
        return helpers.formatBuffer(buffer, encoding);
      };
    },

    fs: function(fn, pathCount, skipSymlink) {
      return function() {
        config.check();
        var args = _.toArray(arguments);
        async.times(pathCount, function(index, next) {
          filename.getPath(args[index], skipSymlink, function(newPath) {
            args[index] = newPath;
            next();
          });
        }, function(err, users) {
          config.baseFs[fn].apply(config.baseFs, args);
        });
      };
    },

    fsSync: function(fn, pathCount, skipSymlink) {
      return function() {
        config.check();
        var args = _.toArray(arguments);
        for (var i = 0; i < pathCount; i++) {
          args[i] = filename.getPathSync(args[i], skipSymlink);
        }
        return config.baseFs[fn].apply(config.baseFs, args);
      };
    },

    write: function(fn) {
      return function(file, data, opts) {
        var encoding = helpers.getEncoding(opts, 'utf-8');
        config.check();
        var args = _.toArray(arguments);
        filename.getPath(file, function(newPath) {
          args[0] = newPath;
          args[1] = crypto.encryptBuffer(data, file, encoding);
          return config.baseFs[fn].apply(config.baseFs, args);
        });
      };
    },

    writeSync: function(fn) {
      return function(file, data, opts) {
        var encoding = helpers.getEncoding(opts, 'utf-8');
        config.check();
        var args = _.toArray(arguments);
        args[0] = filename.getPathSync(file);
        args[1] = crypto.encryptBuffer(data, file, encoding);
        return config.baseFs[fn].apply(config.baseFs, args);
      };
    }
  };
};
