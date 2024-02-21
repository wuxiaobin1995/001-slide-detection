/*
 * @Author      : Mr.bin
 * @Date        : 2022-10-15 17:00:42
 * @LastEditTime: 2024-02-21 11:05:22
 * @Description : ESLint
 */
module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ['plugin:vue/essential', '@vue/standard'],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'space-before-function-paren': 'off', // 取消函数名后必须加空格的规定
    'prefer-promise-reject-errors': 'off', // 取消reject时必须new Error的规定
    quotes: 'off',
    indent: ['off', 2] // 关闭与缩进有关的检查
  },
  /* 允许哪些未定义变量作为全局使用 */
  globals: {
    __static: true // __static确保打包后的资源能够被找到，路径问题（它指向public目录）
  }
}
