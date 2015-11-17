var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('symlink', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should read the correct content', function(done) {
    fs.writeFileSync('foo.txt', 'Foo');
    fs.symlink('foo.txt', 'bar.txt', function(err) {
      if (err) {
        return done(err);
      }
      fs.readFile('bar.txt', 'utf-8', function(err, data) {
        if (err) {
          return done(err);
        }
        expect(data).to.equal('Foo');
        fs.readlink('bar.txt', function(err, file) {
          if (err) {
            return done(err);
          }
          expect(file).to.equal('foo.txt');
          done();
        });
      });
    });
  });
});
