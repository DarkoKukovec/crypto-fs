var _ = require('lodash');

var init = require('./lib/init');
var async = require('./lib/async');
var sync = require('./lib/sync');

var lib = {
  init: init
};

_.extend(lib, async, sync);

module.exports = Object.freeze(lib);
