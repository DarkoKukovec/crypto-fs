var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');
var Buffer = require('buffer').Buffer;

describe('appendFile', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should append the data', function(done) {
    fs.writeFileSync('foo.txt', 'Foo', 'binary');
    fs.appendFile('foo.txt', 'Bar', 'binary', function(err) {
      if (err) {
        return done(err);
      }
      expect(fs.readFileSync('foo.txt', 'binary')).to.equal('FooBar');
      done();
    });
  });

  it('should append the buffer data', function(done) {
    fs.writeFileSync('foo.txt', 'Foo');
    fs.appendFile('foo.txt', new Buffer('Bar'), function(err) {
      if (err) {
        return done(err);
      }
      expect(fs.readFileSync('foo.txt', 'utf-8')).to.equal('FooBar');
      done();
    });
  });

  it('should fail if the path is wrong', function(done) {
    fs.appendFile('test/foo.txt', 'Foo', function(err) {
      expect(err).to.be.ok;
      done();
    });
  });

  it('should create the file if it doesn\'t exist', function(done) {
    fs.appendFile('bar.txt', 'Foo', function(err) {
      if (err) {
        return done(err);
      }
      expect(fs.readFileSync('bar.txt', 'utf-8')).to.equal('Foo');
      done();
    });
  });
});
