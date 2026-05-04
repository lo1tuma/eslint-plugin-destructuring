ESLint-Plugin-Destructuring
===========================

[![NPM version][npm-image]][npm-url] [![Build Status][ci-image]][ci-url]

Destructuring-specific linting rules for ESLint. Supports ESLint 8 and 9 (including the new flat config).

# Installation

Install [ESLint](https://www.github.com/eslint/eslint) and the plugin:

    $ npm install --save-dev eslint eslint-plugin-destructuring

This plugin requires Node 20.19+ and ESLint 8.40+.

# Configuration

## Flat config (ESLint 9, `eslint.config.js`)

The package ships as ESM. Import it from your flat config:

```js
import destructuring from 'eslint-plugin-destructuring';

export default [
  destructuring.configs['flat/recommended'],
];
```

Or pick the rules manually:

```js
import destructuring from 'eslint-plugin-destructuring';

export default [
  {
    plugins: { destructuring },
    rules: {
      'destructuring/no-rename': 'error',
      'destructuring/in-params': ['error', { 'max-params': 1 }],
      'destructuring/in-methods-params': 'error',
    },
  },
];
```

## Legacy config (`.eslintrc`)

```json
{
  "plugins": ["destructuring"],
  "extends": ["plugin:destructuring/recommended"]
}
```

# List of provided rules

All rules are off by default. The `recommended` and `flat/recommended` configs turn them all on.

* [no-rename](docs/rules/no-rename.md): Forbid rename syntax when object destructuring.
* [in-params](docs/rules/in-params.md): Configure destructuring within parameters.
* [in-methods-params](docs/rules/in-methods-params.md): Forbid destructuring within method parameters.

# Contributing

Contributions are always welcome.

# License

eslint-plugin-destructuring is licensed under the [MIT License](http://www.opensource.org/licenses/mit-license.php).

[npm-url]: https://npmjs.org/package/eslint-plugin-destructuring
[npm-image]: http://img.shields.io/npm/v/eslint-plugin-destructuring.svg?style=flat-square

[ci-url]: https://github.com/lukeapage/eslint-plugin-destructuring/actions/workflows/ci.yml
[ci-image]: https://img.shields.io/github/actions/workflow/status/lukeapage/eslint-plugin-destructuring/ci.yml?branch=master&style=flat-square
