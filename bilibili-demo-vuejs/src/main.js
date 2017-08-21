import Vue from 'vue'
import App from './App'
import router from './router'
import '@/assets/less/style.less'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
import axios from 'axios'

// 解决点击延时问题
const FastClick = require('fastclick')
FastClick.attach(document.body)

Vue.prototype.$http = axios
import store from './store'

Vue.use(MintUI)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
