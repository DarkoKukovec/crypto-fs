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

var watchMethods = [
  'watchFile',
  'unwatchFile'
];

var implementedMethods = [
  'readFile',
  'writeFile',
  'readdir',
  'rename' // requires reqdFile, writeFile and unlink
];

var lib = {
  init: init
};

wrapperMethods.forEach(function(method) {
  lib[method] = wrapper.fs(method);
  lib[method + 'Sync'] = wrapper.fs(method + 'Sync');
});

watchMethods.forEach(function(method) {
  lib[method] = wrapper.fs(method);
});

implementedMethods.forEach(function(method) {
  lib[method] = require('./lib/async/' + method)(lib);
  lib[method + 'Sync'] = require('./lib/sync/' + method)(lib);
});

lib.watch = require('./lib/common/watch');
lib.createReadStream = require('./lib/common/createReadStream');
lib.createWriteStream = require('./lib/common/createWriteStream');

module.exports = Object.freeze(lib);
