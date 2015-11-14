var wrapper = require('../utils/wrappers');
module.exports = function() {
  return wrapper.readSync('readFileSync', true);
};
