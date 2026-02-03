import playwright from 'eslint-plugin-playwright';
import prettier from 'eslint-plugin-prettier/recommended';
import js from '@eslint/js';
import globals from 'globals';

export default [
  // 1. Base rules
  js.configs.recommended,

  // 2. Setup for project files
  {
    files: ['**/*.{js,mjs,cjs}'],
    plugins: {
      playwright: playwright,
    },
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      // This fix solves the 'process is not defined' error
      globals: {
        ...globals.node,
        ...globals.browser,
      },
    },
    rules: {
      ...playwright.configs['flat/recommended'].rules,
      'no-unused-vars': 'warn',
      'playwright/no-skipped-test': 'warn',
    },
  },

  // 3. Global ignores (Standard for ESLint 9)
  {
    ignores: [
      'node_modules/',
      'allure-results/',
      'allure-report/',

      'test-results/',
      '*.zip',
      '.env',
      'node_modules/**',
      'test-results/**',
      'playwright-report/**',
      'blob-report/**',
      '.auth/**',
    ],
  },

  // 4. Prettier (must be last)
  prettier,
];
