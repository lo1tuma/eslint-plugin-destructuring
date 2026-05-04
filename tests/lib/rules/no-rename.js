// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/no-rename.js';
import { test } from '../utils.js';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ messageId: 'noRename' }];

ruleTester.run('no-rename', rule, {
  valid: [
    test({ code: 'var { a } = b;' }),
    test({ code: 'var { a : { c } } = b;' }),
    test({ code: 'var { a : [ c ] } = b;' }),
    test({ code: 'var a = { b };' }),
    test({ code: 'var a = { b : b };' }),
    test({ code: 'var a = { b : c };' }),
    test({ code: 'var a = { b : { c : b } };' }),
    test({ code: 'var { "data-prop" : a } = b;' }),
  ],
  invalid: [
    test({
      code: 'var { a : c } = b;',
      errors,
    }),
    test({
      code: 'var { a : a } = b;',
      errors,
    }),
    test({
      code: 'var { a : { c : d } } = b;',
      errors,
    }),
    test({
      code: 'var { "data-prop" : a, a : c } = b;',
      errors,
    }),
  ],
});
