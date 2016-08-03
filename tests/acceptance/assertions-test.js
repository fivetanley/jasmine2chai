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

