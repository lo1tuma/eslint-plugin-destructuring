// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/in-params';
import { test } from '../utils';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ message:
  'Do not use destructuring in params when there are more than 1 params.' }];
const errorsZero = [{ message:
  'Do not use destructuring in params when there are more than 0 params.' }];
ruleTester.run('in-params', rule, {
  valid: [
    test({ code: 'var { a } = b;' }),
    test({ code: 'var { a : { c } } = b;' }),
    test({ code: 'var { a : [ c ] } = b;' }),

    test({ code: 'function t({ a, b, c }) {}' }),
    test({ code: 'var a = ({a, b, c : { d : { e } }}) => a;' }),

    test({ code: 'function t(a, b) {}' }),
    test({ code: 'function t(a, b = (() => { const {a} = b; })) {}' }),

    // single destructured param with a default value is allowed
    // when max-params defaults to 1 (issue #46 — must not regress on the valid side)
    test({ code: 'function t({ a } = {}) {}' }),
    test({ code: 'function t({ a, b, c } = {}) {}' }),
    test({ code: 'var a = ({ a } = {}) => a;' }),
    test({ code: 'var a = ({ a, b } = { a: 1, b: 2 }) => a;' }),

    // nested destructuring with defaults inside the param should not trigger
    test({ code: 'function t({ a: { b } = {} }) {}' }),
    test({ code: 'function t({ a: [ b ] = [] }) {}' }),

    // default-value AssignmentPatterns elsewhere must not match the function check
    test({ code: 'var [{ a } = {}] = b;' }),
    test({ code: 'var { x: { a } = {} } = b;' }),
  ],
  invalid: [test({
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

    // Issue #46: destructured param with a default value still counts as a
    // destructured param. Without the fix, the AssignmentPattern wrapper
    // hides the ObjectPattern from the rule.
    test({
      code: 'function t({ a } = {}, b) {}',
      errors,
    }),
    test({
      code: 'function t(b, { a } = {}) {}',
      errors,
    }),
    test({
      code: 'var a = ({ a } = {}, b) => a;',
      errors,
    }),
    test({
      code: 'var a = (b, { a } = {}) => a;',
      errors,
    }),
    test({
      code: 'function t({ a } = {}, { b } = {}) {}',
      errors: errors.concat(errors),
    }),

    // Issue #46 with max-params: 0 — exact scenario from the bug report.
    test({
      code: 'function t({ timeoutSeconds = 3 } = {}) {}',
      options: [{ 'max-params': 0 }],
      errors: errorsZero,
    }),
    test({
      code: 'var a = ({ a } = {}) => a;',
      options: [{ 'max-params': 0 }],
      errors: errorsZero,
    }),
    test({
      code: 'function t({ a } = {}) {}',
      options: [{ 'max-params': 0 }],
      errors: errorsZero,
    }),
    test({
      code: 'function t({ a }) {}',
      options: [{ 'max-params': 0 }],
      errors: errorsZero,
    }),
  ],
});
