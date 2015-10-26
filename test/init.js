var fs = require('../main');
var common = require('./common');
var expect = require('chai').expect;

describe('initialization', function() {
  it('should throw an exception if options are not set', function() {
    expect(function() {
      fs.init();
    }).to.throw('Options missing');
  });

  it('should throw an exception if password is not set', function() {
    expect(function() {
      fs.init({});
    }).to.throw('Password is not set');
  });

  it('should throw an exception if a weak password is used', function() {
    expect(function() {
      fs.init({
        password: '1234'
      });
    }).to.throw('Please don\'t use 1234 as your password :)');
  });

  it('should throw an exception if root folder is not set', function() {
    expect(function() {
      fs.init({
        password: '12345'
      });
    }).to.throw('Root folder is not set');
  });

  it('should throw an exception if root folder doesn\'t exist', function() {
    expect(function() {
      fs.init({
        password: '12345',
        root: './test/foo'
      });
    }).to.throw('The root folder doesn\'t exist');
  });

  it('should throw an exception if an invalid base fs is given', function() {
    expect(function() {
      fs.init({
        baseFs: require('path'),
        password: '12345',
        root: './test/foo'
      });
    }).to.throw;
  });

  it('should throw an exception if init was not yet called (correctly)', function() {
    expect(function() {
      fs.existsSync('foo');
    }).to.throw('You need to call the init function first');
  });

  it('should return config if eveyting went ok', function() {
    var config = fs.init({
      password: '12345',
      root: './test/test'
    });
    expect(config.initialized).to.be.true;
    expect(config.check).to.not.throw;
    common.options.backup(config);
  });

  it('should throw an error if init is called multiple times', function() {
    expect(function() {
      fs.init({
        password: '12345',
        root: './test/test'
      });
    }).to.throw('Init was already called');
  });

  xit('should work with iv set', function() {
    common.options.set({
      iv: '1234567890abcdef',
      password: 'abcabcabc1abcabcabc1abcabcabc132',
      algorithm: 'aes256'
    });
    fs.mkdirSync('foo');
    expect(fs.existsSync('foo')).to.be.true;
  });
});
