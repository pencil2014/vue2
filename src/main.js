import Vue from 'vue'
import Promise from 'es6-promise/auto'
import App from './App'
import router from './router'
import store from './store'
import axios from "axios"
import Mint from 'mint-ui'
import 'mint-ui/lib/style.css'

// import filter from './filters' 

Vue.config.productionTip = false

// 引入mint-ui插件
Vue.use(Mint)

// 判断是否登录
router.beforeEach((to, from, next) => {
  let url = to.path.indexOf('login') > -1 || to.path.indexOf('register') > -1 || to.path.indexOf('forgot') > -1 || to.path.indexOf('pay') > -1
  let token = window.localStorage.getItem('token')
	if (!token && !url ) {
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

// init filter
// Object.keys(filter).forEach(k => Vue.filter(k, filter[k]))


// 挂载全局bus
Vue.prototype.$bus = new Vue()  // this.$bus调用

// 配置全局ajax请求域名
axios.defaults.baseURL = 'https://exsd-test.exgj.com.cn/exsd-web/'  // 'https://exsd-test.exgj.com.cn/exsd-web/' 'http://192.168.1.201:8080/exsd-web/' 'http://120.25.77.33:8999/exsd-web/'

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
  if (time2 < 1000 * 60 * 0) {
    return true
  } else {
    return false
  }
}

// emoji表情判断，this.$emoji调用
Vue.prototype.$emoji =  function(substring) {  
  for ( var i = 0; i < substring.length; i++) {  
    var hs = substring.charCodeAt(i) 
    if (0xd800 <= hs && hs <= 0xdbff) {  
        if (substring.length > 1) {  
            var ls = substring.charCodeAt(i + 1)  
            var uc = ((hs - 0xd800) * 0x400) + (ls - 0xdc00) + 0x10000
            if (0x1d000 <= uc && uc <= 0x1f77f) {  
                return true
            }  
        }  
    } else if (substring.length > 1) {  
        var ls = substring.charCodeAt(i + 1) 
        if (ls == 0x20e3) {  
            return true 
        }  
    } else {  
        if (0x2100 <= hs && hs <= 0x27ff) {  
            return true
        } else if (0x2B05 <= hs && hs <= 0x2b07) {  
            return true 
        } else if (0x2934 <= hs && hs <= 0x2935) {  
            return true 
        } else if (0x3297 <= hs && hs <= 0x3299) {  
            return true 
        } else if (hs == 0xa9 || hs == 0xae || hs == 0x303d || hs == 0x3030  
                || hs == 0x2b55 || hs == 0x2b1c || hs == 0x2b1b  
                || hs == 0x2b50) {  
            return true
        }  
    }  
}  
} 