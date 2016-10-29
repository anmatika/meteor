module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "no-unused-vars": ["warn", { "vars": "all", "args": "after-used" }],
        "linebreak-style": ["off"],
        "import/no-extraneous-dependencies": [0],
        "import/extensions": [0],
        "import/no-unresolved": [0],
        "one-var": [0]
    }
};
