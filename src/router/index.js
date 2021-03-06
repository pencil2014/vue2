import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

// 定义组件懒加载
const Login = resolve => require(['../components/login/login'], resolve)
const Register1 = resolve => require(['../components/register/step1'], resolve)
const Register2 = resolve => require(['../components/register/step2'], resolve)
const RegisterRule = resolve => require(['../components/register/agreement'], resolve)
const Forgot = resolve => require(['../components/forgot/forgot'], resolve)

const Index = resolve => require(['../components/index/index'], resolve)
const Business = resolve => require(['../components/index/business'], resolve)
const Record = resolve => require(['../components/consume/record'], resolve)
const Integral = resolve => require(['../components/consume/integral'], resolve)
const Detail = resolve => require(['../components/consume/detail'], resolve)
const MonthDetail = resolve => require(['../components/consume/monthdetail'], resolve)

const Money = resolve => require(['../components/consume/money'], resolve)
const Bank = resolve => require(['../components/consume/bank'], resolve)
const BankList = resolve => require(['../components/consume/banklist'], resolve)
const Addcard = resolve => require(['../components/consume/addcard'], resolve)
const Editcard = resolve => require(['../components/consume/editcard'], resolve)
const Recommend = resolve => require(['../components/consume/recommend'], resolve)
const Upgrade = resolve => require(['../components/consume/upgrade'], resolve)
const Wechat = resolve => require(['../components/consume/wechat'], resolve)
const Bankpay = resolve => require(['../components/consume/bankpay'], resolve)
const Shop1 = resolve => require(['../components/consume/shop1'], resolve)
const Shop2 = resolve => require(['../components/consume/shop2'], resolve)
const ShopRule = resolve => require(['../components/consume/shoprule'], resolve)
const Shop3 = resolve => require(['../components/consume/shop3'], resolve)
const Integral2 = resolve => require(['../components/consume/integraldetail'], resolve)
const UpgradeRule = resolve => require(['../components/consume/upgradeRule'], resolve)


const Declare = resolve => require(['../components/business/declare'], resolve)
const Declare2 = resolve => require(['../components/business/declare2'], resolve)
const Declare3 = resolve => require(['../components/business/declare3'], resolve)
const Declare4 = resolve => require(['../components/business/declare4'], resolve)
const Declare5 = resolve => require(['../components/business/declare5'], resolve)
const Declare6 = resolve => require(['../components/business/declare6'], resolve)

const Batch = resolve => require(['../components/business/batch1'], resolve)
const Batch2 = resolve => require(['../components/business/batch2'], resolve)
const BatchList = resolve => require(['../components/business/batchlist'], resolve)


const Order = resolve => require(['../components/business/order'], resolve)
const Tables = resolve => require(['../components/business/tables'], resolve)
const Detail2 = resolve => require(['../components/business/detail'], resolve)
const Tableinfo = resolve => require(['../components/business/tableinfo'], resolve)

// const Bank1 = resolve => require(['../components/business/bank'], resolve)
// const BankList1 = resolve => require(['../components/business/banklist'], resolve)
// const Addcard1 = resolve => require(['../components/business/addcard'], resolve)
// const Editcard1 = resolve => require(['../components/business/editcard'], resolve)

const School = resolve => require(['../components/school/school'], resolve)
const Word = resolve => require(['../components/school/word'], resolve)
// const School = resolve => require(['../components/school/school'], resolve)
// const Details = resolve => require(['../components/school/details'], resolve)
// const Details2 = resolve => require(['../components/school/details2'], resolve)
// const News = resolve => require(['../components/school/news'], resolve)

const Partner = resolve => require(['../components/partner/shop'], resolve)
const Shopinfo = resolve => require(['../components/partner/info'], resolve)
const Category = resolve => require(['../components/partner/category'], resolve)
const Classify = resolve => require(['../components/partner/classify'], resolve)
const Search = resolve => require(['../components/partner/search'], resolve)
const City = resolve => require(['../components/partner/city'], resolve)

