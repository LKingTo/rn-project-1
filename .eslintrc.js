module.exports = {
  extends: ['standard', 'standard-jsx'],
  env: {
    node: true,
    browser: true,
    es6: true
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  rules: {
    indent: ['error', 4, { SwitchCase: 1 }],
    'react/jsx-indent': ['error', 4],
    'react/jsx-indent-props': ['error', 4],
    'jsx-quotes': ['error', 'prefer-double'],
    'space-before-function-paren': ['error', { anonymous: 'never', named: 'never' }],
    'object-curly-spacing': ['error', 'always'],
    'no-unused-vars': 0,
    'no-trailing-spaces': ['error', { skipBlankLines: true, ignoreComments: true }],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'ignore',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ]
  }
}

