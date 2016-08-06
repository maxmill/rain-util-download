import _request from 'request';
import fs from 'fs';
import {genify} from 'thunkify-wrap';

const _download = (uri, filename, callback) => _request.head(uri, (err, res, body) => {
    if (err) {
        callback(err, filename);
    } else {
        let stream = _request(uri);
        stream
            .pipe(fs
                .createWriteStream(filename)
                .on('error', (error) => {
                    callback(error, filename);
                    stream.read();
                }))
            .on('close', ()=> callback(null, filename))
            .on('finish', () => callback(null, filename));
    }
});

const download = genify((options, callback) => {
    const handle = (file) => {
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