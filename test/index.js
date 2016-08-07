const test = require('tape-catch');
const path = require('path');
const fs = require('fs');
const download = require('../bin');
const coTape = require('co-tape');
const debug = require('debug')('test');

function* fileDownload(t) {
  const file = {
    url: 'https://www.npmjs.com/static/images/npm-logo.svg',
    src: (path.resolve('./npm-logo.svg'))
  };

  const filePath = (yield download(file));
  debug(filePath);

  const passed = fs.existsSync(file.src);
  t[passed === true ? 'pass' : 'fail']('file download');

  t.end();
}

test('file download', coTape(fileDownload));
