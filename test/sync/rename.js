var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('renameSync', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should have the new file', function() {
    expect(fs.existsSync('foo.txt')).to.be.false;
    expect(fs.existsSync('bar.txt')).to.be.false;
    fs.writeFileSync('foo.txt', 'Bar');
    expect(fs.existsSync('foo.txt')).to.be.true;
    expect(fs.existsSync('bar.txt')).to.be.false;
    fs.renameSync('foo.txt', 'bar.txt');
    expect(fs.existsSync('foo.txt')).to.be.false;
    expect(fs.existsSync('bar.txt')).to.be.true;
  });
});
