module.exports = {
    env: {
        browser: true,
        node: true,
        mocha: true,
        es6: true,
        jquery: true
    },
    // https://github.com/feross/standard/blob/master/RULES.md#javascript-standard-style
    extends: "standard",
    globals: {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly",
        "CustomLabel": true
    },
    parserOptions: {
        "sourceType": "module"
    },
    'rules': {
        // allow paren-less arrow functions
        'arrow-parens': 0,
        // allow async-await
        'generator-star-spacing': 0,
        // allow debugger during development
        'no-debugger': 0,
        'space-before-function-paren': 0,
        "indent": ["error", 4, {
            "SwitchCase": 1,
            "VariableDeclarator": 1,
            "outerIIFEBody": 1,
            "MemberExpression": 1,
            "FunctionDeclaration": { "parameters": 1, "body": 1 },
            "FunctionExpression": { "parameters": 1, "body": 1 },
            "CallExpression": { "arguments": 1 },
            "ArrayExpression": "off",
            "ObjectExpression": 1,
            "ImportDeclaration": 1,
            "flatTernaryExpressions": false,
            "ignoreComments": false
          }],
    }
};