// decode bmp buffer
'use strict'

var bmp = require('bmp-js')
var u8 = require('to-uint8')
var x = require('object-assign')
var toab = require('to-array-buffer')

module.exports = function read (data, o) {
	// convert RGBA → ABGR
	var pixels = u8(data).slice()

	for (var i = 0; i < pixels.length; i+=4) {
		var red = pixels[i + 0]
		var green = pixels[i + 1]
		var blue = pixels[i + 2]
		var alpha = pixels[i + 3]

		pixels[i + 0] = alpha
		pixels[i + 1] = blue
		pixels[i + 2] = green
		pixels[i + 3] = red
	}

	o = x({
		data: Buffer.from(pixels.buffer)
	}, o)

	// if (o.fileSize == null) o.fileSize
	// if (o.reserved == null) o.reserved
	// if (o.offset == null) o.offset
	// if (o.headerSize == null) o.headerSize
	// if (o.planes == null) o.planes
	// if (o.bitPP == null) o.bitPP
	// if (o.compress == null) o.compress
	// if (o.rawSize == null) o.rawSize
	// if (o.hr == null) o.hr
	// if (o.vr == null) o.vr
	// if (o.colors == null) o.colors
	// if (o.importantColors == null) o.importantColors
	// if (o.palette == null) o.palette

	var buff = bmp.encode(o)

	return toab(buff.data)
}

