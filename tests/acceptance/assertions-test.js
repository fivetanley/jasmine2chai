import { expect } from 'chai'
import { describe, it } from 'mocha'
import path from 'path'
import fs from 'fs'
import shift from '../../src/index.js'

describe('assertions codeshift', function () {
  it('converts toBe to to.be', function () {
    assertConversion('to-be')
  })

  it('converts isEqual to to.equal', function () {
    assertConversion('equal')
  })

  it('converts toMatch to to.match', function () {
    assertConversion('match')
  })

  it('converts toBeDefined to to.not.be.undefined', function () {
    assertConversion('defined')
  })

  it('converts toBeNull to to.be.null', function () {
    assertConversion('null')
  })

  it('converts toBeTruthy to to.be.ok', function () {
    assertConversion('truthy')
  })

  it('converts toBeFalsy to not.to.be.ok', function () {
    assertConversion('falsy')
  })

  it('converts toContain to to.include', function () {
    assertConversion('contain')
  })

  it('converts toBeLessThan to to.be.below', function () {
    assertConversion('less-than')
  })

  it('converts toBeGreaterThan to to.be.above', function () {
    assertConversion('greater-than')
  })

  it('converts toBeCloseTo to to.be.closeTo', function () {
    assertConversion('close-to')
  })
})

function assertConversion (fixtureName) {
  const root = path.join(__dirname, '..', 'fixtures')
  const jasmine = path.join(root, 'jasmine', `${fixtureName}.js`)
  const chai = path.join(root, 'chai', `${fixtureName}.js`)

  const jasmineContent = fs.readFileSync(jasmine).toString()
  const chaiContent = fs.readFileSync(chai).toString()

  const transpiledJasmineContent = shift(jasmineContent)

  expect(transpiledJasmineContent).to.equal(chaiContent)
}

