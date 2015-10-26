var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('exists', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should return true when the file exists', function(done) {
    fs.exists('foo.txt', function(data) {
      expect(data).to.be.false;
      fs.writeFile('foo.txt', 'Bar', function(err) {
        if (err) {
          return done(err);
        }
        fs.exists('foo.txt', function(data) {
          expect(data).to.be.true;
          done();
        });
      });
    });
  });
});
