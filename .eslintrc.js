module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
      legacyDecorators: true
    }
  },
  env: {
    browser: true,
    commonjs: true,
    es6: true,
    node: true //预定义的全局变量，这里是浏览器环境
  },
  extends: ['taro/react', 'react-app'],
  globals: {
    test: true,
    expect: true,
  }
}
