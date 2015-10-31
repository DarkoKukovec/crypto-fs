var init = require('./lib/init');

var implementedMethods = [
  'exists',
  'mkdir',
  'readFile',
  'rmdir',
  'stat',
  'unlink',
  'writeFile',
  'rename'
];

var lib = {
  init: init
};

implementedMethods.forEach(function(method) {
  lib[method] = require('./lib/async/' + method);
  lib[method + 'Sync'] = require('./lib/sync/' + method);
});

module.exports = Object.freeze(lib);
