// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import VueRouter from 'vue-router'
import store from './vuex/store.js'
import axios from 'axios'
import MarkdownItVue from 'markdown-it-vue'
import 'markdown-it-vue/dist/markdown-it-vue.css'
import App from './App'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)
Vue.use(MarkdownItVue)
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
    store.commit('updateContest')
    document.title = this.$route.meta.title
  }
})

router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title + ' - ' + store.state.contest.name
  }
  next()
})
