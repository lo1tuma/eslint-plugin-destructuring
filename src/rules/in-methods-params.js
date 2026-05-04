export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow destructuring in method parameters.',
    },
    schema: [],
    messages: {
      noDestructuring: 'Do not use destructuring in method params.',
    },
  },

  create: function inMethodsParams(context) {
    return {
      ObjectPattern(node) {
        if (node.parent && node.parent.parent &&
          node.parent.parent.type === 'MethodDefinition') {
          context.report({ node, messageId: 'noDestructuring' });
        }
      },
    };
  },
};
