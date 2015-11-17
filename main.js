var init = require('./lib/init');
var config = require('./lib/config');

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
  'readlink',
  'rename' // requires readFile, writeFile and unlink
];

var lib = {
  init: init
};

proxyMethods.forEach(function(method) {
  lib[method] = config.baseFs[method].bind(config.baseFs);
  lib[method + 'Sync'] = config.baseFs[method + 'Sync'].bind(config.baseFs);
});

var wrapper = require('./lib/utils/wrappers')(lib);
wrappedMethods.forEach(function(method) {
  lib[method] = wrapper.fs(method, 1, false);
  lib[method + 'Sync'] = wrapper.fsSync(method + 'Sync', 1, false);
});

lib.symlink = wrapper.fs('symlink', 2, false);
lib.symlinkSync = wrapper.fsSync('symlinkSync', 2, false);

implementedMethods.forEach(function(method) {
  lib[method] = require('./lib/async/' + method)(lib);
  lib[method + 'Sync'] = require('./lib/sync/' + method)(lib);
});

lib.watch = require('./lib/common/watch')(lib);
lib.watchFile = wrapper.fsSync('watchFile', 1);
lib.unwatchFile = wrapper.fsSync('unwatchFile', 1);
lib.createReadStream = require('./lib/common/createReadStream')(lib);
lib.createWriteStream = require('./lib/common/createWriteStream')(lib);

module.exports = Object.freeze(lib);
