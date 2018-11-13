# image-encode [![unstable](https://img.shields.io/badge/stability-unstable-green.svg)](http://github.com/badges/stability-badges) [![Build Status](https://img.shields.io/travis/dy/image-encode.svg)](https://travis-ci.org/dy/image-encode)

Encode image data to a container: PNG, GIF, BMP, JPEG or TIFF. Uses set of encoders in node and Canvas2D in browser.

## Usage

[![npm install image-encode](https://nodei.co/npm/image-encode.png?mini=true)](https://npmjs.org/package/image-encode/)

```js
let encode = require('image-encode')

// create a file with chess pattern
fs.writeFileSync(
	encode([0,0,0,255, 255,255,255,255, 255,255,255,255, 0,0,0,255], [2, 2], 'png')
)
```

## API

### `let data = encode(pixels, shape?, format|options?)`

Takes input `pixels` Array/TypedArray/ArrayBuffer/Buffer/ImageData, returns an ArrayBuffer with encoded `data` in target `format`, one of `png`, `gif`, `tif`, `bmp`, `jpg`.

`options` can provide:

* `format` or `type`, if not specified as a separate argument.
* `shape` or `width`/`height`, if not defined by `pixels` or as a separate argument.
* `quality` for JPG encoder.
* `colors` for palette size in GIF encoder.
* any other meta fields for encoders.

## See also

* [squoosh.app](https://github.com/GoogleChromeLabs/squoosh) − best in class image compressing app.
* [image-decode](https://ghub.io/image-decode) − decode image data from a format.
* [image-equal](https://ghub.io/image-equal) − image data comparing tool.
* [image-pixels](https://ghub.io/image-pixels) − load or save pixel data from/to any source.
* [image-save](https://ghub.io/image-save) − save image pixels data to a target.
* [image-type](https://ghub.io/image-type) − detect input image data type.


## Footer

© 2018 Dmitry Yv. MIT License.
