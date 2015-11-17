var path = require('path');
var config = require('../config');
var readlink = require('./readlink');

function asyncCb(cb, success) {
  return function (err, data) {
    if (err) {
      cb(err, null);
    } else {
      cb(err, success(data));
    }
  };
}

function formatBuffer(buffer, enc) {
  if (enc) {
    return buffer.toString(enc);
  } else {
    return buffer;
  }
}

function reverseFilenameMap(filename, folder) {
  return function(fileName) {
    var filePath = path.join(filename.encrypt(folder), fileName);
    var file = filename.decrypt(filePath);
    return file.split('/').pop();
  };
}

function getEncoding(options, defaultEncoding, key) {
  var encodingKey = key || 'encoding';
  if (typeof options === 'object' && options[encodingKey]) {
    return options[encodingKey];
  } else if (typeof options === 'string') {
    return options;
  }
  return defaultEncoding;
}

function existsSync(fs, file) {
  if (config.baseFs.accessSync) {
    try {
      fs.accessSync(file);
      return true;
    } catch(e) {
      return false;
    }
  }
  return fs.existsSync(file);
}

function exists(fs, file, cb) {
  if (config.baseFs.access) {
    fs.access(file, cb);
  } else {
    fs.exists(file, function(exists) {
      cb(!exists);
    });
  }
}

function followSymlink(filePath, cb) {
  readlink.async(filePath, function(err, symlinkPath) {
    cb(symlinkPath);
  });
}

function followSymlinkSync(filePath) {
  return readlink.sync(filePath);
}

module.exports = {
  asyncCb: asyncCb,
  formatBuffer: formatBuffer,
  reverseFilenameMap: reverseFilenameMap,
  getEncoding: getEncoding,
  exists: exists,
  existsSync: existsSync,
  followSymlink: followSymlink,
  followSymlinkSync: followSymlinkSync
};
