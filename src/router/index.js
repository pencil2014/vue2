import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

// 定义组件懒加载
const Login = resolve => require(['../components/login/login'], resolve)
const Register1 = resolve => require(['../components/register/step1'], resolve)
const Register2 = resolve => require(['../components/register/step2'], resolve)
const Forgot = resolve => require(['../components/forgot/forgot'], resolve)
const Index = resolve => require(['../components/index/index'], resolve)
const Business = resolve => require(['../components/index/Business'], resolve)
const Record = resolve => require(['../components/consume/record'], resolve)
const Message = resolve => require(['../components/forgot/forgot'], resolve)
const Settings = resolve => require(['../components/forgot/forgot'], resolve)



// 导出路由配置
export default new Router({
  mode: 'history',
  linkActiveClass: 'activeRouter',
  routes: [
    {
    	path: '/login',
    	name: 'Login',
    	component: Login
    },
    {
      path: '/register',
      name: 'Register1',
      component: Register1
    },
    {
      path: '/register/:code',
      name: 'Register2',
      component: Register2
    },
    {
      path: '/forgot',
      name: 'Forgot',
      component: Forgot
    },
    {
      path: '/index',
      name: 'Index',
      component: Index
    },
    {
      path: '/business',
      name: 'Business',
      component: Business
    },
    {
      path: '/record',
      name: 'Record',
      component: Record
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/Settings',
      name: 'Settings',
      component: Settings
    },
    {
    	path:'*', 
    	redirect:'/login'
    }
  ]
})
