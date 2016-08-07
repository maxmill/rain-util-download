'use strict';

var _request = require('request');

var _request2 = _interopRequireDefault(_request);

var _debug = require('debug');

var _debug2 = _interopRequireDefault(_debug);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _thunkifyWrap = require('thunkify-wrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const download = (uri, filename, callback) => _request2.default.head(uri, err => {
  if (err) {
    callback(err, filename);
  } else {
    const stream = (0, _request2.default)(uri);
    stream.pipe(_fs2.default.createWriteStream(filename).on('error', error => {
      callback(error, filename);
      stream.read();
    })).on('close', () => callback(null, filename)).on('finish', () => callback(null, filename));
  }
});

module.exports = (0, _thunkifyWrap.genify)((options, callback) => {
  const cb = typeof callback === 'function' ? callback : (error, filename) => error ? `${ filename } :\n\t' ${ error.message }` : true;

  const handle = file => file.src && file.url ? download(file.url, file.src, cb) : 'file missing name/url';

  if (options && typeof options === 'object') {
    return Array.isArray(options) ? options.map(handle) : handle(options);
  }
  return (0, _debug2.default)('request')('invalid type -  use object or array ');
});