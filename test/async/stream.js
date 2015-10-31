var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('stream', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should copy the data correctly', function(done) {
    fs.writeFileSync('foo.txt', 'Lorem ipsum');

    var srcStream = fs.createReadStream('foo.txt');
    var destStream = fs.createWriteStream('bar.txt');
    srcStream.pipe(destStream);
    srcStream.on('end', function(err) {
      if (err) {
        return done(err);
      }
      expect(fs.readFileSync('bar.txt', 'utf-8')).to.equal('Lorem ipsum');
      done();
    });
  });
});
