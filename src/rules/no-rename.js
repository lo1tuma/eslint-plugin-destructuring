export default {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow renaming destructured properties when the source name is a valid identifier.',
    },
    schema: [],
    messages: {
      noRename: 'Do not use destructuring rename for valid identifiers.',
    },
  },

  create: function noRename(context) {
    return {
      Property(node) {
        if (node.parent.type === 'ObjectPattern' &&
          node.shorthand === false &&
          node.value &&
          node.value.type === 'Identifier' &&
          node.key.type !== 'Literal') {
          context.report({ node, messageId: 'noRename' });
        }
      },
    };
  },
};
