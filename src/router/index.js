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
const Integral = resolve => require(['../components/consume/integral'], resolve)
const Detail = resolve => require(['../components/consume/detail'], resolve)
const Money = resolve => require(['../components/consume/money'], resolve)
const Bank = resolve => require(['../components/consume/bank'], resolve)
const BankList = resolve => require(['../components/consume/banklist'], resolve)
const Addcard = resolve => require(['../components/consume/addcard'], resolve)
const Recommend = resolve => require(['../components/consume/recommend'], resolve)
const Upgrade = resolve => require(['../components/consume/upgrade'], resolve)
const Wechat = resolve => require(['../components/consume/wechat'], resolve)
const Bankpay = resolve => require(['../components/consume/bankpay'], resolve)


const Message = resolve => require(['../components/forgot/forgot'], resolve)
const Settings = resolve => require(['../components/settings/settings'], resolve)
const Personal = resolve => require(['../components/personal/personal'], resolve)

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
      path: '/integral',
      name: 'Integral',
      component: Integral
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },
    {
      path: '/money',
      name: 'Money',
      component: Money
    },
    {
      path: '/bank',
      name: 'Bank',
      component: Bank
    },
    {
      path: '/banklist',
      name: 'BankList',
      component: BankList
    },
    {
      path: '/addcard',
      name: 'Addcard',
      component: Addcard
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
    },
    {
      path: '/upgrade',
      name: 'Upgrade',
      component: Upgrade
    },
    {
      path: '/wechat',
      name: 'Wechat',
      component: Wechat
    },
    {
      path: '/bankpay',
      name: 'Bankpay',
      component: Bankpay
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/settings',
      name: 'Settings',
      component: Settings
    },
    {
      path: '/personal',
      name: 'Personal',
      component: Personal
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
