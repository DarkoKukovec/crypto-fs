var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var options = {};
var configRef;

var common = {
  clean: function(_dir) {
    var dir = _dir || path.join(__dirname, 'test');
    var ignored = false;
    common.fileList(dir).forEach(function(file) {
      if (file.indexOf('.gitkeep') > -1) {
        ignored = true;
      } else {
        fs.unlinkSync(file);
      }
    });
    common.folderList(dir).forEach(function(folder) {
      ignored = common.clean(folder) || ignored;
    });
    if (!ignored) {
      fs.rmdirSync(dir);
    }
    return ignored;
  },

  fileList: function(dir) {
    var fileList = fileList || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
      var name = path.join(dir, files[i]);
      if (!fs.statSync(name).isDirectory()) {
        fileList.push(name);
      }
    }
    return fileList;
  },

  folderList: function(dir) {
    var folderList = folderList || [];
    var files = fs.readdirSync(dir);
    for (var i in files) {
      var name = path.join(dir, files[i]);
      if (fs.statSync(name).isDirectory()) {
        folderList.push(name);
      }
    }
    return folderList;
  },
  options: {
    backup: function(config) {
      options = {};
      configRef = config;
      _.extend(options, config);
    },
    restore: function() {
      _.extend(configRef, options);
    },
    set: function(opts) {
      _.extend(configRef, opts);
    }
  }
};

module.exports = common;
