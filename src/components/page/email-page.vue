<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <div class="imgBox">
                <img src="@/assets/acm.png" alt="" width="100%">
            </div>
            <div class="page-title">
                <b>激活账号</b>
            </div>
            <el-divider><i class="el-icon-message"></i></el-divider>
            <div class="form-box">
                <el-form :model="FormData" :rules="rules" ref="FormData" class="demo-ruleForm">
                    <el-form-item prop="email">
                        <el-input
                                v-model="FormData.email"
                                placeholder="邮箱"
                                disabled
                                prefix-icon="el-icon-message"
                                style="width: 208px;font-size: 13px">
                        </el-input>
                        <el-button style="float: right;width: 70px" @click="sendEmail" :disabled="this.countDown !== 0">{{ this.countDown===0?'发送':this.countDown }}</el-button>
                    </el-form-item>
                    <el-form-item prop="code">
                        <el-input type="code"
                                  v-model="FormData.code"
                                  placeholder="验证码"
                                  prefix-icon="el-icon-mouse"
                                  @keyup.enter.native="submitForm('FormData')">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="submitBox">
                            <el-button class="submitButton" type="primary" @click="submitForm('FormData')">激活账号</el-button>
                            <el-link type="info" :underline="false" style="width: 100%; text-align: center; font-size: 10px" @click="hasNotMail">&nbsp;不知道学生邮箱密码?</el-link>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'email-page',
  data () {
    return {
      uuid: '',
      countDown: 0,
      FormData: {
        email: '',
        code: ''
      },
      rules: {
        email: [{ required: true, message: '请输入邮箱地址!', trigger: 'blur' }],
        code: [{ required: true, message: '请输入验证码!', trigger: 'blur' }]
      }
    }
  },
  methods: {
    permissionCheck () {
      if (this.$store.state.userIsUpdated) {
        if (this.$store.state.user.permission !== 0) {
          this.$router.replace('/index')
        } else {
          this.$message.warning('要使用系统必须先激活账号')
          this.FormData.email = this.$store.state.user.username + '@stu.zucc.edu.cn'
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    },
    buttonCountDown () {
      if (this.countDown === 0) return
      this.countDown -= 1
      setTimeout(() => {
        this.buttonCountDown()
      }, 1000)
    },
    sendEmail () {
      const that = this
      var auth = that.$store.state.auth()

      that.$http.get(that.$store.state.api + '/v1/captcha/mail?mail=' + this.FormData.email, auth)
        .then(data => {
          that.uuid = data.data.data.uuid
          that.countDown = 60
          that.$message.success('发送成功!')
          that.buttonCountDown()
        })
        .catch(function (error) {
          if (error.response) {
            var tmp = error.response.data.msg
            if ((typeof tmp) === 'string') {
              that.$message.error(tmp)
            } else {
              for (const index in tmp) {
                that.$message.error(tmp[index][0])
                break
              }
            }
          }
        })
    },
    emailSure () {
      const that = this
      var auth = that.$store.state.auth()

      that.$http.post(that.$store.state.api + '/v1/captcha/mail/' + this.uuid, {code: that.FormData.code}, auth)
        .then(data => {
          that.$http.post(that.$store.state.api + '/v1/user/activation', {uuid: that.uuid}, auth)
            .then(data => {
              that.$message.success('激活成功')
              that.$store.commit('updateUser', true)
            })
            .catch(function (error) {
              if (error.response) {
                var tmp = error.response.data.msg
                if ((typeof tmp) === 'string') {
                  that.$message.error(tmp)
                } else {
                  for (const index in tmp) {
                    that.$message.error(tmp[index][0])
                    break
                  }
                }
              }
            })
        })
        .catch(function (error) {
          if (error.response) {
            var tmp = error.response.data.msg
            if ((typeof tmp) === 'string') {
              that.$message.error(tmp)
            } else {
              for (const index in tmp) {
                that.$message.error(tmp[index][0])
                break
              }
            }
          }
        })
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.emailSure()
        } else {
          return false
        }
      })
    },
    hasNotMail () {
      this.$alert('需要验证学生邮箱以确认身份<br/>新生学生邮箱的密码请向班主任/学工办老师询问', '学生邮箱', {
        confirmButtonText: '确定',
        dangerouslyUseHTMLString: true
      })
    }
  },
  created () {
    this.permissionCheck()
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
