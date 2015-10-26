var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('existsSync', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should return true when the file exists', function() {
    expect(fs.existsSync('foo.txt')).to.be.false;
    fs.writeFileSync('foo.txt', 'Bar');
    expect(fs.existsSync('foo.txt')).to.be.true;
  });
});
