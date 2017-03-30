import Vue from 'vue'
import Promise from 'es6-promise/auto'
import App from './App'
import router from './router'
import store from './store'
import axios from "axios"
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

Vue.config.productionTip = false

// 引入mint-ui插件
Vue.use(Mint)

// 判断用是否登录
router.beforeEach((to, from, next) => {
	if (!window.localStorage.token && to.path !=='/login' ) {
		next('/login')
	} else {
		next()
	}
})

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
axios.defaults.baseURL = 'http://192.168.1.201/exsd-web/'  // 'http://120.77.22.9:8080/exsd-web/' 'http://192.168.1.155:80/exsd-web/' 'http://120.25.77.33:8999/exsd-web/'

if (!!window.localStorage.getItem('token')) {
	axios.defaults.headers.common['authorization'] = 'Bearer ' + window.localStorage.getItem('token')
}

// 百度统计代码
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?522501167730fa7b3f5fb59de99411f6";
  var s = document.getElementsByTagName("script")[0]; 
  s.parentNode.insertBefore(hm, s);
})();



// 五分钟内从缓存中取数据
Vue.prototype.$getcache = function getcache (api) {
  let time1 = window.localStorage.getItem(api)
  let time2 = new Date().getTime() - time1
  if (time2 < 1000 * 60 * 5) {
    return true
  } else {
    return false
  }
}