const Message = resolve => require(['../components/message/message'], resolve)
const Message2 = resolve => require(['../components/message/detail'], resolve)

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
const Realname2 = resolve => require(['../components/realname/detail'], resolve)
const Realname3 = resolve => require(['../components/realname/realname2'], resolve)
const User = resolve => require(['../components/user/user'], resolve)
const Notice1 = resolve => require(['../components/notice/step1'], resolve)
const Notice2 = resolve => require(['../components/notice/step2'], resolve)
const Twopassword = resolve => require(['../components/twopassword/twopassword'], resolve)
const QRcode2 = resolve => require(['../components/user/qrcode2'], resolve)
const Businessinfo = resolve => require(['../components/user/businessinfo'], resolve)
const Pay = resolve => require(['../components/pay/step1'], resolve)
const Pay2 = resolve => require(['../components/pay/step2'], resolve)
const Pay3 = resolve => require(['../components/pay/step3'], resolve)

const Display1 = resolve => require(['../components/user/display1'], resolve)
const Display2 = resolve => require(['../components/user/display2'], resolve)
const Display3 = resolve => require(['../components/user/display3'], resolve)
const Display4 = resolve => require(['../components/user/display4'], resolve)
const Display5 = resolve => require(['../components/user/display5'], resolve)
const Display6 = resolve => require(['../components/user/display6'], resolve)

const Apply1 = resolve => require(['../components/business/apply1'], resolve)
const Apply2 = resolve => require(['../components/business/apply2'], resolve)
const Apply3 = resolve => require(['../components/business/apply3'], resolve)

const Fillform1 = resolve => require(['../components/business/fillform1'], resolve)
const Fillform2 = resolve => require(['../components/business/fillform2'], resolve)
const Fillform3 = resolve => require(['../components/business/fillform3'], resolve)
const Fillform4 = resolve => require(['../components/business/fillform4'], resolve)
const Fillform5 = resolve => require(['../components/business/fillform5'], resolve)
const Fillform6 = resolve => require(['../components/business/fillform6'], resolve)

const Address = resolve => require(['../components/mall/address'], resolve)
const NewAddress = resolve => require(['../components/mall/newaddress'], resolve)
const OrderList = resolve => require(['../components/mall/orderlist'], resolve)
const Mall = resolve => require(['../components/mall/mall'], resolve)
const Commodity = resolve => require(['../components/mall/commodity'], resolve)

