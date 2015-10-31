var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('readdir', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should find the files in given folder', function(done) {
    fs.writeFileSync('foo.txt', 'Foo');
    fs.writeFileSync('bar.txt', 'Bar');
    fs.readdir('/', function(err, data) {
      if (err) {
        return done(err);
      }
      expect(data).to.contain('foo.txt');
      expect(data).to.contain('bar.txt');
      expect(data).to.not.contain('baz.txt');
      done();
    });
  });

  it('should fail if the folder doesn\'t exist', function(done) {
    fs.writeFileSync('foo.txt', 'Foo');
    fs.writeFileSync('bar.txt', 'Bar');
    fs.readdir('/missing', function(err) {
      expect(err).to.be.ok;
      done();
    });
  });
});
