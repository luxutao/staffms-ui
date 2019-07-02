import Vue from 'vue'
import Router from 'vue-router'

import NotFound from '@/components/404'
import NavHome from '@/components/NavHome'

import Login from '../views/login'
import Registration from '../views/registration'
import Authusers from '../views/authusers'
import Companys from '../views/companys'
import Jobs from '../views/jobs'
import Department from '../views/departments'
import Staff from '../views/staffs'
import Staffdis from '../views/staffsdis'
import Staffdetail from '../views/staffdetail'
import Homepage from '../views/homepage'

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
      path: '/registration',
      name: '入职登记表',
      component: Registration,
      hidden: true
    },
    {
      path: '/',
      name: '',
      component: NavHome,
      iconCls: 'fa fa-home',
      leaf: true,
      children: [
        { path: '/homepage', component: Homepage, name: '首页'}
      ]
    },
    {
      path: '/',
      name: '员工管理',
      component: NavHome,
      iconCls: 'fa fa-users',
      children: [
        { path: '/staffs', component: Staff, name: '员工管理' },
        { path: '/staffsdis', component: Staffdis, name: '员工分布' },
        { path: '/staffsdetail', component: Staffdetail, name: '员工详情', hidden: true },
      ]
    },
    {
      path: '/',
      name: '部门管理',
      component: NavHome,
      iconCls: 'fa fa-modx',
      children: [
        { path: '/departs', component: Department, name: '部门管理' },
      ]
    },
    {
      path: '/',
      name: '模块设置',
      component: NavHome,
      iconCls: 'fa fa-coffee',
      children: [
        { path: '/companys', component: Companys, name: '公司管理' },
        { path: '/jobs', component: Jobs, name: '职位管理' },
      ]
    },
    {
      path: '/',
      name: '系统设置',
      component: NavHome,
      iconCls: 'fa fa-wrench',
      children: [
        { path: '/authusers', component: Authusers, name: '账号管理' },
      ]
    },
  
  ],
  mode: 'history'
})