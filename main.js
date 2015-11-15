var init = require('./lib/init');
var config = require('./lib/config');
var wrapper = require('./lib/utils/wrappers');

var proxyMethods = [
  'fstat',
  'close',
  'futimes',
  'fchown',
  'fchmod'
];

var wrappedMethods = [
  'exists',
  'mkdir',
  'rmdir',
  'stat',
  'unlink',
  'access',
  'utimes',
  'chown',
  'chmod',
  'lstat',
  'lchown',
  'lchmod'
];

var implementedMethods = [
  'readFile',
  'writeFile',
  'appendFile', // requires readFile, writeFile and access
  'readdir',
  'rename' // requires readFile, writeFile and unlink
];

var lib = {
  init: init
};

proxyMethods.forEach(function(method) {
  lib[method] = config.baseFs[method].bind(config.baseFs);
  lib[method + 'Sync'] = config.baseFs[method + 'Sync'].bind(config.baseFs);
});

wrappedMethods.forEach(function(method) {
  lib[method] = wrapper.fs(method);
  lib[method + 'Sync'] = wrapper.fs(method + 'Sync');
});

implementedMethods.forEach(function(method) {
  lib[method] = require('./lib/async/' + method)(lib);
  lib[method + 'Sync'] = require('./lib/sync/' + method)(lib);
});

lib.watch = require('./lib/common/watch');
lib.watchFile = wrapper.fs('watchFile');
lib.unwatchFile = wrapper.fs('unwatchFile');
lib.createReadStream = require('./lib/common/createReadStream');
lib.createWriteStream = require('./lib/common/createWriteStream');

module.exports = Object.freeze(lib);
