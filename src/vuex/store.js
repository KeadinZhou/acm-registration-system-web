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

const CONTEST_NULL = {
  id: -9,
  limit: 0,
  name: '暂无活动的报名',
  status: 0
}

var state = {
  page: null,
  api: api,
  token: localStorage.getItem('acmToken'),
  nowTime: function () {
    return Math.round(new Date().getTime() / 1000)
  },
  auth: function () {
    if (!localStorage.getItem('acmToken')) return null
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
  contest: CONTEST_NULL
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
  },
  updateContest (state) {
    const that = state.page
    const auth = state.auth()

    that.$http.get(that.$store.state.api + '/v1/contest/?page=1&status=1', auth)
      .then(data => {
        if (data.data.data.res.count === 0) {
          state.contest = CONTEST_NULL
        } else {
          state.contest = data.data.data.res.data[0]
          console.log(state.contest)
        }
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
