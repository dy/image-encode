# image-encode [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges) [![Build Status](https://img.shields.io/travis/dy/image-encode.svg)](https://travis-ci.org/dy/image-encode)

Encode pixel data to an image format: PNG, GIF, BMP, JPEG or TIFF.

## Usage

[![npm install image-encode](https://nodei.co/npm/image-encode.png?mini=true)](https://npmjs.org/package/image-encode/)

```js
let encode = require('image-encode')

// create a file with chess pattern
fs.writeFileSync(
	encode([0,0,0,255, 255,255,255,255, 255,255,255,255, 0,0,0,255], {type: 'png', width: 2, height: 2})
)
```

## API

### `let data = encode(pixels, type, options?)`

Takes input `pixels` Array/TypedArray/ArrayBuffer/Buffer/ImageData, returns an ArrayBuffer with encoded `data` in target mime `type`, one of `png`, `gif`, `tif`, `bmp`, `jpg`.

`options` can provide:

* `width`, if not defined by `pixels`
* `height`, if not defined by `pixels`
* `quality`
* rest of meta fields for encoder

## See also

* [image-decode](https://ghub.io/image-decode) − decode image data from a format.
* [image-equal](https://ghub.io/image-equal) − image data comparing tool.
* [image-pixels](https://ghub.io/image-pixels) − load or save pixel data from/to any source.
* [image-save](https://ghub.io/image-save) − save image pixels data to a target.
* [image-type](https://ghub.io/image-type) − detect input image data type.


## Credits

© 2018 Dmitry Yv. MIT License.
