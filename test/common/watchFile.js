var fs = require('../../main');
var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var common = require('../common');

chai.use(spies);

describe('watchFile, unwatchFile', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should watch the file', function(done) {
    fs.writeFileSync('foo.txt', 'Foo', 'utf-8');
    fs.watchFile('foo.txt', {interval: 5}, function() {
      fs.unwatchFile('foo.txt');
      done();
    });
    fs.writeFileSync('foo.txt', 'FooBar', 'utf-8');
  });

  it('should stop watching the file', function(done) {
    var spy = chai.spy();
    fs.writeFileSync('foo.txt', 'Foo', 'utf-8');
    fs.watchFile('foo.txt', {interval: 5}, spy);
    fs.unwatchFile('foo.txt');
    fs.writeFileSync('foo.txt', 'FooBar', 'utf-8');

    setTimeout(function() {
      expect(spy).to.not.have.been.called();
      done();
    }, 20);
  });
});
