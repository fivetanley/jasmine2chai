import isNegated from './is-negated'
import j from 'jscodeshift'

export default function convertToBeFalsy (node) {
  let expectExpression = node.value.object
  let to

  if (isNegated(node)) {
    to = j.memberExpression(expectExpression.object, j.identifier('to'))
  } else {
    to = j.memberExpression(expectExpression, j.identifier('to'))
    to = j.memberExpression(to, j.identifier('not'))
  }

  const be = j.memberExpression(to, j.identifier('be'))
  const ok = j.memberExpression(be, j.identifier('ok'))
  return ok
}
