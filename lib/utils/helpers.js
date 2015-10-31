var path = require('path');
var filename = require('./filename');

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

function reverseFilenameMap(folder) {
  return function(fileName) {
    var filePath = path.join(filename.encrypt(folder), fileName);
    var file = filename.decrypt(filePath);
    return file.split('/').pop();
  };
}

module.exports = {
  asyncCb: asyncCb,
  formatBuffer: formatBuffer,
  reverseFilenameMap: reverseFilenameMap
};
