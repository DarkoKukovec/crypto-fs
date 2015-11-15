var fs = require('../../main');
var chai = require('chai');
var spies = require('chai-spies');
var expect = chai.expect;
var common = require('../common');

chai.use(spies);

describe('watch', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should watch the file', function(done) {
    fs.writeFileSync('foo.txt', 'Foo', 'utf-8');
    var watcher = fs.watch('foo.txt', function(event, filename) {
      watcher.close();
      expect(event).to.equal('change');
      expect(filename).to.satisfy(function(val) {
        // Null will be returned in some instances (platform dependent)
        return val === null || val === 'foo.txt';
      });
      done();
    });
    setTimeout(function() {
      fs.writeFileSync('foo.txt', 'FooBar', 'utf-8');
    }, 10);
  });

  it('should stop watching the file', function(done) {
    var spy = chai.spy();
    fs.writeFileSync('foo.txt', 'Foo', 'utf-8');
    var watcher = fs.watch('foo.txt', spy);
    watcher.close();
    fs.writeFileSync('foo.txt', 'FooBar', 'utf-8');

    setTimeout(function() {
      expect(spy).to.not.have.been.called();
      done();
    }, 20);
  });
});
