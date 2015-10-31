var config = require('../config');
var crypto = require('./crypto');
var path = require('path');

function encrypt(filePath) {
  var pathArray = filePath.split(/\\|\//g);
  var encName = processSegment(pathArray, [], function(name, key) {
    var enc = config.prefix + crypto.encryptBuffer(name, key).toString('hex');
    return {
      processed: enc,
      key: name
    };
  });
  return path.join.apply(path, encName);
}

function decrypt(filePath) {
  var pathArray = filePath.split(/\\|\//g);
  var decName = processSegment(pathArray, [], function(name, key) {
    var dec = crypto.decryptBuffer(new Buffer(name.slice(config.prefix.length), 'hex'), key).toString();
    return {
      processed: dec,
      key: dec
    };
  });
  return path.join.apply(path, decName);
}

function processSegment(pathArray, parent, processFn) {
  var key = parent.join(':');
  var name = pathArray.shift();
  var res = processFn(name, key);
  var procName = [res.processed];
  if (pathArray.length) {
    parent.push(res.key);
    procName = procName.concat(processSegment(pathArray, parent, processFn));
  }
  return procName;
}

function getPath(file) {
  config.check();
  var name = encrypt(file);
  return path.join(config.root, name);
}

module.exports = {
  encrypt: encrypt,
  decrypt: decrypt,
  getPath: getPath
};
