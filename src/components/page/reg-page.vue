<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <div class="imgBox">
                <img src="@/assets/acm.png" alt="" width="100%">
            </div>
            <div class="page-title">
                <b>注&nbsp;&nbsp;册</b>
            </div>
            <el-divider><i class="el-icon-postcard"></i></el-divider>
            <div class="form-box">
                <el-form :model="FormData" :rules="rules" ref="FormData" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input
                                v-model="FormData.username"
                                placeholder="账号(学号)"
                                prefix-icon="el-icon-user">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password"
                                  v-model="FormData.password"
                                  placeholder="密码"
                                  prefix-icon="el-icon-key">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password2">
                        <el-input type="password"
                                  v-model="FormData.password2"
                                  placeholder="重复密码"
                                  prefix-icon="el-icon-key">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="captcha">
                        <el-input
                                v-model="FormData.captcha"
                                placeholder="验证码"
                                prefix-icon="el-icon-mouse"
                                @keyup.enter.native="submitForm('FormData')">
                            <img slot="suffix" :src="'data:image/jpg;base64,'+ this.captchaImg" alt="点击刷新验证码" title="点击刷新验证码" height="40px" @click="getCaptcha">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="submitBox">
                            <el-button class="submitButton" type="primary" @click="submitForm('FormData')">注册</el-button>
                            <el-link type="info" :underline="false" style="width: 100%; text-align: center; font-size: 10px" href="#/login">&nbsp;已有账号?</el-link>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'login-page',
  data () {
    var validateUsername = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入你的账号!'))
      } else if (!/^[0-9]{8}$/.test(value)) {
        callback(new Error('请输入合法的用户名(学号)!'))
      } else {
        callback()
      }
    }
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请重复你的密码!'))
      } else if (value !== this.FormData.password) {
        callback(new Error('两次输入密码不一致!'))
      } else {
        callback()
      }
    }
    var validateCaptcha = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入验证码!'))
      }
      const that = this
      that.$http.post(that.$store.state.api + '/v1/captcha/image/' + this.captchaUuid, {code: value})
        .then(data => {
          console.log(data.data)
          callback()
        })
        .catch(function (error) {
          if (error.response) {
            callback(new Error('验证码错误!'))
          }
        })
    }
    return {
      captchaImg: '',
      captchaUuid: '',
      FormData: {
        username: '',
        password: '',
        password2: '',
        captcha: ''
      },
      rules: {
        username: [{ validator: validateUsername, trigger: 'blur' }],
        password: [{ required: true, message: '请输入你的密码!', trigger: 'blur' }],
        password2: [{ validator: validatePass, trigger: 'blur' }],
        captcha: [{ validator: validateCaptcha, trigger: 'blur' }]
      }
    }
  },
  methods: {
    regSure (regData) {
      const that = this
      that.$http.post(that.$store.state.api + '/v1/user/', {
        username: regData.username,
        password: regData.password,
        nickname: regData.username,
        uuid: this.captchaUuid
      })
        .then(data => {
          that.$message.success('注册成功!')
          that.$http.post(that.$store.state.api + '/v1/token', {
            username: regData.username,
            password: regData.password
          })
            .then(data => {
              that.$store.commit('updateToken', data.data.data.token)
              that.$store.commit('updateUser', true)
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
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.regSure(this.FormData)
        } else {
          return false
        }
      })
    },
    getCaptcha () {
      const that = this
      that.FormData.captcha = ''
      that.$http.get(that.$store.state.api + '/v1/captcha/image')
        .then(data => {
          that.captchaImg = data.data.data.image
          that.captchaUuid = data.data.data.uuid
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    }
  },
  created () {
    this.getCaptcha()
  }
}
</script>

<style scoped>
    .box-card{
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%,-50%);
        width: 400px;
    }
    .imgBox{
        position: absolute;
        margin-top: 10px;
        left: 50%;
        transform: translate(-50%,0);
    }
    .form-box{
        width: 80%;
        float: left;
        transform: translate(12%,0);
    }
    .page-title{
        width: 100%;
        margin-top: 150px;
        margin-bottom: 20px;
        text-align: center;
        font-size: 25px;
    }
    .submitBox{
        width: 100%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .submitButton{
        width: 100%;
        height: auto;
    }
</style>
