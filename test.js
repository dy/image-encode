'use strict'

let decode = require('image-decode')
let encode = require('./')
let t = require('tape')
let fix = require('./fixture')
let fs = require('fs')
let eq = require('image-equal')

var PNG = require('pngjs').PNG

t('png', async t => {
	let data = decode(fs.readFileSync('./fixture/test_pattern.png'))

	data = decode(encode(data, 'png'), 'png')

	t.ok(await eq(data, fix))

	t.end()
})

t('jpg', async t => {
	let data = decode(fs.readFileSync('./fixture/test_pattern.png'))

	data = decode(encode(data, 'jpg'))

	var out = {}
	t.ok(await eq(data, fix, out, { tolerance: .04 }))
	t.end()
})

t.only('bmp', async t => {
	let data = decode(fs.readFileSync('./fixture/test_pattern.jpg'))

	t.ok(await eq(data, fix, {tol: 0.04}))

	t.equal(data.width, fix.width)
	t.equal(data.height, fix.height)
	t.end()
})

t('gif', async t => {
	let data = decode(fs.readFileSync('./fixture/test_pattern.gif'))

	t.ok(await eq(data, fix))

	t.equal(data.width, fix.width)
	t.equal(data.height, fix.height)
	t.end()
})

t.skip('webp', async t => {
	let data = decode(fs.readFileSync('./fixture/test_pattern.webp'))

	t.ok(await eq(data, fix))

	t.equal(data.width, fix.width)
	t.equal(data.height, fix.height)
	t.end()
})

t('tiff', async t => {
	let data = decode(fs.readFileSync('./fixture/test_pattern.tif'))

	t.ok(await eq(data, fix))

	t.equal(data.width, fix.width)
	t.equal(data.height, fix.height)
	t.end()
})

t('undefined type', async t => {
	let data = decode([0,0,0,0,0,0,0,0,0])
	t.notOk(data)

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
