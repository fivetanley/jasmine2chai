import j from 'jscodeshift'

export default function isNegated (node) {
  return (j.MemberExpression.check(node.value.object) &&
    node.value.object.property.name === 'not')
}
