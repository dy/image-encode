// decode gif buffer
'use strict'

var GifWriter = require('omggif').GifWriter
var toab = require('to-array-buffer')

module.exports = function read (data, o) {
	if (o.loop == null) o.loop = 0
	if (o.delay == null) o.delay = 0
	// if (o.dithering == null) o.dithering = null

	let i = 0
    let length = o.width * o.height * 4
    let palette = {}
    let paletteArray = []

    let pxData = new Uint8Array(data)

    while (i < length) {
		let r = pxData[i++]
		let g = pxData[i++]
		let b = pxData[i++]
		let id = r << 16 | g << 8 | b
		if (!palette[id]) {
			palette[id] = paletteArray.length
			paletteArray.push(id)
		}
		i++
    }

	let pixels = new Uint8Array(o.width * o.height)
    if (paletteArray.length <= 256) {
		paletteArray.length = 256
		let k = 0, p = 0

		while(k < length) {
			let r = pxData[k++]
			let g = pxData[k++]
			let b = pxData[k++]
			let index = r << 16 | g << 8 | b
			pixels[p] = palette[index]
			k++, p++
		}

		o.palette = new Uint32Array(paletteArray)
    }
    else {
    	throw Error('More than 256 colors is not supported for now')
    }

	var frames = 1

	var buf = new Uint8Array(o.width * o.height * frames + 1024)
	var gf = new GifWriter(buf, o.width, o.height, o)
	gf.addFrame(0, 0, o.width, o.height, pixels)

	return toab(buf.slice(0, gf.end()))
}

