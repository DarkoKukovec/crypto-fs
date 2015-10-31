var readFile = require('./readFile');
var writeFile = require('./writeFile');
var unlink = require('./unlink');

module.exports = function(file, newFile, cb) {
  readFile(file, function(err, data) {
    if (err) {
      return cb(err, null);
    }
    writeFile(newFile, data, function(err) {
      if (err) {
        return cb(err, null);
      }
      unlink(file, cb);
    });
  });
};
