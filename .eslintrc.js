module.exports = {
    env: {
        browser: true,
        commonjs: true,
        es2021: true,
        jest: true
    },
    extends: 'standard',
    overrides: [
        {
            env: {
                node: true
            },
            files: [
                '.eslintrc.{js,cjs}'
            ],
            parserOptions: {
                sourceType: 'script'
            }
        }
    ],
    parserOptions: {
        ecmaVersion: 'latest'
    },
    rules: {
        indent: ['error', 4],
        'prefer-promise-reject-errors': 'off',
        'object-shorthand': 'off',
        'spaced-comment': 'off',
        'no-prototype-builtins': 'off'
    }
}
