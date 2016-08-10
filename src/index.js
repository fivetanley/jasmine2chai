import j from 'jscodeshift'
import callExpressionToMemberExpression from './call-expression-to-member-expression'

const { MemberExpression } = j

const NAMES = {
  'toBe': 'be',
  'toEqual': 'equal',
  'toMatch': 'match',
  'toBeNull': 'be.null',
  'toBeTruthy': 'be.ok'
}

const MATCHERS = Object.keys(NAMES).reduce((memo, name) => {
  memo[name] = translate(NAMES[name])
  return memo
}, Object.create(null))

MATCHERS.toBeDefined = convertToBeDefined

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

function convertToBeDefined (node) {
  let expectExpression = node.value.object
  let to
  if (isNegated(node)) {
    to = j.memberExpression(expectExpression.object, j.identifier('to'))
  } else {
    to = j.memberExpression(expectExpression, j.identifier('to'))
    to = j.memberExpression(to, j.identifier('not'))
  }
  const be = j.memberExpression(to, j.identifier('be'))
  const _undefined = j.memberExpression(be, j.identifier('undefined'))
  return _undefined
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

function isNegated (node) {
  return (j.MemberExpression.check(node.value.object) &&
    node.value.object.property.name === 'not')
}

