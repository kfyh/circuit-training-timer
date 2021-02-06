module.exports = {
  env: {
    browser: true,
    es6: true,
    jest: true
  },
  parser: '@typescript-eslint/parser',
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "plugin:prettier/recommended" 
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
    'typescript',
    '@typescript-eslint',
    'jest',
    'react'
  ],
  "rules": {
    "@typescript-eslint/interface-name-prefix": [
        "error", {
            "prefixWithI": "always"
        }
    ],
    "@typescript-eslint/explicit-member-accessibility": [
        "error",
        {
            "accessibility": "explicit",
            "overrides": {
              "constructors": "no-public",
              "methods": "explicit",
              "properties": "explicit"
            }
          }
    ],
    "quotes": [
      "error", 
      "single", 
      { 
        "avoidEscape": true, 
        "allowTemplateLiterals": true 
      }
    ],
    "no-restricted-syntax": [
      "error", 
      {
          "selector": "ExportDefaultDeclaration",
          "message": "Prefer named exports"
      }
    ],
    "brace-style": [
      2, 
      "1tbs", 
      { 
          "allowSingleLine": true
      }
    ],
    "no-tabs":[
      "error",
      {
          "allowIndentationTabs": true
      }
    ],
    "complexity": "off",
    "no-delete-var": "off",
    "no-unsafe-negation": "off"
},
"overrides": [
    {
      "files": ["test/**/*.test.ts","*-test.js","*.spec.js"],
      "rules": {
        "prettier/prettier": "off",
        "@typescript-eslint/no-explicit-any": "off",
        "@typescript-eslint/no-unused-vars": "off",
        "@typescript-eslint/no-empty-function": "off",
        "@typescript-eslint/no-use-before-define": "off"
      }
    }, 
    {
      "files": ["*.config.js", ".eslintrc.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
      }
    }
  ]
}
