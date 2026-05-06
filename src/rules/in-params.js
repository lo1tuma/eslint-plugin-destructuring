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

    function checkFunction(node) {
      if (node.params.length <= maxParams) return;
      for (const param of node.params) {
        // A destructured param with a default value (e.g. `function f({ a } = {})`)
        // wraps the ObjectPattern in an AssignmentPattern.
        const target = param.type === 'AssignmentPattern' ? param.left : param;
        if (target.type === 'ObjectPattern') {
          context.report(target, 'Do not use destructuring in params when there' +
            ` are more than ${maxParams} params.`);
        }
      }
    }

    return {
      FunctionDeclaration: checkFunction,
      FunctionExpression: checkFunction,
      ArrowFunctionExpression: checkFunction,
    };
  },
};
