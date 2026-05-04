export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow destructuring in function parameters when there are too many params.',
    },
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
    messages: {
      tooManyParams: 'Do not use destructuring in params when there are more than {{maxParams}} params.',
    },
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
        if (node.parent.type === 'ArrowFunctionExpression' ||
          node.parent.type === 'FunctionDeclaration') {
          if (node.parent.params.length > maxParams) {
            context.report({
              node,
              messageId: 'tooManyParams',
              data: { maxParams: String(maxParams) },
            });
          }
        }
      },
    };
  },
};
