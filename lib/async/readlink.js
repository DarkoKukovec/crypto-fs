var filename = require('../utils/filename');
var _ = require('lodash');

module.exports = function(fs) {
  var wrapper = require('../utils/wrappers')(fs);
  var fn = wrapper.fs('readlink', 1, true);
  return function() {
    var args = _.toArray(arguments);
    var cb = args.pop();
    args.push(function(err, data) {
      if (err) {
        return cb(err);
      }
      cb(null, filename.decryptAbsolute(data));
    });
    fn.apply(null, args);
  };
};
