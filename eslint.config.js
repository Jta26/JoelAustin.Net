import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/recommended";
import tseslint from "typescript-eslint";
import globals from "globals";
import eslintConfigPrettier from "eslint-config-prettier";

/** @type {import('eslint').Linter.Config[]} */
export default tseslint.config(
  // Global ignores (replaces .eslintignore)
  {
    ignores: [
      "dist/**",
      ".output/**",
      ".vinxi/**",
      ".nitro/**",
      "v1/**",
      "node_modules/**",
      "**/*.min.js",
      "eslint.config.js", // config file uses standard semicolons + is not part of app TS project
    ],
  },

  // Base recommended rules for JS
  js.configs.recommended,

  // TypeScript recommended (includes type-aware rules that require tsconfig)
  ...tseslint.configs.recommendedTypeChecked,

  // SolidJS recommended rules (reactivity, best practices, etc.)
  solid,

  // Language / environment setup
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
        // Vite / SolidStart specific globals
        import: "readonly",
      },
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: import.meta.dirname,
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
  },

  // Project-specific rule tweaks for a personal site (pragmatic, not overly strict)
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],
    rules: {
      // TypeScript relaxations that are reasonable for most apps
      "@typescript-eslint/no-explicit-any": "warn",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-non-null-assertion": "warn",

      // General quality-of-life rules
      "prefer-const": "error",
      "no-var": "error",
      eqeqeq: ["error", "smart"],
      "no-console": "off", // personal site — logs are useful in dev

      // SolidJS specific relaxations if needed (plugin already provides good defaults)
      "solid/no-innerhtml": "warn", // allow when you know what you're doing
    },
  },

  // Client entry and specific files often need more flexibility
  {
    files: ["src/entry-client.tsx", "src/StyleXDev.tsx"],
    rules: {
      "@typescript-eslint/no-floating-promises": "off",
    },
  },

  // Disable some noisy type-aware rules on config/build files
  {
    files: ["*.config.{ts,js}", "vite.config.ts"],
    rules: {
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-var-requires": "off",
    },
  },

  // Prettier must be last — turns off all formatting rules that conflict with Prettier
  eslintConfigPrettier,
);
