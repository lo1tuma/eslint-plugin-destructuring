// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/in-params.js';
import { test } from '../utils.js';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ messageId: 'tooManyParams', data: { maxParams: '1' } }];

ruleTester.run('in-params', rule, {
  valid: [
    test({ code: 'var { a } = b;' }),
    test({ code: 'var { a : { c } } = b;' }),
    test({ code: 'var { a : [ c ] } = b;' }),

    test({ code: 'function t({ a, b, c }) {}' }),
    test({ code: 'var a = ({a, b, c : { d : { e } }}) => a;' }),

    test({ code: 'function t(a, b) {}' }),
    test({ code: 'function t(a, b = (() => { const {a} = b; })) {}' }),
  ],
  invalid: [
    test({
      code: 'function t({ a }, b) {}',
      errors,
    }),
    test({
      code: 'var a = ({a}, b) => a;',
      errors,
    }),
    test({
      code: 'function t(b, { a }) {}',
      errors,
    }),
    test({
      code: 'function t(b, { a, d, c }) {}',
      errors,
    }),
  ],
});
