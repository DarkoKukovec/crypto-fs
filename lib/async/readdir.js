var config = require('../config');
var filename = require('../utils/filename');
var helpers = require('../utils/helpers');

module.exports = function() {
  return function(folder, cb) {
    filename.getPath(folder, undefined, function(folderPath) {
      config.baseFs.readdir(folderPath, function(err, data) {
        if (err) {
          return cb(err, data);
        }
        cb(null, data.map(helpers.reverseFilenameMap(filename, folder)));
      });
    });
  };
};
