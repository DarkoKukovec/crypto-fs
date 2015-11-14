var fs = require('../../main');
var expect = require('chai').expect;
var common = require('../common');

describe('createWriteStream', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should read the correct data', function(done) {
    var writeStream = fs.createWriteStream('foo.txt');
    writeStream.on('error', done);
    writeStream.write('Lorem ipsum!', function(err) {
      if (err) {
        return done(err);
      }
      writeStream.end();

      expect(fs.readFileSync('foo.txt', 'utf-8')).to.equal('Lorem ipsum!');
      done();
    });
  });

  it('should read the correct data with encoding', function(done) {
    var writeStream = fs.createWriteStream('foo.txt', {defaultEncoding: 'binary'});
    writeStream.on('error', done);
    writeStream.write('Lorem ipsum!', function(err) {
      if (err) {
        return done(err);
      }
      writeStream.end();

      expect(fs.readFileSync('foo.txt', 'binary')).to.equal('Lorem ipsum!');
      done();
    });
  });

  it('should read the correct data when end also contains data', function(done) {
    var writeStream = fs.createWriteStream('foo.txt');
    writeStream.on('error', done);
    writeStream.write('Lorem ipsum!', function(err) {
      if (err) {
        return done(err);
      }
      writeStream.end(' Foo!!!', function(err) {
        if (err) {
          return done(err);
        }

        expect(fs.readFileSync('foo.txt', 'utf-8')).to.equal('Lorem ipsum! Foo!!!');
        done();
      });
    });
  });
});
