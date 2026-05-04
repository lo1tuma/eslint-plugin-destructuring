//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {},

    schema: [
      {
        type: 'object',
        properties: {
          'max-params': {
            type: 'integer',
            minimum: 0,
          },
        },
        additionalProperties: false,
      },
    ],
  },

  create: function inParams(context) {
    const option = context.options[0];
    let maxParams = 1;

    if (typeof option === 'object' &&
      Object.prototype.hasOwnProperty.call(option, 'max-params') &&
      typeof option['max-params'] === 'number') {
      maxParams = option['max-params'];
    }

    return {
      ObjectPattern(node) {
        // A destructured param with a default value (e.g. `function f({ a } = {})`)
        // is wrapped in an AssignmentPattern, so the function is the grandparent.
        const fnNode = node.parent.type === 'AssignmentPattern' ?
          node.parent.parent : node.parent;

        if (fnNode && (fnNode.type === 'ArrowFunctionExpression' ||
          fnNode.type === 'FunctionDeclaration')) {
          if (fnNode.params.length > maxParams) {
            context.report(node, 'Do not use destructuring in params when there' +
              ` are more than ${maxParams} params.`);
          }
        }
      },
    };
  },
};
