import j from 'jscodeshift'

const CONVERT_CALL_TO_MEMBER_EXPRESSION = [
  'toBeDefined',
  'toBeNull',
  'toBeTruthy',
  'toBeFalsy',
  'toHaveBeenCalled'
]

export default function callExpressionToMemberExpression ($) {
  return $.find(j.CallExpression)
    .filter(node => {
      return j.MemberExpression.check(node.value.callee)
    }).filter(node => {
      return CONVERT_CALL_TO_MEMBER_EXPRESSION.indexOf(node.value.callee.property.name) >= 0
    }).replaceWith(node => {
      return j.memberExpression(node.value.callee.object, j.identifier(node.value.callee.property.name))
    })
}
