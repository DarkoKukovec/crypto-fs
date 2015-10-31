var config = require('../config');
var filename = require('../utils/filename');
var helpers = require('../utils/helpers');

module.exports = function(folder, cb) {
  var folderPath = filename.getPath(folder);
  config.baseFs.readdir(folderPath, function(err, data) {
    if (err) {
      return cb(err, data);
    }
    cb(null, data.map(helpers.reverseFilenameMap(folder)));
  });
};
