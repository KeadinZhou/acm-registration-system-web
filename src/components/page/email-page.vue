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
                        <el-button style="float: right" @click="sendEmail">发送</el-button>
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
                            <el-link type="info" :underline="false" style="width: 100%; text-align: center; font-size: 10px" @click="forgetPwd">&nbsp;不知道学生邮箱密码?</el-link>
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
        if (this.$store.state.user.permission !== 0) { // temp
          this.$router.replace('/index')
        } else {
          this.FormData.email = this.$store.state.user.username + '@stu.zucc.edu.cn'
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    },
    sendEmail () {
      const that = this
      var auth = that.$store.state.auth()

      that.$http.get(that.$store.state.api + '/v1/captcha/mail?mail=' + this.FormData.email, auth)
        .then(data => {
          console.log(data.data)
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
          this.login(this.FormData.username, this.FormData.password)
        } else {
          return false
        }
      })
    },
    forgetPwd () {
      this.$alert('请使用本人的学生邮箱向管理员发送邮件以找回密码 <br/> 管理员邮箱: <b>31701030@stu.zucc.edu.cn<b/>', '找回密码', {
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
