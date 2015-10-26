var filename = require('../../lib/utils/filename');
var expect = require('chai').expect;
var common = require('../common');

describe('filename util', function() {
  beforeEach(function() {
    common.clean();
    common.options.restore();
  });

  it('should return the correct decrypted filename', function() {
    var origName = 'foo/bar.txt';
    var encName = filename.encrypt(origName);
    expect(encName).to.not.equal(origName);
    expect(filename.decrypt(encName)).to.equal(origName);
  });
});
