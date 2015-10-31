var init = require('./lib/init');

var implementedMethods = [
  'exists',
  'mkdir',
  'readFile',
  'rmdir',
  'stat',
  'unlink',
  'writeFile',
  'rename',
  'readdir'
];

var lib = {
  init: init
};

implementedMethods.forEach(function(method) {
  lib[method] = require('./lib/async/' + method);
  lib[method + 'Sync'] = require('./lib/sync/' + method);
});

lib.createReadStream = require('./lib/async/createReadStream');
lib.createWriteStream = require('./lib/async/createWriteStream');

module.exports = Object.freeze(lib);
