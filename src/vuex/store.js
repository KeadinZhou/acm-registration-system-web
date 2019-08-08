import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

var state = {
  user: {
    isLogin: false,
    username: '登录/注册',
    isAdmin: false
  },
  contest: {
    id: 1000,
    title: '浙江大学城市学院2019新生选拔赛',
    regBeginTime: '2019-07-10 12:00',
    regEndTime: '2019-07-30 12:00',
    teamMode: false
  }
}

var mutations = {
  // eslint-disable-next-line
  setuser(state,userdata) {
    state.user = userdata
  }
}

export default new Vuex.Store({
  state,
  mutations
})
