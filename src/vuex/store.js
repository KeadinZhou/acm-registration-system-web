import Vue from 'vue'
import Vuex from 'vuex'
import md5 from 'js-md5'

Vue.use(Vuex)

const api = 'http://acm-api.newitd.com'

const USER_NULL = {
  username: '登录/注册',
  nickname: '登录/注册',
  permission: -9
}

var state = {
  page: null,
  api: api,
  token: localStorage.getItem('acmToken'),
  nowTime: function () {
    return Math.round(new Date().getTime() / 1000)
  },
  auth: function () {
    var time = this.nowTime()
    return {
      headers: {
        'Timestamp': time
      },
      auth: {
        username: this.token,
        password: md5(this.token + time)
      }
    }
  },
  user: USER_NULL,
  userIsUpdated: false,
  contest: {
    id: 1000,
    title: '浙江大学城市学院2019新生选拔赛',
    regBeginTime: '2019-07-10 12:00',
    regEndTime: '2019-07-30 12:00',
    teamMode: false
  }
}

var mutations = {
  savePage (state, page) {
    state.page = page
  },
  updateUser (state, isLogin) {
    if (!localStorage.getItem('acmToken')) {
      state.userIsUpdated = true
      return
    }
    const that = state.page
    var auth = state.auth()

    that.$http.put(that.$store.state.api + '/v1/token', {}, auth)
      .then(data => {
        console.log(data.data.data.token)
        that.$store.commit('updateToken', data.data.data.token)
        auth = state.auth()
        that.$http.get(that.$store.state.api + '/v1/token', auth)
          .then(data => {
            console.log(data.data.data.user)
            state.user = data.data.data.user
            state.userIsUpdated = true
            if (isLogin) {
              that.$router.push('/index')
            }
          })
          .catch(function (error) {
            if (error.response) {
              that.$message.error(error.response.data.msg)
            }
          })
      })
      .catch(function (error) {
        if (error.response) {
          that.$message.error(error.response.data.msg)
        }
      })
  },
  updateToken (state, token) {
    state.token = token
    localStorage.setItem('acmToken', token)
  },
  deleteToken (state) {
    const that = state.page
    var auth = state.auth()

    that.$http.delete(that.$store.state.api + '/v1/token', auth)
      .then(data => {
        state.user = USER_NULL
        state.userIsUpdated = false
        localStorage.removeItem('acmToken')
        that.$message.success('登出成功')
        that.$router.push('/index')
        that.$store.commit('updateUser')
      })
      .catch(function (error) {
        if (error.response) {
          that.$message.error(error.response.data.msg)
        }
      })
  }
}

export default new Vuex.Store({
  state,
  mutations
})
