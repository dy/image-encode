'use strict'

var pxls = require('pxls')
var isObj = require('is-plain-obj')

module.exports = encode


function encode (data, type, o) {
  if (isObj(type)) {
    o = type
    type = null
  }

  if (typeof o === 'string') o = {type: o}
  else if (!o) o = {}
  else if (Array.isArray(o)) o = { width: o[0], height: o[1] }
  if (Array.isArray(type)) o.width = type[0], o.height = type[1], type = o.type

  if (o.shape) o.width = o.shape[0], o.height = o.shape[1]

  if (!o.width) o.width = data.shape ? data.shape[0] : data.width
  if (!o.height) o.height = data.shape ? data.shape[1] : data.height

  if (!o.width || !o.height) throw new Error('Options must define `width` and `height`')

  if (!type) type = o.type || o.format || o.mime || o.mimeType

  if (!type || !encode[type]) throw new Error('Options must define valid encoder type')

  return encode[type](pxls(data), o)
}

encode['png'] =
encode['image/png'] = require('./png')
encode['gif'] =
encode['image/gif'] = require('./gif'),
encode['image/jpeg'] =
encode['image/jpg'] =
encode['jpg'] =
encode['jpeg'] = require('./jpg')
encode['bmp'] =
encode['image/bmp'] =
encode['image/bitmap'] = require('./bmp')
encode['tiff'] =
encode['tif'] =
encode['exif'] =
encode['image/tif'] =
encode['image/tiff'] = require('./tiff')
// encode['webp'] =
// encode['image/webp'] = require('./webp')
