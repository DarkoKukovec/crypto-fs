var fs = require('../../main');
var expect = require('chai').expect;

describe('basic sync operations', function() {
  it('should save and read the file correctly', function() {
    fs.mkdirSync('foo');
    fs.writeFileSync('foo/bar.txt', 'Hello world!');
    var data = fs.readFileSync('foo/bar.txt', 'utf-8');
    expect(data).to.equal('Hello world!');
    fs.unlinkSync('foo/bar.txt');
    fs.rmdirSync('foo');
  });
});
