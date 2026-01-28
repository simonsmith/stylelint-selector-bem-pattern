import js from '@eslint/js';
import jest from 'eslint-plugin-jest';
import globals from 'globals';

export default [
  js.configs.recommended,
  {
    ignores: ['node_modules/**'],
  },
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.node,
        ...globals.es2021,
        testRule: 'readonly',
      },
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      'curly': 'off',
      'radix': 'error',
      'wrap-iife': 'error',
      'brace-style': 'off',
      'comma-style': 'error',
      'consistent-this': 'off',
      'indent': ['error', 2, { 'SwitchCase': 1 }],
      'no-console': 'off',
      'no-lonely-if': 'error',
      'no-nested-ternary': 'error',
      'no-use-before-define': ['error', 'nofunc'],
      'quotes': ['error', 'single'],
      'space-before-function-paren': ['error', 'never'],
      'keyword-spacing': ['error', { 'before': true }],
      'space-before-blocks': ['error', 'always'],
      'space-in-parens': ['error', 'never'],
      'space-unary-ops': 'error',
    },
  },
  {
    files: ['test/**/*.js'],
    plugins: {
      jest,
    },
    languageOptions: {
      globals: {
        ...globals.jest,
      },
    },
    rules: {
      ...jest.configs.recommended.rules,
    },
  },
];