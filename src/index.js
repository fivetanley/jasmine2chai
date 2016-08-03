import j from 'jscodeshift'

const { MemberExpression } = j

const MATCHERS = {
  'toBe': 'be',
  'toEqual': 'equal'
}

const MATCHER_NAMES = Object.keys(MATCHERS)

export default function shift (source) {
  return j(source)
    .find(MemberExpression)
    .filter(node => {
      return MATCHER_NAMES.indexOf(node.value.property.name) !== -1
    }).replaceWith(node => {
      const name = jasmine2ChaiName(node.value.property.name)
      const expectExpression = node.value.object
      const to = j.memberExpression(expectExpression, j.identifier('to'))
      const assertion = j.memberExpression(to, j.identifier(name))
      return assertion
    }).toSource()
}

function jasmine2ChaiName (jasmineName) {
  return MATCHERS[jasmineName]
}
