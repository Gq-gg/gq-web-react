// .prettierrc.cjs
module.exports = {
    pluginSearchDirs: false,
    plugins: [
      require.resolve('prettier-plugin-organize-imports'),
      require.resolve('prettier-plugin-packagejson'),
    ],
    printWidth: 80,
    proseWrap: 'never',
    "semi": true,
    singleQuote: true,
    "tabWidth": 2,
    "arrowParens": "avoid",
    "bracketSameLine": true,
    "bracketSpacing": true,
    "jsxSingleQuote": true,
    "jsxBracketSameLine": true,
    trailingComma: 'all',
    "ignorePath": ".prettierignore",
    overrides: [
      {
        files: '*.md',
        options: {
          proseWrap: 'preserve',
        },
      },
      {
        "files": ".prettierrc.cjs",
        "options": {
          "parser": "js"
        }
      }
    ],
  };
  
  