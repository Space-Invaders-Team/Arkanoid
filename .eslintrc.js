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
    'airbnb/hooks',
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
    "object-curly-newline": 0,
    "no-plusplus": 0,
    "class-methods-use-this": 0,
    "no-underscore-dangle": 0,
    "no-console": [1, { allow: ["warn", "error"] }],
    '@typescript-eslint/ban-ts-comment': 1,
    "@typescript-eslint/type-annotation-spacing": "warn",
    "react/react-in-jsx-scope": 0,
    "react/button-has-type": 0,
    "react/require-default-props": 0,
    "react/jsx-props-no-spreading": 0,
    "import/prefer-default-export": 0,
    "import/no-default-export": 1,
    "import/no-extraneous-dependencies": [
      "error",
      {
        "devDependencies": [
          "test.{ts,tsx}", // repos with a single test file
          "test-*.{ts,tsx}", // repos with multiple top-level test files
          "**/*{.,_}{test,spec}.{ts,tsx}", // tests where the extension or filename suffix denotes that it is a test
          "**/jest.config.ts", // jest config
          "**/jest.setup.ts" // jest setup
        ],
        "optionalDependencies": false
      }
    ],
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
    "import/extensions": [
      "warn",
      "always",
      {
        "pattern": {
          "jsx": "never",
          "tsx": "never",
          "ts": "never",
          "js": "never",
        }
      }
    ],
    "@typescript-eslint/ban-types": [
      "error",
      {
        "extendDefaults": true,
        "types": {
          "{}": false
        }
      }
    ],
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "warn",
  },
  ignorePatterns: ['**/*.js', "*/dist/*"],
}
