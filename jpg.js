// decode jpeg buffer
'use strict'

var jpeg = require('jpeg-js')
var toab = require('to-array-buffer')

module.exports = read

function read (data, o) {
	var rawImageData = {
		data: Buffer.from(data),
		width: o.width,
		height: o.height
	}
	var jpegImageData = jpeg.encode(rawImageData, (o.quality || .92) * 100)

	return toab(jpegImageData.data)
}

