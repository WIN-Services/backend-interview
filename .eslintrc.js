module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier'
  ],
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 13,
  },
  settings: {
    'import/extensions': ['.js', '.jsx', '.ts', '.tsx'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  },
  plugins: [
    '@typescript-eslint',
    'prettier',
  ],
  rules: {
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never',
        ts: 'never',
        tsx: 'never',
        mjs: 'never',
      },
    ],
    'no-useless-constructor': 'off',
    'comma-dangle': 'off',
    'no-shadow': 'off',
    'arrow-parens': 'off',
    'no-underscore-dangle': ['error', { allow: ['_originalMime', '_router', '_initPaths', '__UserPrinciple'] }],
    'class-methods-use-this': 'off',
    'no-restricted-syntax': [
      'error',
      'LabeledStatement',
      'WithStatement',
    ],
    'import/no-cycle': 'off',
    'import/prefer-default-export': 'off',
    '@typescript-eslint/no-inferrable-types': [
      2,
      {
        ignoreParameters: true,
      }
    ],
    'default-param-last': 'off',
    'no-await-in-loop': 'off',
    'no-continue': 'off',
    'no-console': ['error', { allow: ['warn'] }],
  }
};
