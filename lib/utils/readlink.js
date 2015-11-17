var config = require('../config');
var path = require('path');
var async = require('async');

function expandPath(linkPath, cb) {
  async.forever(function(next) {
    if (linkPath.length <= config.root.length) {
      return next(linkPath);
    }
    config.baseFs.lstat(linkPath, function (err, stat) {
      if (!stat || !stat.isSymbolicLink()) {
        return next(linkPath);
      }
      config.baseFs.readlink(linkPath, function(err, newPath) {
        if (err || newPath === linkPath) {
          return next(linkPath);
        }
        linkPath = newPath;
        next();
      });
    });
  }, cb);
}

function expandPathSync(linkPath) {
  var prevPath;
  do {
    prevPath = linkPath
    // TODO: Find a better way to determine if linkPath is inside of config.root
    if (linkPath.length > config.root.length) {
      try {
        config.baseFs.lstatSync(linkPath)
      } catch(e) {
        return linkPath;
      }
      if (config.baseFs.lstatSync(linkPath).isSymbolicLink()) {
        linkPath = config.baseFs.readlinkSync(linkPath);
      }
    }
  } while(prevPath !== linkPath);
  return linkPath;
}

function getSubPaths(link) {
  if (link[0] !== '/' || link.indexOf(':') === -1) {
    link = path.resolve(process.cwd(), link);
  }

  return link.split(/\/|\\/g).splice(1);
}

function getRootPath() {
  // return path.parse(link).root;
  var rootPath = process.cwd().split(path.sep);
  return path.join(rootPath[0], path.sep);
}

module.exports = {
  async: function(link, cb) {
    var result = getRootPath();
    var subPaths = getSubPaths(link);
    async.eachSeries(subPaths, function(subPath, next) {
      expandPath(path.join(result, subPath), function(nextPath) {
        result = path.resolve(result, nextPath);
        next();
      });
    }, function(err) {
      cb(err, path.normalize(result));
    });
  },

  sync: function(link) {
    var result = getRootPath();
    var subPaths = getSubPaths(link);
    subPaths.forEach(function(subPath) {
      result = path.resolve(result, expandPathSync(path.join(result, subPath)));
    });
    return path.normalize(result);
  }
};
