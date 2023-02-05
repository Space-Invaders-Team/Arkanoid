module.exports = {
  root: true,
  env: {
    browser: true,
    es2020: true,
    node: true,
  },
  extends: [
    'eslint:recommended',
    'prettier',
    'plugin:@typescript-eslint/recommended',
    'airbnb',
    'airbnb-typescript',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: [
      './packages/*/tsconfig.json',
      './packages/client/tsconfig.node.json',
      './packages/server/tsconfig.prod.json',
    ],
    tsconfigRootDir: __dirname,
  },
  plugins: ['@typescript-eslint'],
  rules: {
    '@typescript-eslint/ban-ts-comment': 1,
    "import/prefer-default-export": 0,
    "object-curly-newline": 0,
    "no-plusplus": 0,
    "class-methods-use-this": 0,
    "react/react-in-jsx-scope": 0,
    "max-len": [
      "error",
      100,
      2,
      {
        "ignoreUrls": true,
        "ignoreComments": false,
        "ignoreRegExpLiterals": true,
        "ignoreStrings": true,
        "ignoreTemplateLiterals": true,
        "ignorePattern": "\\s<\\w+>.*<\\/\\w+>$"
      }
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false
      }
    ],
  },
  ignorePatterns: ['**/*.js', '*/dist/*'],
}
