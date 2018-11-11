'use strict'

var UTIF = require('utif')
var x = require('object-assign')

module.exports = function (data, o) {
	var meta = x({}, o)
	delete meta.width
	delete meta.height

	return UTIF.encodeImage(data, o.width, o.height, meta)
}
