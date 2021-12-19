module.exports = {
    "env": {
        "browser": true,
        "es2021": true,
        "node": true
    },
    "extends": [
        "airbnb-base",
        "plugin:prettier/recommended",
        "prettier",
        "plugin:@typescript-eslint/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 13,
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "prettier", 
        "import"
    ],
    "rules": {
      "quotes": [2, "single", { "avoidEscape": true, "allowTemplateLiterals": true }]
    }
};
