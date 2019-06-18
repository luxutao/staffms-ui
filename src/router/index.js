import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/components/404'
import NavHome from '@/components/NavHome'

import Login from '../views/login'
import Authusers from '../views/authusers'
Vue.use(Router)


export default new Router({
  routes: [
    {
      path: "/404",
      name: "",
      component: NotFound,
      hidden: true
    },
    {
      path: "*",
      hidden: true,
      redirect: { path: "/404" }
    },
    {
      path: '/login',
      name: '登录',
      component: Login,
      hidden: true
    },
    {
      path: '/',
      name: '系统设置',
      component: NavHome,
      iconCls: 'fa fa-cogs',
      children: [
        { path: '/authusers', component: Authusers, name: '账号管理' },
      ]
    },
  
  ],
  mode: 'history'
})