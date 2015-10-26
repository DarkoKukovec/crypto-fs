var fs = require('../../main');
var expect = require('chai').expect;

describe('basic async operations', function() {
  it('should save and read the file correctly', function(done) {
    fs.mkdir('foo', function(err) {
      if (err) {
        done(err);
      }
      fs.writeFile('foo/bar.txt', 'Hello world!', function(err) {
        if (err) {
          done(err);
        }
        fs.readFile('foo/bar.txt', 'utf-8', function(err, data) {
          if (err) {
            done(err);
          }
          expect(data).to.equal('Hello world!');
          fs.unlink('foo/bar.txt', function(err) {
            if (err) {
              done(err);
            }
            fs.rmdir('foo', function(err) {
              done(err);
            });
          });
        });
      });
    });
  });

  it('should fail if the file doesn\'t exists', function(done) {
    fs.readFile('foo', function(err, data) {
      expect(err).to.be.ok;
      done(data);
    });
  });
});
