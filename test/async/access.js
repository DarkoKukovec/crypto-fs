var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('access', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should return true when the file access', function(done) {
    fs.access('foo.txt', function(data) {
      expect(data).to.be.false;
      fs.writeFile('foo.txt', 'Bar', 'utf-8', function(err) {
        if (err) {
          return done(err);
        }
        fs.access('foo.txt', function(data) {
          expect(data).to.be.true;
          done();
        });
      });
    });
  });
});
