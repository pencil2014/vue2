import Vue from 'vue'
import Router from 'vue-router'
// import Hello from '@/components/Hello'

Vue.use(Router)

// 定义组件懒加载
const index = resolve => require(['../components/index'], resolve)
const Hello = resolve => require(['../components/Hello'], resolve)

// 导出路由配置
export default new Router({
  mode: 'history',
  linkActiveClass: 'activeRouter',
  routes: [
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
    	path: '/hello',
    	name: 'hello',
    	component: Hello
    },
    {
    	path:'*', 
    	redirect:'/index'
    }
  ]
})
