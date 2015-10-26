var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('mkdirSync & rmdirSync', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should be able to create and remove a directory', function() {
    expect(fs.existsSync('foo')).to.be.false;
    fs.mkdirSync('foo');
    expect(fs.existsSync('foo')).to.be.true;
    fs.rmdirSync('foo');
    expect(fs.existsSync('foo')).to.be.false;
  });
});
