import j from 'jscodeshift'
import isNegated from './is-negated'

export default function convertToBeDefined (node) {
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
