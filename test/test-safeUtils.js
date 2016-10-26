/* eslint-env mocha */
'use strict'

// Testing libraries
const expect = require('expect.js')

const safeGet = require('../lib').safeGet
const safeConcat = require('../lib').safeConcat
const safeJoin = require('../lib').safeJoin

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
  it('returns actual property value when accessing  nested variable', function () {
      const inp = {test: 1}
      const outp = safeGet(() => inp.test)
      expect(outp).to.be(1)
  })
})