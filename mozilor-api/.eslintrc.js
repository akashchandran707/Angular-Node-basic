module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    "prefer-promise-reject-errors": [
      "off",
      {
        "allowEmptyReject": true
      }
    ],
    "max-classes-per-file": ["off", 2],
    "no-useless-catch": ["error"],
    "no-async-promise-executor": ["error"],
    "no-misleading-character-class": ["error"],
    "prefer-object-spread": ["error"],
    "no-use-before-define" : ['off']
  },
};
