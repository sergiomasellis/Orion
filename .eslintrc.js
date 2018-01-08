module.exports = {
  extends: "eslint:recommended",
  parserOptions: {
    ecmaVersion: 6,
    sourceType: "module"
  },
  rules: {
    "max-len": [2, { code: 200, tabWidth: 2, ignoreUrls: true }]
  }
};
