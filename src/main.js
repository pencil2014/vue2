import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Promise from 'es6-promise/auto'
import axios from "axios"
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

// 引入mint-ui插件
Vue.use(Mint)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

// 挂载全局bus
Vue.prototype.$bus = new Vue()  // this.$bus调用

// 配置全局ajax请求域名
axios.defaults.baseURL = 'http://192.168.1.155:80/exsd-web/' // 'http://120.77.22.9:8080/exsd-web/' 'http://192.168.1.155:80/exsd-web/'
if (!!window.localStorage.getItem('token')) {
	axios.defaults.headers.common['authorization'] = 'Bearer ' + window.localStorage.getItem('token')
}
