// decode jpeg buffer
'use strict'

var jpeg = require('jpeg-js')
var b2u8 = require('buffer-to-uint8array')

module.exports = read

function read (data, o) {
	var jpegData = jpeg.decode(data)

	if(!jpegData) {
		throw new Error("Error decoding jpeg")
	}

	var pixels = b2u8(jpegData.data)
	pixels.data = pixels.subarray()
	pixels.height = jpegData.height
	pixels.width = jpegData.width

	return pixels
}

