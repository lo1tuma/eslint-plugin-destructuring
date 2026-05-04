//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  create: function inMethodsParams(context) {
    return {
      ObjectPattern(node) {
        // A destructured param with a default value (e.g. `method({ a } = {}) {}`)
        // is wrapped in an AssignmentPattern, adding an extra level above the
        // ObjectPattern before reaching the FunctionExpression / MethodDefinition.
        const fnNode = node.parent && node.parent.type === 'AssignmentPattern' ?
          node.parent.parent : node.parent;

        if (fnNode && fnNode.parent &&
          fnNode.parent.type === 'MethodDefinition') {
          context.report(node, 'Do not use destructuring in method params.');
        }
      },
    };
  },
};
