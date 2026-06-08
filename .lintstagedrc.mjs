const config = {
  "*.{ts,tsx,js,jsx,mjs,cjs}": ["eslint --fix"],
  "*.{json,md,yml,yaml,css}": ["prettier --write"],
};

export default config;
