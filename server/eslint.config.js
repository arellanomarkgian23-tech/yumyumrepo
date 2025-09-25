import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import { defineConfig } from "eslint/config";

export default defineConfig([
  // ✅ Frontend (React / Browser)
  {
    files: ["src/**/*.{js,jsx,ts,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
    },
  },

  // ✅ Backend (Node.js / Express)
  {
    files: ["server/**/*.js"],
    plugins: { js },
    extends: ["js/recommended"],
    languageOptions: {
      globals: {
        ...globals.node,
        ...globals.es2021,
      },
    },
  },

  // ✅ TypeScript rules
  tseslint.configs.recommended,

  // ✅ React rules
  pluginReact.configs.flat.recommended,
]);
