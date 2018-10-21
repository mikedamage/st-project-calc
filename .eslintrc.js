module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es6: true,
  },
  extends: 'eslint:recommended',
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'array-callback-return': 'error',
    'no-console': 'off',
    'eqeqeq': [ 'error', 'always', { null: 'ignore' } ],
    'no-useless-return': 'error',
    'radix': 'error',
    'yoda': 'warn',
  },
};
