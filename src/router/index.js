import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

// 定义组件懒加载
const Login = resolve => require(['../components/login/login'], resolve)
const Index = resolve => require(['../components/index/index'], resolve)
const Detail = resolve => require(['../components/index/detail'], resolve)
const Manager = resolve => require(['../components/index/manager'], resolve)
const Rule = resolve => require(['../components/index/rule'], resolve)

const Business = resolve => require(['../components/business/business'], resolve)
const Businfo = resolve => require(['../components/business/businfo'], resolve)
// const Busdetail = resolve => require(['../components/business/detail'], resolve)

const Vip = resolve => require(['../components/vip/vip'], resolve)
const Info = resolve => require(['../components/vip/info'], resolve)

// 导出路由配置
export default new Router({
  mode: 'hash',
  linkActiveClass: 'activeRouter',
  routes: [
    {
    	path: '/login',
    	name: 'Login',
    	component: Login
    },
    {
      path: '/index',
      name: 'Index',
      component: Index,
      meta: { requiresAuth: true }
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/manager',
      name: 'Manager',
      component: Manager
    },
    {
      path: '/rule',
      name: 'Rule',
      component: Rule
    },
    {
      path: '/business',
      name: 'Business',
      component: Business
    },
    {
      path: '/businfo',
      name: 'Businfo',
      component: Businfo
    },
    // {
    //   path: '/busdetail/:id',
    //   name: 'Busdetail',
    //   component: Busdetail
    // },
    {
      path: '/vip',
      name: 'Vip',
      component: Vip
    },
    {
      path: '/info/:userId/:time',
      name: 'Info',
      component: Info
    },
    {
    	path:'*', 
    	redirect:'/login'
    },
    { 
      path: '/', 
      redirect: '/login' 
    }
  ]
})
