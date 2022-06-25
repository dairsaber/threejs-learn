module.exports = {
  // extends: ["stylelint-config-standard"],
  plugins: ["stylelint-less"],
  rules: {
    "at-rule-no-unknown": [
      true,
      {
        ignoreAtRules: [
          "tailwind",
          "apply",
          "variants",
          "responsive",
          "screen",
        ],
      },
    ],
    "declaration-block-trailing-semicolon": null,
    "no-descending-specificity": null,
    "no-invalid-position-at-import-rule": null,
    "no-invalid-double-slash-comments": null,

    "color-no-invalid-hex": true,
    "less/color-no-invalid-hex": true,
  },
}
