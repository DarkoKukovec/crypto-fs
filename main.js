var init = require('./lib/init');
var wrapper = require('./lib/utils/wrappers');

var wrapperMethods = [
  'exists',
  'mkdir',
  'rmdir',
  'stat',
  'unlink',
  'access'
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

wrapperMethods.forEach(function(method) {
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
