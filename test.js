'use strict'

let decode = require('image-decode')
let encode = require('./')
let t = require('tape')
let fix = require('./fixture')
let fs = require('fs')
let eq = require('image-equal')
let pixels = require('image-pixels')
var del = require('del')

var PNG = require('pngjs').PNG

t('readme', async t => {
	// create a file with chess pattern
	fs.writeFileSync(
		'x.png',
		Buffer.from(encode([0,0,0,255, 255,255,255,255, 255,255,255,255, 0,0,0,255], [2, 2], 'png'))
	)

	t.ok(eq(await pixels('./x.png'), [0,0,0,255, 255,255,255,255, 255,255,255,255, 0,0,0,255]))

	del('./x.png')

	t.end()
})

t('png', async t => {
	let data = await pixels('./fixture/test_pattern.png')

	data = decode(encode(data, 'png'), 'png')

	t.ok(eq(data, fix))

	t.end()
})

t('jpg', async t => {
	let data = await pixels('./fixture/test_pattern.png')

	data = decode(encode(data, 'jpg'))

	var out = {}
	t.ok(eq(data, fix, out, { tolerance: .45 }))

	t.end()
})

t('bmp', async t => {
	let data = await pixels('./fixture/test_pattern.png')

	data = decode(encode(data, 'bmp'))

	for (let i = 0; i < data.length; i++) {
		if (data[i] !== fix.data[i]) console.log(i, data[i], fix.data[i])
	}

	var out = {}
	t.ok(eq(data, fix, out))
	t.end()
})

t('gif', async t => {
	let data = await pixels('./fixture/test_pattern.png')

	data = decode(encode(data, 'gif'))
	t.ok(await eq(data, fix))

	data = decode(encode(data, 'gif', {colors: 7}))

	t.ok(eq(data, fix, {tol: .42}))

	encode([0,0,0,0], 'gif', [1,1])

	t.end()
})

t.skip('webp', async t => {
	let data = await pixels('./fixture/test_pattern.webp')

	t.ok(eq(data, fix))

	t.equal(data.width, fix.width)
	t.equal(data.height, fix.height)
	t.end()
})

t('tiff', async t => {
	let data = await pixels('./fixture/test_pattern.png')

	data = decode(encode(data, 'tif'))

	// for (let i = 0; i < data.length; i++) {
	// 	if (data[i] !== fix.data[i]) console.log(i, data[i], fix.data[i])
	// }

	var out = {}
	t.ok(eq(data, fix, out))
	t.end()
})

t('undefined type', async t => {
	let data = decode([0,0,0,0,0,0,0,0,0])
	t.notOk(data)

	t.end()
})

t('type in options', async t => {
	let data = await pixels('./fixture/test_pattern.png')

	encode(data, {type: 'png'})

	t.end()
})

// TODO
t('base64')
t('arraybuffer')
t('buffer')
t('uint8')
t('file')
t('blob')
t('datauri')
