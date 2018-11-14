import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

const routes = [
  {
    path: '/',
    redirect: '/music'
  }, {
    path: '/music',
    component: ()=> import('pages/music'),
    redirect: '/music/playlist',
    children: [
      {
        path: '/music/playlist',
        component: ()=> import('pages/playList/playList'),
        meta: {
          keepAlive: true
        }
      }
    ]
  }
];

export default new Router({
  linkActiveClass: 'active',
  linkExactActiveClass: 'active', // 精确匹配路由；  防止'/' 与 '/music'同时被匹配
  routes
})
