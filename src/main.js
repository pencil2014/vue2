import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import Promise from 'es6-promise/auto'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App)
})

 // 挂载全局bus
 Vue.prototype.$bus = new Vue()  // this.$bus调用