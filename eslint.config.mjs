import { dirname, resolve } from "path";
import { fileURLToPath } from "url";

import { includeIgnoreFile } from "@eslint/compat";
import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import eslintConfigPrettier from "eslint-config-prettier";
import playwright from "eslint-plugin-playwright";
import eslintPluginPrettier from "eslint-plugin-prettier";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const gitignorePath = resolve(__dirname, ".gitignore");

const eslintConfig = defineConfig([
  // Honor .gitignore so we don't lint build artifacts, etc.
  includeIgnoreFile(gitignorePath),
  globalIgnores([
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
    "storybook-static/**",
    "coverage/**",
    "playwright-report/**",
    "test-results/**",
  ]),

  // Next.js (App Router) + TypeScript presets. These register the `import`,
  // `react`, `react-hooks`, `jsx-a11y`, and `@typescript-eslint` plugins, so we
  // reference their rules below without re-registering the plugins.
  ...nextVitals,
  ...nextTs,

  // Disable formatting rules that conflict with Prettier, then run Prettier as
  // a lint rule (errors show up as `prettier/prettier`).
  eslintConfigPrettier,
  {
    plugins: { prettier: eslintPluginPrettier },
    rules: { "prettier/prettier": "error" },
  },

  {
    // Type-aware linting needs a TS program. `tsconfig.eslint.json` widens the
    // include to cover config files and scripts.
    languageOptions: {
      parserOptions: {
        tsconfigRootDir: __dirname,
        project: ["./tsconfig.eslint.json"],
      },
    },
    settings: {
      "import/resolver": {
        typescript: {
          project: ["./tsconfig.json", "./tsconfig.eslint.json"],
        },
      },
    },
    rules: {
      // Correctness / quality
      "react/display-name": "off",
      "no-empty-function": "off",
      "no-empty": "error",
      "no-nested-ternary": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-spread": "error",
      "prefer-rest-params": "error",
      "default-case": "error",
      "default-case-last": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      "no-use-before-define": "error",
      "no-template-curly-in-string": "warn",
      "no-duplicate-imports": ["error"],
      "import/no-duplicates": "error",
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", ignoreRestSiblings: true },
      ],
      "@typescript-eslint/default-param-last": "error",
      "@typescript-eslint/no-empty-object-type": "off",
      "@typescript-eslint/no-mixed-enums": "error",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/prefer-destructuring": "error",
      "@typescript-eslint/prefer-optional-chain": "error",

      // React
      "react/jsx-key": "error",
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      "react/react-in-jsx-scope": "off",
      "react-hooks/exhaustive-deps": "off",

      // Hygiene
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-restricted-imports": [
        "error",
        {
          patterns: [
            {
              group: ["../../*"],
              message:
                "Use absolute imports with @/ instead of relative paths with multiple '../'",
            },
          ],
        },
      ],
      "import/order": [
        "error",
        {
          groups: [
            "builtin",
            "external",
            "internal",
            ["parent", "sibling"],
            "index",
            "object",
          ],
          pathGroups: [
            { pattern: "react", group: "builtin", position: "before" },
            { pattern: "next", group: "builtin", position: "before" },
            { pattern: "next/**", group: "builtin", position: "before" },
            { pattern: "@/**", group: "internal", position: "before" },
            { pattern: "**/styles", group: "object", position: "after" },
          ],
          pathGroupsExcludedImportTypes: ["builtin"],
          "newlines-between": "always",
          alphabetize: { order: "asc", caseInsensitive: true },
        },
      ],
      "import/newline-after-import": ["error", { count: 1 }],

      // Opinionated
      "@typescript-eslint/naming-convention": [
        "error",
        {
          selector: "variable",
          types: ["boolean"],
          format: ["camelCase", "UPPER_CASE"],
          custom: {
            regex:
              "^(?:is|has|should|can|did|will|are)[A-Z][a-zA-Z0-9]*$|^(?:IS|HAS|SHOULD|CAN|DID|WILL|ARE)_[A-Z0-9_]*$",
            match: true,
          },
        },
        {
          selector: "parameter",
          types: ["boolean"],
          format: ["camelCase"],
          custom: {
            regex: "^(?:is|has|should|can|did|will|are)[A-Z][a-zA-Z0-9]*$",
            match: true,
          },
        },
      ],
      "id-length": [
        "warn",
        {
          min: 2,
          exceptions: ["_", "i", "j", "t", "m", "p", "r", "x", "y", "z"],
        },
      ],
      "padding-line-between-statements": [
        "error",
        { blankLine: "always", prev: "*", next: "return" },
      ],
    },
  },

  // Components: keep them small and focused.
  {
    files: ["**/components/**/*.tsx", "**/components/**/*.jsx"],
    rules: {
      "max-lines": [
        "warn",
        { max: 150, skipBlankLines: true, skipComments: true },
      ],
    },
  },

  // shadcn/ui primitives follow upstream conventions (e.g. the `asChild` prop),
  // which clash with our boolean naming rule and length budget.
  {
    files: ["src/components/ui/**/*.{ts,tsx}"],
    rules: {
      "@typescript-eslint/naming-convention": "off",
      "no-use-before-define": "off",
      "max-lines": "off",
    },
  },

  // E2E specs run under Playwright and don't follow app conventions.
  {
    ...playwright.configs["flat/recommended"],
    files: ["e2e/**/*.ts"],
    rules: {
      ...playwright.configs["flat/recommended"].rules,
      "no-console": "off",
      "id-length": "off",
      "@typescript-eslint/naming-convention": "off",
      "import/order": "off",
      "no-restricted-imports": "off",
    },
  },

  // Config files that shouldn't be type-checked/linted as app code.
  globalIgnores([".prettierrc.js", "generators/templates/**"]),
]);

export default eslintConfig;
