var _ = require('lodash');
var config = require('./config');
var path = require('path');

module.exports = function(options) {
  if (!options) {
    throw new Error('Options missing');
  }
  var fs = options.baseFs || config.baseFs;
  if (config.initialized) {
    throw new Error('Init was already called');
  } else if (!options.password) {
    throw new Error('Password is not set');
  } else if (options.password === '1234') {
    throw new Error('Please don\'t use 1234 as your password :)');
  } else if (!options.root) {
    throw new Error('Root folder is not set');
  } else if (!fs.existsSync(options.root)) {
    throw new Error('The root folder doesn\'t exist');
  }
  _.extend(config, options);
  config.root = path.resolve(process.cwd(), config.root);
  config.initialized = true;
  return config;
};
