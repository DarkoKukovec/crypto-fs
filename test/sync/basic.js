var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('basic sync operations', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should save and read the file correctly', function() {
    fs.mkdirSync('foo');
    fs.writeFileSync('foo/bar.txt', 'Hello world!');
    var data = fs.readFileSync('foo/bar.txt', 'utf-8');
    expect(data).to.equal('Hello world!');
  });

  it('should work with buffers', function() {
    fs.mkdirSync('foo');
    fs.writeFileSync('foo/bar.txt', 'Hello world!');
    var data = fs.readFileSync('foo/bar.txt');
    expect(data).to.not.equal('Hello world!');
    expect(data.toString('utf-8')).to.equal('Hello world!');
  });
});
