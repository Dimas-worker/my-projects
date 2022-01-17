module.exports = {
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  "extends": [
      'airbnb-base',
      'airbnb-typescript/base',
      "plugin:prettier/recommended",
      "prettier",
      "plugin:@typescript-eslint/recommended"
  ],
  "parser": "@typescript-eslint/parser",
  "parserOptions": {
      "ecmaVersion": 13,
      "sourceType": "module",
      "project": './tsconfig.json'
  },
  "plugins": [
      "@typescript-eslint",
      "prettier", 
      "import"
  ],
  "rules": {
    "no-plusplus": "off"
  },
};