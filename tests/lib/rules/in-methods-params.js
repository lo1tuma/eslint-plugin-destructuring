// ------------------------------------------------------------------------------
// Requirements
// ------------------------------------------------------------------------------

import { RuleTester } from 'eslint';
import rule from '../../../src/rules/in-methods-params.js';
import { test } from '../utils.js';

// ------------------------------------------------------------------------------
// Tests
// ------------------------------------------------------------------------------

const ruleTester = new RuleTester();
const errors = [{ messageId: 'noDestructuring' }];

ruleTester.run('in-methods-params', rule, {
  valid: [
    test({ code: 'var { a } = b;' }),
    test({ code: 'var { a : { c } } = b;' }),
    test({ code: 'var { a : [ c ] } = b;' }),

    test({ code: 'function t({ a, b, c }) {}' }),
    test({ code: 'var a = ({a, b, c : { d : { e } }}) => a;' }),

    test({ code: 'function t(a, b) {}' }),
    test({ code: 'function t(a, b = (() => { const {a} = b; })) {}' }),

    test({ code: 'class Test { constructor (a) {} }' }),
    test({ code: 'class Test { someMethod (a) {} }' }),
    test({ code: 'class Test { static someStaticMethod (a) {} }' }),
  ],
  invalid: [
    test({
      code: 'class Test { constructor ({ a }) {} }',
      errors,
    }),
    test({
      code: 'class Test { someMethod ({ a }) {} }',
      errors,
    }),
    test({
      code: 'class Test { static someStaticMethod ({ a }) {} }',
      errors,
    }),
  ],
});