const Buy = resolve => require(['../components/mall/buy'], resolve)
const OrderDetail = resolve => require(['../components/mall/order'], resolve)

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
      path: '/registerrule',
      name: 'RegisterRule',
      component: RegisterRule
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
      path: '/monthdetail',
      name: 'MonthDetail',
      component: MonthDetail
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
    // {
    //   path: '/bank1',
    //   name: 'Bank1',
    //   component: Bank1
    // },
    {
      path: '/banklist',
      name: 'BankList',
      component: BankList
    },
    // {
    //   path: '/banklist1',
    //   name: 'BankList1',
    //   component: BankList1
    // },
    {
      path: '/upgrade',
      name: 'Upgrade',
      component: Upgrade
    },
    {
      path: '/upgraderule',
      name: 'UpgradeRule',
      component: UpgradeRule
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
    // {
    //   path: '/addcard1',
    //   name: 'Addcard1',
    //   component: Addcard1
    // },
    {
      path: '/editcard/:id',
      name: 'Editcard',
      component: Editcard
    },
    // {
    //   path: '/editcard1',
    //   name: 'Editcard1',
    //   component: Editcard1
    // },
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
      path: '/ShopRule',
      name: 'ShopRule',
      component: ShopRule
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
      path: '/batch',
      name: 'Batch',
      component: Batch
    },
    {
      path: '/batchinfo/:id',
      name: 'Batch2',
      component: Batch2
    },
    {
      path: '/batchList',
      name: 'BatchList',
      component: BatchList
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
      path: '/tableinfo/:id',
      name: 'Tableinfo',
      component: Tableinfo
    },
    {
      path: '/detail2',
      name: 'Detail2',
      component: Detail2
    },
    {
      path: '/school',
      name: 'School',
      component: School
    },
    {
      path: '/word/:id',
      name: 'Word',
      component: Word
    },
    // {
    //   path: '/details/:id',
    //   name: 'Details',
    //   component: Details
    // },
    // {
    //   path: '/details2/:id',
    //   name: 'Details2',
    //   component: Details2
    // },
    // {
    //   path: '/news/:id',
    //   name: 'News',
    //   component: News
    // },
    {
      path: '/partner',
      name: 'Partner',
      component: Partner
    },
    {
      path: '/shopinfo/:id',
      name: 'Shopinfo',
      component: Shopinfo
    },
    {
      path: '/category',
      name: 'Category',
      component: Category
    },
    {
      path: '/classify/:id',
      name: 'Classify',
      component: Classify
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/city',
      name: 'City',
      component: City
    },
    {
      path: '/message',
      name: 'Message',
      component: Message
    },
    {
      path: '/messagedetail/:id',
      name: 'Message2',
      component: Message2
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
      path: '/guide/:id',
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
      path: '/realname/detail',
      name: 'Realname2',
      component: Realname2
    },
    {
      path: '/realname/shop',
      name: 'Realname3',
      component: Realname3
    },
    {
      path: '/user',
      name: 'User',
      component: User
    },
    {
      path: '/notice',
      name: 'Notice1',
      component: Notice1
    },
    {
      path: '/notice/:id',
      name: 'Notice2',
      component: Notice2
    },
    {
      path: '/integraldetail',
      name: 'Integral2',
      component: Integral2
    },
    {
      path: '/twopassword',
      name: 'Twopassword',
      component: Twopassword
    },
    {
      path: '/qrcode2',
      name: 'QRcode2',
      component: QRcode2
    },
    {
      path: '/businessinfo',
      name: 'Businessinfo',
      component: Businessinfo
    },
    {
      path: '/pay',
      name: 'Pay',
      component: Pay
    },
    {
      path: '/pay/step2',
      name: 'Pay2',
      component: Pay2
    },
    {
      path: '/pay/step3',
      name: 'Pay3',
      component: Pay3
    },
    {
      path: '/display1',
      name: 'Display1',
      component: Display1
    },
    {
      path: '/display2/:id',
      name: 'Display2',
      component: Display2
    },
    {
      path: '/display3',
      name: 'Display3',
      component: Display3
    },
    {
      path: '/display4',
      name: 'Display4',
      component: Display4
    },
    {
      path: '/display5',
      name: 'Display5',
      component: Display5
    },
    {
      path: '/display6',
      name: 'Display6',
      component: Display6
    },
    {
      path: '/apply',
      name: 'Apply1',
      component: Apply1
    },
    {
      path: '/apply2',
      name: 'Apply2',
      component: Apply2
    },
    {
      path: '/apply3',
      name: 'Apply3',
      component: Apply3
    },
    {
      path: '/fillform/step1',
      name: 'Fillform1',
      component: Fillform1
    },
    {
      path: '/fillform/step2',
      name: 'Fillform2',
      component: Fillform2
    },
    {
      path: '/fillform/step3',
      name: 'Fillform3',
      component: Fillform3
    },
    {
      path: '/fillform/step4',
      name: 'Fillform4',
      component: Fillform4
    },
    {
      path: '/fillform/step5',
      name: 'Fillform5',
      component: Fillform5
    },
    {
      path: '/fillform/step6',
      name: 'Fillform6',
      component: Fillform6
    },
    {
      path: '/address',
      name: 'Address',
      component: Address
    },
    {
      path: '/newaddress',
      name: 'NewAddress',
      component: NewAddress
    },
    {
      path: '/orderlist',
      name: 'OrderList',
      component: OrderList
    },
    {
      path: '/mall',
      name: 'Mall',
      component: Mall
    },
    {
      path: '/commodity/:id',
      name: 'Commodity',
      component: Commodity
    },
    {
      path: '/buy/:id',
      name: 'Buy',
      component: Buy
    },
    {
      path: '/order/:id',
      name: 'OrderDetail',
      component: OrderDetail
    },
    {
      path:'*', 
      redirect:'/index'
    },
    { 
      path: '/', 
      redirect: '/index' 
    }
  ]
})
