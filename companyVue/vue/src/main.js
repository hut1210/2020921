
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'babel-polyfill'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import api from './api/index.js'
import utils from './utils'
import store from './store'
import less from 'less'
import echarts from 'echarts'
Vue.use(less)
Vue.config.productionTip = false
import rootResize from "./components/rootResize.js"
// 将公共方法绑定到全局
Vue.prototype.$utils = utils
// 将API方法绑定到全局
Vue.prototype.$api = api
router.beforeEach((to, from, next) => {
  if (localStorage.getItem('token')) {
    next();
  } else {
    if (to.path == "/login") {
      next();
    } else {
      next("/login");
    }
  }
})
// 将ElementUI绑定到全局
Vue.use(
  ElementUI,
  {
    size: 'small',
    zIndex: 3000
  }
)
//将echarts绑定到全局
Vue.prototype.$echarts = echarts
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
