var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('mkdir & rmdir', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should be able to create and remove a directory', function(done) {
    expect(fs.existsSync('foo')).to.be.false;
    fs.mkdir('foo', function(err) {
      if (err) {
        return done(err);
      }
      expect(fs.existsSync('foo')).to.be.true;
      fs.rmdir('foo', function(err) {
        if (err) {
          return done(err);
        }
        expect(fs.existsSync('foo')).to.be.false;
        done();
      });
    });
  });
});
