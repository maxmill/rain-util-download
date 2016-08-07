import request from 'request';
import debug from 'debug';
import fs from 'fs';
import { genify } from 'thunkify-wrap';

const download = (uri, filename, callback) => request.head(uri, (err) => {
  if (err) {
    callback(err, filename);
  } else {
    const stream = request(uri);
    stream
      .pipe(fs
        .createWriteStream(filename)
        .on('error', (error) => {
          callback(error, filename);
          stream.read();
        }))
      .on('close', () => callback(null, filename))
      .on('finish', () => callback(null, filename));
  }
});


module.exports = genify((options, callback) => {
  const cb = typeof callback === 'function'
    ? callback
    : (error, filename) => (error ? `${filename} :\n\t' ${error.message}` : true);

  const handle = (file) => ((file.src && file.url)
    ? download(file.url, file.src, cb)
    : 'file missing name/url');

  if (options && typeof options === 'object') {
    return Array.isArray(options) ? options.map(handle) : handle(options);
  }
  return debug('request')('invalid type -  use object or array ');
});
