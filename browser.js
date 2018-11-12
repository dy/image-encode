'use strict'

var isObj = require('is-plain-obj')
var u8 = require('to-uint8')


module.exports = encode


var canvas, context

function encode (data, type, o) {
  if (isObj(type)) o = type
  if (!o) o = {}
  else if (Array.isArray(o)) o = { width: o[0], height: o[1] }
  if (Array.isArray(type)) o.width = type[0], o.height = type[1], type = o.type

  if (o.shape) o.width = o.shape[0], o.height = o.shape[1]
  if (!o.width) o.width = data.shape ? data.shape[0] : data.width
  if (!o.height) o.height = data.shape ? data.shape[1] : data.height

  if (!o.width || !o.height) throw new Error('Options must define `width` and `height`')

  if (!type) type = o.type || o.format || o.mime || o.mimeType

  if (!type || !types[type]) throw new Error('Options must define valid encoder type')

  if (!context) {
  	canvas = document.createElement('canvas')
  	context = canvas.getContext('2d')
  }

  canvas.width = o.width
  canvas.height = o.height
  var idata = context.createImageData(o.width, o.height)
  idata.data.set(u8(data))
  context.putImageData(idata, 0, 0)

  var dataURL = canvas.toDataURL(types[type], o.quality || 1)

  return u8(dataURL).buffer
}

var types = {
	'png': 'image/png',
	'image/png': 'image/png',
	'gif': 'image/gif',
	'image/gif': 'image/gif',
	'image/jpeg': 'image/jpeg',
	'image/jpg': 'image/jpeg',
	'jpg': 'image/jpeg',
	'jpeg': 'image/jpeg',
	'bmp': 'image/bmp',
	'image/bmp': 'image/bmp',
	'image/bitmap': 'image/bmp',
	'tiff': 'image/tiff',
	'tif': 'image/tiff',
	'exif': 'image/tiff',
	'image/tif': 'image/tiff',
	'image/tiff': 'image/tiff'
}
