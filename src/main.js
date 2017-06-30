import Vue from 'vue'
import Promise from 'es6-promise/auto'
import App from './App'
import router from './router'
import axios from "axios"
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'
import VueTouch from 'vue-touch'

Vue.config.productionTip = false

// 引入mint-ui插件
Vue.use(Mint)

// 引入vueTouch
Vue.use(VueTouch, {name: 'v-touch'})

// 判断用是否登录
// router.beforeEach((to, from, next) => {
// 	if (!window.localStorage.getItem('id') && to.path !=='/login') {
// 		next('/login')
// 	} else {
// 		next()
// 	}
// })

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})

// 配置全局ajax请求域名
axios.defaults.baseURL = 'http://119.23.146.95:8081/exsd-operation-web/'  // 'http://192.168.1.201:8080/exsd-operation-web/' 'http://120.25.77.33:8080/exsd-operation-web/' 'http://119.23.146.95:8081/exsd-operation-web/'