import j from 'jscodeshift'
import callExpressionToMemberExpression from './call-expression-to-member-expression'
import convertToBeDefined from './to-be-defined'
import convertToBeFalsy from './to-be-falsy'

const { MemberExpression } = j

const NAMES = {
  'toBe': 'be',
  'toEqual': 'equal',
  'toMatch': 'match',
  'toBeNull': 'be.null',
  'toBeTruthy': 'be.ok',
  'toContain': 'include',
  'toBeLessThan': 'be.below',
  'toBeGreaterThan': 'be.above',
  'toBeCloseTo': 'be.closeTo',
  'toThrow': 'throw'
}

const MATCHERS = Object.keys(NAMES).reduce((memo, name) => {
  memo[name] = translate(NAMES[name])
  return memo
}, Object.create(null))

MATCHERS.toBeDefined = convertToBeDefined
MATCHERS.toBeFalsy = convertToBeFalsy

const MATCHER_NAMES = Object.keys(MATCHERS)

export default function shift (source) {
  const $ = j(source)
  callExpressionToMemberExpression($)

  return $.find(MemberExpression)
    .filter(node => {
      return MATCHER_NAMES.indexOf(node.value.property.name) !== -1
    }).replaceWith(node => {
      return MATCHERS[node.value.property.name](node)
    }).toSource()
}

function jasmine2ChaiName (jasmineName) {
  return NAMES[jasmineName]
}

function translate (newName) {
  return function (node) {
    const name = jasmine2ChaiName(node.value.property.name)
    const expectExpression = node.value.object
    const to = j.memberExpression(expectExpression, j.identifier('to'))
    const assertion = j.memberExpression(to, j.identifier(name))
    return assertion
  }
}

