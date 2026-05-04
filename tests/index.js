import assert from 'node:assert';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

import plugin from '../src/index.js';
import pkg from '../package.json' with { type: 'json' };

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const ruleNames = fs.readdirSync(path.resolve(__dirname, '../src/rules/'))
  .map(f => path.basename(f, '.js'));

describe('plugin', () => {
  it('exports all rule files', async () => {
    for (const ruleName of ruleNames) {
      const moduleUrl = pathToFileURL(
        path.resolve(__dirname, `../src/rules/${ruleName}.js`),
      ).href;
      const { default: ruleModule } = await import(moduleUrl);
      assert.strictEqual(
        plugin.rules[ruleName],
        ruleModule,
        `rule ${ruleName} is not exported`,
      );
    }
  });

  it('exposes plugin meta for flat config compatibility', () => {
    assert.strictEqual(plugin.meta.name, pkg.name);
    assert.strictEqual(plugin.meta.version, pkg.version);
  });

  it('provides a recommended flat config that bundles itself as the plugin', () => {
    const recommended = plugin.configs.recommended;
    assert.strictEqual(recommended.plugins.destructuring, plugin);
    assert.deepStrictEqual(recommended.rules, {
      'destructuring/no-rename': 'error',
      'destructuring/in-params': 'error',
      'destructuring/in-methods-params': 'error',
    });
  });
});
