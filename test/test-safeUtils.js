/* eslint-env mocha */
'use strict'

// Testing libraries
const expect = require('expect.js')

const safeGet = require('../dist/cjs/lib').safeGet
const safeJoin = require('../dist/cjs/lib').safeJoin
const safeCatch = require('../dist/cjs/lib').safeCatch

describe('safeGet', function () {
  it('returns undefined when accessing undefined single variable', function () {
      const inp = undefined
      const outp = safeGet(() => inp)
      expect(outp).to.be(undefined)
  })
  it('returns undefined when accessing undefined nested variable', function () {
      const inp = {}
      const outp = safeGet(() => inp.one)
      expect(outp).to.be(undefined)
  })
  it('returns default when accessing undefined nested variable', function () {
      const inp = {}
      const outp = safeGet(() => inp.one, 'default')
      expect(outp).to.equal('default')
  })
  it('returns false if expression evaluates to false', function () {
    const outp = safeGet(() => false, 'default')
    expect(outp).to.equal(false)
  })
  it('returns empty string if expression evaluates to empty string', function () {
    const outp = safeGet(() => '', 'default')
    expect(outp).to.equal('')
  })
  it('returns actual property value when accessing  nested variable', function () {
      const inp = {test: 1}
      const outp = safeGet(() => inp.test)
      expect(outp).to.be(1)
  })
})

describe('safeJoin', function () {
  it('returns empty string when passed undefined', function () {
      const inp = undefined
      const outp = safeJoin([undefined, undefined], ' ')
      expect(outp).to.equal('')
  })

  it('returns string with separator', function () {
      const outp = safeJoin(['First', 'Second'], ' ')
      expect(outp).to.equal('First Second')
  })

  it('returns string with separator when passed function', function () {
      const outp = safeJoin([() => 'First', 'Second'], ' ')
      expect(outp).to.equal('First Second')
  })

  it('can handle error in passed function', function () {
      const outp = safeJoin([() => not.existing, 'Second'], ' ')
      expect(outp).to.equal('Second')
  })
})

describe('safeCatch', function () {
    it('can handle result', async function () {
        const myPromisFunc = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    resolve('ok')
                }, 10)
            })
        }
        const {err, res} = await safeCatch(myPromisFunc)()
        expect(res).to.equal('ok')
        expect(err).to.be(undefined)
    })

    it('can handle reject', async function () {
        const myPromisFunc = () => {
            return new Promise((resolve, reject) => {
                setTimeout(() => {
                    reject('error')
                }, 10)
            })
        }
        const {err, res} = await safeCatch(myPromisFunc)()
        expect(res).to.be(undefined)
        expect(err).to.equal('error')
    })

    it('can handle throw', async function () {
        const myPromisFunc = () => {
            return new Promise((resolve, reject) => {
                throw new Error('error')
            })
        }
        const {err, res} = await safeCatch(myPromisFunc)()
        expect(res).to.be(undefined)
        expect(err.message).to.equal('error')
    })
  })