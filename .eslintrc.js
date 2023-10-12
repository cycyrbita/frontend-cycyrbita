module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:vue/vue3-essential',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'vue',
  ],
  rules: {
    // сортировка атрибутов
    'vue/attributes-order': 2,
    // количество атрибутов на одной строке
    'vue/max-attributes-per-line': ['error', {}],
    // отступы
    'vue/html-indent': ['error', 'tab', {}],
  },
};
