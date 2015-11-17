var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('symlinkSync', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should read the correct content', function() {
    fs.writeFileSync('foo.txt', 'Foo');
    fs.symlinkSync('foo.txt', 'bar.txt');
    expect(fs.readFileSync('bar.txt', 'utf-8')).to.equal('Foo');
    expect(fs.readlinkSync('bar.txt')).to.equal('foo.txt');
  });
});
