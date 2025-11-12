module.exports = {
  env: {
    commonjs: true,
    node: true,
    es2021: true,
    jest: true
  },
  extends: [
    'eslint:recommended',
    'plugin:promise/recommended',
    'plugin:import/recommended',
    'plugin:node/recommended',
    'prettier'
  ],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'node/no-unpublished-require': 'off'
  }
};
