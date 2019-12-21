module.exports = {
  extends: ['react-app', 'airbnb', 'prettier'],
  rules: {
    'react/prefer-stateless-function': 0,
    'react/jsx-filename-extension': 0,
    'react/jsx-one-expression-per-line': 0,
    'no-underscore-dangle': 0,
    'react/forbid-prop-types': 0,
    'import/prefer-default-export': 0,
  },
  env: {
    browser: true,
  },
};
