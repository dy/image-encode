// decode gif buffer
'use strict'

var GifWriter = require('omggif').GifWriter
var toab = require('to-array-buffer')
var getPalette = require('image-palette')
var nextPow2 = require('next-pow-2')

module.exports = function read (data, o) {
	if (o.loop == null) o.loop = 0
	if (o.delay == null) o.delay = 0
	if (o.dithering == null) o.dithering = null

	// FIXME: max 256 colors is likely for GIF
	o.colors = o.colors || 256
	if (o.colors > 256) o.colors = 256
	var palette = getPalette(data, o.colors)

	o.palette = palette.colors.map(function (color) {
		return color[0] << 16 | color[1] << 8 | color[2]
	})
	o.palette.length = nextPow2(Math.max(o.palette.length, 2))
	o.palette = new Uint32Array(o.palette)

	var frames = 1

	var buf = new Uint8Array(o.width * o.height * frames + 1024)
	var gf = new GifWriter(buf, o.width, o.height, o)
	gf.addFrame(0, 0, o.width, o.height, palette.ids)

	return toab(buf.slice(0, gf.end()))
}

