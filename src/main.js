// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store.js'
import axios from 'axios'
import App from './App'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
axios.defaults.withCredentials = true
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {App},
  template: '<App/>',
  created () {
    store.commit('savePage', this)
    store.commit('updateUser', false)
    document.title = this.$route.meta.title + ' - ' + store.state.contest.title
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + store.state.contest.title
  }
  next()
})
