module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended",
  ],
  parser: "vue-eslint-parser",
  parserOptions: {
    parser: {
      // Script parser for `<script>`
      js: "espree",

      // Script parser for `<script lang="ts">`
      ts: "@typescript-eslint/parser",
      // Script parser for vue directives (e.g. `v-if=` or `:attribute=`)
      // and vue interpolations (e.g. `{{variable}}`).
      // If not specified, the parser determined by `<script lang ="...">` is used.
      "<template>": "espree",
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["vue", "@typescript-eslint"],
  rules: {
    indent: ["off", 2, { SwitchCase: 1 }],
    "no-useless-escape": "off",
    "linebreak-style": "off",
    "@typescript-eslint/no-loss-of-precision": "off",
    "@typescript-eslint/no-empty-function": "off",
    quotes: ["error", "double"],
    semi: ["error", "never"],
    "vue/comment-directive": "error",
    "vue/jsx-uses-vars": "error",
    "vue/script-setup-uses-vars": "error",
    "vue/max-attributes-per-line": "off",
    "prettier/prettier": ["error", { endOfLine: "auto" }],
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/ban-ts-ignore": "off",
    "@typescript-eslint/ban-types": "off",
    "@typescript-eslint/no-empty-interface": "off",
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
    "no-unused-vars": [
      "error",
      {
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_",
      },
    ],
  },
}
