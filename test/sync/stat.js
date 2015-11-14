var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('statSync', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should report the correct file size', function() {
    common.options.set({
      realSize: true
    });
    var testString = 'ewrtyuiofghjgh';
    fs.writeFileSync('foo.txt', testString);
    var stat = fs.statSync('foo.txt');
    expect(stat.size).to.equal(testString.length);
  });
});
