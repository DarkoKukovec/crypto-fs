var filename = require('../utils/filename');

module.exports = function(fs) {
  var wrapper = require('../utils/wrappers')(fs);
  var fn = wrapper.fsSync('readlinkSync', 1, true);
  return function() {
    return filename.decryptAbsolute(fn.apply(null, arguments));
  };
};
