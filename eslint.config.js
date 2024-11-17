import eslint from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import pluginTsEslint from '@typescript-eslint/eslint-plugin';
import eslintPluginPrettier from 'eslint-plugin-prettier';
import react from 'eslint-plugin-react';
import tseslintparser from '@typescript-eslint/parser';
import tseslint from 'typescript-eslint';

export default tseslint.config(
  eslint.configs.recommended,
  ...tseslint.configs.recommended,
  { ignores: ['dist'] },
  {
    settings: { react: { version: '18.3' } },
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tseslintparser,
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      react: react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      prettier: eslintPluginPrettier,
      tseslint: pluginTsEslint,
    },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  }
);
