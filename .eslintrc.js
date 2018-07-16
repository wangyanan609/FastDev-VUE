// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  // 全局变量
  globals: {
    'map_URL': true,
    'serverPush_URL': true,
    'uumsUrl_HOST': true,
    'getToken_GET': true,
    'config': true,
    'ServerPush': true,
    'init': true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'semi': ['error', 'always'],
    // @fixable 一个缩进必须用四个空格替代
    // 'indent': [
    //   'error',
    //   4,
    //   {
    //       SwitchCase: 1,
    //       flatTernaryExpressions: true
    //   },
    // ],
    'no-unused-expressions': 0,
    'quotes': 0,
    'eqeqeq': 0,//0忽略全等;2必须使用全等
    'indent': 0,
    'space-before-function-paren': 0,
    'no-extend-native': 0
  }
}
