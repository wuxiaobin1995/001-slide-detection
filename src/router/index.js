/*
 * @Author      : Mr.bin
 * @Date        : 2024-02-07 14:19:10
 * @LastEditTime: 2024-02-22 16:53:14
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

  // 配置
  {
    path: '/configuration',
    name: 'configuration',
    component: () => import('@/views/configuration'),
    meta: ['配置']
  },
  // 中心距调零
  {
    path: '/center-adjustment',
    name: 'center-adjustment',
    component: () => import('@/views/center-adjustment'),
    meta: ['中心距调零']
  },
  // 球号推荐
  {
    path: '/ball-recommendation',
    name: 'ball-recommendation',
    component: () => import('@/views/ball-recommendation'),
    meta: ['球号推荐']
  },
  // 滑块数据测量
  {
    path: '/slide-measurement',
    name: 'slide-measurement',
    component: () => import('@/views/slide-measurement'),
    meta: ['滑块数据测量']
  },
  // 测基准
  {
    path: '/datum',
    name: 'datum',
    component: () => import('@/views/datum'),
    meta: ['测基准']
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
