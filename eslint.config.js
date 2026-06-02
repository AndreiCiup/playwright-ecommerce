import js from '@eslint/js';
import playwright from 'eslint-plugin-playwright';

export default [
  js.configs.recommended,
  {
    languageOptions: {
      globals: {
        process: 'readonly',
      },
    },
  },
  {
    ...playwright.configs['flat/recommended'],
    files: ['tests/**/*.js', 'fixtures/**/*.js'],
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'playwright/expect-expect': 'error',
      'playwright/no-wait-for-timeout': 'warn',
      'playwright/no-skipped-test': 'warn',
      'playwright/valid-expect': 'error',
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  {
    files: ['pages/**/*.js', 'utils/**/*.js', 'fixtures/**/*.js'],
    rules: {
      'no-unused-vars': 'warn',
      'no-undef': 'error',
    },
  },
  {
    ignores: ['node_modules/**', 'playwright-report/**', 'test-results/**', 'e2e/**'],
  },
];
