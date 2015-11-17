module.exports = function(fs) {
  var wrapper = require('../utils/wrappers')(fs);
  return wrapper.readAsync('readFile');
};
