# rain-util-download #

[![Build Status](https://travis-ci.org/maxmill/rain-util-download.svg?style=flat-square)](https://travis-ci.org/maxmill/rain-util-download)
[![npm](https://img.shields.io/npm/v/rain-util-download.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/rain-util-download.svg)]()

Generator based, co/koa compatible file(s) downloader

```
npm i -S rain-util-download
const download = require('rain-util-download');

cosnt img = {
    url: url of file you wish to download,
    src: tentative filename on local system
}

const downloadedImagePath = yield download({
    url: 'https://www.npmjs.com/static/images/npm-logo.svg',
    src: (path.resolve('./npm-logo.svg'))
 })

also works when supplied an array
```

### credits ###

- https://github.com/request/request
