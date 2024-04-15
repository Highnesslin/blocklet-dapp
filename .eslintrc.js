const { join } = require('path');

module.exports = {
  root: true,
  extends: '@arcblock/eslint-config-ts',
  parserOptions: {
    project: [join(__dirname, 'tsconfig.eslint.json'), join(__dirname, 'tsconfig.json')],
  },
  rules: {
    'unicorn/filename-case': 'off',
    'func-names': 'off',
    'no-bitwise': 'off',
    'react/jsx-no-comment-textnodes': 'off',
    'spaced-comment': 'off',
    'react/require-default-props': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/indent': 'off',
    'import/extensions': 'off',
    'no-alert': 'off',
    '@typescript-eslint/naming-convention': 'off',
    'consistent-return': 'off',
    'default-case': 'off',
    'import/no-extraneous-dependencies': 'off',
  },
};
