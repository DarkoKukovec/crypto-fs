var util = require('util');
var Stream = require('stream').Stream;

function CryptoStream(opts, cipher) {
  this._cipher = cipher;
  this.inputEncoding = opts.inputEncoding;
  this.outputEncoding = opts.outputEncoding;
  this.readable = this.writable = true;
}

util.inherits(CryptoStream, Stream);

CryptoStream.prototype.write = function(data) {
  this.emit('data', this._cipher.update(data, this.inputEncoding, this.outputEncoding));
  return true;
};

CryptoStream.prototype.end = function() {
  this.emit('data', this._cipher.final(this.outputEncoding));
  this.emit('end');
};

module.exports = CryptoStream;
