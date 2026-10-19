import js from '@eslint/js';
import ts from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';
import react from 'eslint-plugin-react';
import globals from 'globals';

export default [
    { ignores: ['node_modules/**', '.next/**', '.next-e2e/**', 'out/**', '.upgrade-backups/**', 'next-env.d.ts', 'test-results/**', 'playwright-report/**'] },
    {
        files: ['**/*.{js,jsx,ts,tsx,mjs}'],
        languageOptions: { parser, parserOptions: { ecmaFeatures: { jsx: true } }, globals: { ...globals.browser, ...globals.node } },
        plugins: { '@typescript-eslint': ts, react },
        settings: { react: { version: 'detect' } },
        rules: {
            ...js.configs.recommended.rules,
            ...react.configs.recommended.rules,
            ...ts.configs.recommended.rules,
            'react/react-in-jsx-scope': 'off',
            'react/display-name': 'off',
            'react/prop-types': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/no-require-imports': 'off',
            '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
            'no-console': ['error', { allow: ['warn', 'error'] }]
        }
    }
];
