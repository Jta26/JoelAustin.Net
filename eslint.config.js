import js from '@eslint/js';
import stylex from '@stylexjs/eslint-plugin';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  {
    ignores: ['dist'],
  },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      globals: globals.browser,
      parserOptions: {
        project: ['./tsconfig.app.json', './tsconfig.node.json'],
        tsconfigRootDir: import.meta.dirname,
      },
    },
    plugins: {
      '@stylexjs': stylex,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      '@stylexjs/no-conflicting-props': 'error',
      '@stylexjs/no-legacy-contextual-styles': 'warn',
      '@stylexjs/no-lookahead-selectors': 'warn',
      '@stylexjs/no-nonstandard-styles': 'warn',
      '@stylexjs/no-unused': 'warn',
      '@stylexjs/sort-keys': 'warn',
      '@stylexjs/valid-shorthands': 'warn',
      '@stylexjs/valid-styles': 'error',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
);
