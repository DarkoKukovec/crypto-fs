var Buffer = require('buffer').Buffer;

module.exports = function(fs) {
  return function(file, appendData, options) {
    console.log('Check', file);
    try {
      fs.accessSync(file);
    } catch(e) {
      console.log('Create', file);
      return fs.writeFileSync(file, appendData, options);
    }
    console.log('Read', file);
    var data = fs.readFileSync(file);
    var dataBuffer = appendData instanceof Buffer ? appendData : new Buffer(appendData);
    data = Buffer.concat([data, dataBuffer]);
    return fs.writeFileSync(file, data, options);
  };
};
