import noRename from './rules/no-rename.js';
import inParams from './rules/in-params.js';
import inMethodsParams from './rules/in-methods-params.js';

import pkg from '../package.json' with { type: 'json' };

const { name, version } = pkg;

const plugin = {
  meta: { name, version },
  rules: {
    'no-rename': noRename,
    'in-params': inParams,
    'in-methods-params': inMethodsParams,
  },
  configs: {},
};

plugin.configs.recommended = {
  plugins: { destructuring: plugin },
  rules: {
    'destructuring/no-rename': 'error',
    'destructuring/in-params': 'error',
    'destructuring/in-methods-params': 'error',
  },
};

export default plugin;
