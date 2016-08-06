const test = require('tape-catch');
const path = require('path');
const fs = require('fs');
const download =  require('../bin');
const coTape = require('co-tape');

test('file download', coTape(function* (t) {
    var file = {
        url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
        src: (path.resolve('./img.png') )
    };

    var filePath = (yield download(file));
    console.log(filePath);

    var passed = fs.existsSync(file.src);
    t[passed === true ? 'pass' : 'fail']('file download');

    t.end();
}));
