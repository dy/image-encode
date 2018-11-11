'use strict'

var UTIF = require('utif')

module.exports = function decode(data, o) {
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

let ifds = UTIF.decode(data)
	UTIF.decodeImages(data, ifds)

	var rgba = UTIF.toRGBA8(ifds[0])

	let pixels = rgba
	pixels.data = pixels.subarray()
	pixels.height = ifds[0].height
	pixels.width = ifds[0].width

	return pixels
