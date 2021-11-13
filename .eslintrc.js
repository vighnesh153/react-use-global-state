module.exports = {
  env: {
    browser: true,
    es2021: true,
    'jest/globals': true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint', 'jest'],
  rules: {
    'react/jsx-filename-extension': [
      2,
      {
        'extensions': ['.ts', '.tsx']
      },
    ],
    'react/destructuring-assignment': 'off',
    'react/jsx-props-no-spreading': 'off',
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": ["error"],
    "import/extensions": "off",
    "import/no-extraneous-dependencies": 'off',
    "react/prop-types": 'off',
  },
};
