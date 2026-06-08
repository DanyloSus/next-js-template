/** @type {import("prettier").Config} */
module.exports = {
  singleQuote: false,
  jsxSingleQuote: false,
  trailingComma: "es5",
  arrowParens: "avoid",
  bracketSpacing: true,
  bracketSameLine: false,
  printWidth: 80,
  semi: true,
  useTabs: false,
  tabWidth: 2,
  quoteProps: "as-needed",
  endOfLine: "lf",
  plugins: ["prettier-plugin-tailwindcss"],
  tailwindStylesheet: "./src/app/globals.css",
  overrides: [
    {
      files: "*.jsx",
      options: {
        singleAttributePerLine: true,
      },
    },
  ],
};
