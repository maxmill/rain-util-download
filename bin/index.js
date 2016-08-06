'use strict';

var _request2 = require('request');

var _request3 = _interopRequireDefault(_request2);

var _fs = require('fs');

var _fs2 = _interopRequireDefault(_fs);

var _thunkifyWrap = require('thunkify-wrap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const _download = (uri, filename, callback) => _request3.default.head(uri, (err, res, body) => {
    if (err) {
        callback(err, filename);
    } else {
        let stream = (0, _request3.default)(uri);
        stream.pipe(_fs2.default.createWriteStream(filename).on('error', error => {
            callback(error, filename);
            stream.read();
        })).on('close', () => callback(null, filename)).on('finish', () => callback(null, filename));
    }
});

const download = (0, _thunkifyWrap.genify)((options, callback) => {
    const handle = file => {
        if (file.src && file.url) {
            const cb = typeof callback === 'function' ? callback : (error, filename) => {
                return error ? filename + ':\n\t' + error.message : true;
            };
            _download(file.url, file.src, cb);
        } else {
            return 'file missing name/url';
        }
    };

    if (options && typeof options === 'object') {
        return Array.isArray(options) ? options.map(handle) : handle(options);
    } else {
        console.error('invalid type -  use object or array ');
    }
});

module.exports = download;