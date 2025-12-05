module.exports = {
  env: {
    node: true,
    es2021: true,
    jest: true, // Add this line to enable Jest globals
  },
  extends: ['eslint:recommended', 'plugin:prettier/recommended'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
  },
  rules: {
    // Add any custom ESLint rules here
  },
};
