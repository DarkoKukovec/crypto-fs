var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('readdirSync', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should find the files in given folder', function() {
    fs.writeFileSync('foo.txt', 'Foo');
    fs.writeFileSync('bar.txt', 'Bar');
    var data = fs.readdirSync('/');
    expect(data).to.contain('foo.txt');
    expect(data).to.contain('bar.txt');
    expect(data).to.not.contain('baz.txt');
  });
});
