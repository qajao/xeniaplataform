import pluginJs from '@eslint/js';
import pluginCypress from 'eslint-plugin-cypress/flat';
import globals from "globals";

export default [
    pluginJs.configs.recommended,
    pluginCypress.configs.recommended,
    {
        files: ['**/*.js', '**/*.jsx'],
        languageOptions: {
            ecmaVersion: 'latest',
            sourceType: 'module',
            globals: {
                ...globals.browser,
                ...globals.node
            }
        },
        rules: {
            'cypress/no-unnecessary-waiting': 'error',
            'camelcase': ['error', { properties: 'always' }],
            'indent': ['error', 4, { 'SwitchCase': 1 }],
            'no-multiple-empty-lines': ['error', { 'max': 2, 'maxEOF': 0 }],
            'operator-assignment': ['error', 'always'],
            'space-infix-ops': 'error',
            'space-before-blocks': 'error',
            'space-in-parens': 'error',
            'keyword-spacing': 'error',
            'lines-around-comment': ['error', { 'beforeBlockComment': true, 'beforeLineComment': true, 'allowBlockStart': true }],
            'spaced-comment': 'error',
            'newline-per-chained-call': ['error', { 'ignoreChainWithDepth': 3 }],
            'quotes': ['error', 'single'],
            'newline-after-var': 'error',
            'arrow-spacing': 'error',
            'no-trailing-spaces': 'error'
        }
    }
];
