import globals from "globals";
import pluginJs from "@eslint/js";
import { configs as tsConfigs } from "@typescript-eslint/eslint-plugin";
import { parser } from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";

/** @type {import('eslint').Linter.FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: {
      globals: globals.browser,
      parser: parser,
    },
    rules: {},
  },
  pluginJs.configs.recommended,
  tsConfigs.recommended,
  pluginReact.configs.flat.recommended,
];
