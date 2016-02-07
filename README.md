# rain-util-download #

[![Build Status](https://travis-ci.org/maxmill/rain-util-download.svg?style=flat-square)](https://travis-ci.org/maxmill/rain-util-download)
[![npm](https://img.shields.io/npm/v/rain-util-download.svg?style=flat-square)]()
[![npm](https://img.shields.io/npm/dt/rain-util-download.svg)]()

Generator based, co/koa compatible file(s) downloader

```
npm i rain-util-download
var download = require('rain-util-download');

var img = {
    url: url of file you wish to download,
    src: tentative filename on local system
}

var downloadedImagePath = yield download({
    url: 'https://joyeur.files.wordpress.com/2011/07/nodejs.png',
    src: (path.resolve('./img.png') )
})
    
also works when supplied an array
```

### credits ###

- https://github.com/request/request