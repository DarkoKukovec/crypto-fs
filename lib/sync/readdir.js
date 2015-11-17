var config = require('../config');
var filename = require('../utils/filename');
var helpers = require('../utils/helpers');

module.exports = function() {
  return function(folder) {
    var folderPath = filename.getPathSync(folder);
    var data = config.baseFs.readdirSync(folderPath);
    return data.map(helpers.reverseFilenameMap(filename, folder));
  };
};
