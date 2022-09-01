module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ["plugin:vue/vue3-essential", "google", "plugin:prettier/recommended"],
  overrides: [],
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module"
  },
  plugins: ["vue"],
  rules: {
    "vue/multi-word-component-names": 0,
    "vue/no-deprecated-v-on-native-modifier": 0,
    "vue/no-deprecated-slot-attribute": 0,
    "no-unused-vars": 0,
    "require-jsdoc": 0,
    camelcase: 0,
    "prefer-promise-reject-errors": 0,
    "valid-jsdoc": 0
  }
};
