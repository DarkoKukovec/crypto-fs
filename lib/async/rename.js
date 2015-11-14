module.exports = function(fs) {
  return function(file, newFile, cb) {
    fs.readFile(file, function(err, data) {
      if (err) {
        return cb(err, null);
      }
      fs.writeFile(newFile, data, function(err) {
        if (err) {
          return cb(err, null);
        }
        fs.unlink(file, cb);
      });
    });
  };
};
