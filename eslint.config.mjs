import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // Ignore patterns
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "dist/**",
      ".pnpm-store/**",
      "*.config.js",
      "*.config.mjs",
      "*.config.ts",
      "postcss.config.mjs",
      "tailwind.config.js",
      ".env*",
      "*.log",
      ".DS_Store",
      "next-env.d.ts",
      "*.tsbuildinfo",
    ],
  },

  // Next.js recommended configuration with TypeScript support
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Custom rules
  {
    rules: {
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          "argsIgnorePattern": "^_",
          "varsIgnorePattern": "^_"
        }
      ],
      "@next/next/no-img-element": "warn",
      "react-hooks/exhaustive-deps": "warn",
      "prefer-const": "warn",
      // "no-console": "error",
      // Reglas para punto y coma y comillas
      "semi": ["error", "never"],
      "quotes": ["error", "single", { "avoidEscape": true }]
    }
  },
];

export default eslintConfig;
