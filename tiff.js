'use strict'

var UTIF = require('utif')

module.exports = function decode(data, o) {
	let ifds = UTIF.decode(data)
	UTIF.decodeImages(data, ifds)

	var rgba = UTIF.toRGBA8(ifds[0])

	let pixels = rgba
	pixels.data = pixels.subarray()
	pixels.height = ifds[0].height
	pixels.width = ifds[0].width

	return pixels
}
