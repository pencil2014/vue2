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
const Business = resolve => require(['../components/index/business'], resolve)
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
const Shop1 = resolve => require(['../components/consume/shop1'], resolve)
const Shop2 = resolve => require(['../components/consume/shop2'], resolve)
const Shop3 = resolve => require(['../components/consume/shop3'], resolve)

const Declare = resolve => require(['../components/business/declare'], resolve)
const Declare2 = resolve => require(['../components/business/declare2'], resolve)
const Declare3 = resolve => require(['../components/business/declare3'], resolve)
const Declare4 = resolve => require(['../components/business/declare4'], resolve)
const Declare5 = resolve => require(['../components/business/declare5'], resolve)
const Declare6 = resolve => require(['../components/business/declare6'], resolve)

const Order = resolve => require(['../components/business/order'], resolve)
const Tables = resolve => require(['../components/business/tables'], resolve)
const Detail2 = resolve => require(['../components/business/detail'], resolve)

const Message = resolve => require(['../components/forgot/forgot'], resolve)
const Settings = resolve => require(['../components/settings/settings'], resolve)
const Personal = resolve => require(['../components/personal/personal'], resolve)

const Avatar = resolve => require(['../components/avatar/avatar'], resolve)
const Username = resolve => require(['../components/username/username'], resolve)

const QRcode = resolve => require(['../components/qrcode/qrcode'], resolve)
const ChangePassword = resolve => require(['../components/changepassword/changepassword'], resolve)
const AlterPhone1 = resolve => require(['../components/alterphone/step1'], resolve)
const AlterPhone2 = resolve => require(['../components/alterphone/step2'], resolve)
const Guide1 = resolve => require(['../components/guide/step1'], resolve)
const Guide2 = resolve => require(['../components/guide/step2'], resolve)
const Feedback = resolve => require(['../components/feedback/feedback'], resolve)
const Version = resolve => require(['../components/version/version'], resolve)
const Realname = resolve => require(['../components/realname/realname'], resolve)

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
      path: '/upgrade',
      name: 'Upgrade',
      component: Upgrade
    },
    {
      path: '/recommend',
      name: 'Recommend',
      component: Recommend
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
      path: '/addcard',
      name: 'Addcard',
      component: Addcard
    },
    {
      path: '/shop1',
      name: 'Shop1',
      component: Shop1
    },
    {
      path: '/shop2',
      name: 'Shop2',
      component: Shop2
    },
    {
      path: '/shop3',
      name: 'Shop3',
      component: Shop3
    },
    {
      path: '/declare',
      name: 'Declare',
      component: Declare
    },
    {
      path: '/declare2/:id',
      name: 'Declare2',
      component: Declare2
    },
    {
      path: '/declare3/:id',
      name: 'Declare3',
      component: Declare3
    },
    {
      path: '/declare4/:id',
      name: 'Declare4',
      component: Declare4
    },
    {
      path: '/declare5/:id',
      name: 'Declare5',
      component: Declare5
    },
    {
      path: '/declare6/:id',
      name: 'Declare6',
      component: Declare6
    },
    {
      path: '/order',
      name: 'Order',
      component: Order
    },
    {
      path: '/tables',
      name: 'Tables',
      component: Tables
    },
    {
      path: '/detail2',
      name: 'Detail2',
      component: Detail2
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
      path: '/username',
      name: 'Username',
      component: Username
    },
    {
      path: '/avatar',
      name: 'Avatar',
      component: Avatar
    },
    {
      path: '/qrcode',
      name: 'QRcode',
      component: QRcode
    },
    {
      path: '/changepassword',
      name: 'ChangePassword',
      component: ChangePassword
    },
    {
      path: '/alterphone',
      name: 'AlterPhone1',
      component: AlterPhone1
    },
    {
      path: '/alterphone/step2',
      name: 'AlterPhone2',
      component: AlterPhone2
    },
    {
      path: '/guide',
      name: 'Guide1',
      component: Guide1
    },
    {
      path: '/guide/step2',
      name: 'Guide2',
      component: Guide2
    },
    {
      path: '/feedback',
      name: 'Feedback',
      component: Feedback
    },
    {
      path: '/version',
      name: 'Version',
      component: Version
    },
    {
      path: '/realname',
      name: 'Realname',
      component: Realname
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
