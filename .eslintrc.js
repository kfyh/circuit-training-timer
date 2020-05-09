module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: 'babel-eslint',
  extends: [
    'plugin:react/recommended',
    'standard'
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly'
  },
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 2018,
    sourceType: 'module'
  },
  plugins: [
    'jest',
    'react'
  ],
  rules: {
  }
}
