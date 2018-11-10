// decode png buffer
'use strict'


var PNG = require('pngjs').PNG
var toab = require('to-array-buffer')
var x = require('object-assign')

module.exports = function read (data, o) {
	o = x({
		data: Buffer.from(data)
	}, o)

	if (o.interlace == null) o.interlace = false
	if (o.palette == null) o.palette = false
	if (o.depth == null) o.depth = 8
	if (o.color == null) o.color = true
	if (o.bpp == null) o.bpp = 3
	if (o.colorType == null) o.colorType = 2
	if (o.gamma == null) o.gamma = 0

	var buff = PNG.sync.write(o)

	return toab(buff)
}

