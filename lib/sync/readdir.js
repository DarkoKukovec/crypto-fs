var config = require('../config');
var filename = require('../utils/filename');
var helpers = require('../utils/helpers');

module.exports = function(folder) {
  var folderPath = filename.getPath(folder);
  var data = config.baseFs.readdirSync(folderPath);
  return data.map(helpers.reverseFilenameMap(folder));
};
