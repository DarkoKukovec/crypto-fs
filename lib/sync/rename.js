module.exports = function(fs) {
  return function(file, newFile) {
    var currentFileContent = fs.readFileSync(file);
    fs.writeFileSync(newFile, currentFileContent);
    fs.unlinkSync(file);
  };
};
