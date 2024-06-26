/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-04-12 16:21:32
 * @Description : 路由
 */
import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  /*
   * 前面加"/"表示绝对路径，不加"/"表示相对路径
   * 一般嵌套路由中的子路由不需要加"/"，它会在父路由后自动加上"/子路由"
   * 比如父 "/father"，子 "child"，要想访问子路由，跳转链接需要写成 "/father/child"
   */

  // 首页
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/home'),
    meta: ['首页']
  },

  // 开发者
  {
    path: '/set-developer',
    name: 'set-developer',
    component: () => import('@/views/set/set-developer'),
    meta: ['开发者']
  },

  // 参数配置
  {
    path: '/set-parameter',
    name: 'set-parameter',
    component: () => import('@/views/set/set-parameter'),
    meta: ['参数配置']
  },

  // 原始数据显示（用于求a、b、c、d）（也用于扯皮时保留证据）
  {
    path: '/set-rawData',
    name: 'set-rawData',
    component: () => import('@/views/set/set-rawData'),
    meta: ['原始数据显示']
  },

  // 设置4组abcd常数
  {
    path: '/set-abcd',
    name: 'set-abcd',
    component: () => import('@/views/set/set-abcd'),
    meta: ['设置abcd常数']
  },

  {
    path: '/refresh',
    name: 'refresh',
    component: () => import('@/views/refresh')
  },

  {
    path: '*',
    redirect: '/'
  }
]

const router = new VueRouter({
  routes,
  /* 自定义路由切换时页面如何滚动 */
  scrollBehavior(to, from, savedPosition) {
    return { x: 0, y: 0 } // 回到顶部
  }
})

export default router
