export function test(t) {
  return Object.assign({
    languageOptions: {
      sourceType: 'module',
      ecmaVersion: 2022,
    },
  }, t);
}
