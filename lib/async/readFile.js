var wrapper = require('../utils/wrappers');
module.exports = function() {
  return wrapper.readAsync('readFile');
};
