var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('appendFileSync', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should append the data', function() {
    fs.writeFileSync('foo.txt', 'Foo', 'binary');
    fs.appendFileSync('foo.txt', 'Bar', 'binary');
    expect(fs.readFileSync('foo.txt', 'binary')).to.equal('FooBar');
  });

  it('should append the buffer data', function() {
    fs.writeFileSync('foo.txt', 'Foo');
    fs.appendFileSync('foo.txt', new Buffer('Bar'));
    expect(fs.readFileSync('foo.txt', 'utf-8')).to.equal('FooBar');
  });

  it('should create the file if it doesn\'t exist', function() {
    fs.appendFileSync('bar.txt', 'Foo');
    expect(fs.readFileSync('bar.txt', 'utf-8')).to.equal('Foo');
  });
});
