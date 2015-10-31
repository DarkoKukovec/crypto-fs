var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('rename', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should have the new file', function(done) {
    expect(fs.existsSync('foo.txt')).to.be.false;
    expect(fs.existsSync('bar.txt')).to.be.false;
    fs.writeFile('foo.txt', 'Bar', function(err) {
      if (err) {
        return done(err);
      }
      expect(fs.existsSync('foo.txt')).to.be.true;
      expect(fs.existsSync('bar.txt')).to.be.false;
      fs.rename('foo.txt', 'bar.txt', function(err) {
        if (err) {
          return done(err);
        }
        expect(fs.existsSync('foo.txt')).to.be.false;
        expect(fs.existsSync('bar.txt')).to.be.true;
        done();
      });
    });
  });

  it('should fail if file doesn\'t exist', function(done) {
    fs.rename('foo.txt', 'bar.txt', function(err) {
      expect(err).to.be.ok;
      done();
    });
  });

  it('should fail if file path is incorrect', function(done) {
    fs.writeFile('foo.txt', 'Bar', function(err) {
      if (err) {
        return done(err);
      }
      fs.rename('foo.txt', 'baz/bar.txt', function(err) {
        expect(err).to.be.ok;
        done();
      });
    });
  });
});
