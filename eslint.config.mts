import globals from "globals";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    plugins: { "react": require("eslint-plugin-react") },
    extends: [
      "standard-with-typescript", 
      "plugin:react/recommended"
    ],
    languageOptions: { globals: globals.browser },
    rules: {
      "react/proptypes": "off",
      "react/react-in-jsx-scope": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/explicit-function-return-type": "off",
      "@typescript-eslint/no-misused-promises": "off"
    }
  },
]);
