var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('createReadStream', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should read the correct data', function(done) {
    fs.writeFileSync('foo.txt', 'Lorem ipsum');
    var readStream = fs.createReadStream('foo.txt');
    readStream.on('error', done);
    readStream.on('end', function() {
      expect(data).to.equal('Lorem ipsum');
      done();
    });
    var data = '';
    readStream.on('data', function(chunk) {
      data += chunk;
    });
  });

  it('should read the correct data with encoding', function(done) {
    fs.writeFileSync('foo.txt', 'Lorem ipsum');
    var readStream = fs.createReadStream('foo.txt', {encoding: 'utf-8'});
    readStream.on('error', done);
    readStream.on('end', function() {
      expect(data).to.equal('Lorem ipsum');
      done();
    });
    var data = '';
    readStream.on('data', function(chunk) {
      data += chunk;
    });
  });
});
