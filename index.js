'use strict'

var toab = require('to-array-buffer')
var isObj = require('is-plain-obj')

module.exports = encode


function encode (data, type, o) {
  if (isObj(type)) o = type
  if (!o) o = {}

  if (!o.width) o.width = data.shape ? data.shape[0] : data.width
  if (!o.height) o.height = data.shape ? data.shape[1] : data.height

  if (!o.width || !o.height) throw new Error('Options must define `width` and `height`')

  if (!type) type = o.type

  if (!type || !encode[type]) throw new Error('Options must define valid encoder type')

  return encode[type](toab(data), o)
}

encode['png'] =
encode['image/png'] = require('./png')
// encode['gif'] =
// encode['image/gif'] = require('./gif'),
encode['image/jpeg'] =
encode['image/jpg'] =
encode['jpg'] =
encode['jpeg'] = require('./jpg')
// encode['bmp'] =
// encode['image/bmp'] =
// encode['image/bitmap'] = require('./bmp')
// encode['tiff'] =
// encode['image/tiff'] = require('./tiff')
// encode['webp'] =
// encode['image/webp'] = require('./webp')
