var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('stat', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should report the correct file size', function(done) {
    common.options.set({
      realSize: true
    });
    var testString = 'ewrtyuiofghjgh';
    fs.writeFileSync('foo.txt', testString);
    fs.stat('foo.txt', function(err, stat) {
      if (err) {
        return done(err);
      }
      expect(stat.size).to.equal(testString.length);
      done();
    });
  });
});
