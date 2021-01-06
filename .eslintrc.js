module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: [
    'plugin:vue/essential',
    '@vue/airbnb',
    '@vue/typescript',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'max-len': 'off',
    "vue/html-indent": ["error", 2],
    "vue/html-indent": "off",
    "vue/max-attributes-per-line": "off",
    "camelcase": "off",
    "arrow-parens": ["error", "as-needed"],
    "import/extensions": "off",
    "lines-between-class-members": "off",
    "indent": ["error", 2],
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
    "import/newline-after-import": "off",
    "global-require": "off",
    "prefer-template": "off",
    "max-len": ["error", 200],
    "no-console":  "off",
    "no-debugger": "warn",
    "newline-per-chained-call": "off",
    "object-curly-newline": "off",
    "no-param-reassign": "off",
    "no-restricted-syntax": [
      "error",
      "LabeledStatement",
      "WithStatement"
    ],
    "no-underscore-dangle": "off",
    "import/no-unresolved": [
      "error",
      {
        "ignore": ['components/']
      }
    ],
    "import/no-extraneous-dependencies": "off",
  },
  parserOptions: {
    parser: '@typescript-eslint/parser',
  },
};
