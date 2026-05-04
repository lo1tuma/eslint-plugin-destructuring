import noRename from './rules/no-rename.js';
import inParams from './rules/in-params.js';
import inMethodsParams from './rules/in-methods-params.js';

import pkg from '../package.json' with { type: 'json' };

const { name, version } = pkg;

const recommendedRules = {
  'destructuring/no-rename': 'error',
  'destructuring/in-params': 'error',
  'destructuring/in-methods-params': 'error',
};

const plugin = {
  meta: { name, version },
  rules: {
    'no-rename': noRename,
    'in-params': inParams,
    'in-methods-params': inMethodsParams,
  },
  configs: {
    // Legacy (.eslintrc) config — consumers add `plugins: ['destructuring']` themselves.
    recommended: {
      rules: recommendedRules,
    },
  },
};

// Flat config (eslint.config.js, ESLint 9). Bundles the plugin reference so
// users only need to spread this object into their config array.
plugin.configs['flat/recommended'] = {
  plugins: { destructuring: plugin },
  rules: recommendedRules,
};

export default plugin;
