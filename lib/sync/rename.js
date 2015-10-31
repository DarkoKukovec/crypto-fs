var readFileSync = require('./readFile');
var writeFileSync = require('./writeFile');
var unlinkSync = require('./unlink');

module.exports = function(file, newFile) {
  var currentFileContent = readFileSync(file);
  writeFileSync(newFile, currentFileContent);
  unlinkSync(file);
};
