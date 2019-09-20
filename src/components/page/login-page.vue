<template>
    <div>
<!--        <el-button @click="debug()"></el-button>-->
<!--        <img :src="'data:image/jpg;base64,'+ this.captcha" alt="">-->
        <el-card class="box-card" shadow="hover">
            <div class="imgBox">
                <img src="@/assets/acm.png" alt="" width="100%">
            </div>
            <div class="page-title">
                <b>登&nbsp;&nbsp;录</b>
            </div>
            <el-divider><i class="el-icon-postcard"></i></el-divider>
            <div class="form-box">
                <el-form :model="FormData" status-icon :rules="rules" ref="FormData" class="demo-ruleForm">
                    <el-form-item prop="username">
                        <el-input
                                v-model="FormData.username"
                                placeholder="账号"
                                prefix-icon="el-icon-user">
                        </el-input>
                    </el-form-item>
                    <el-form-item prop="password">
                        <el-input type="password"
                                  v-model="FormData.password"
                                  placeholder="密码"
                                  prefix-icon="el-icon-key"
                                  @keyup.enter.native="submitForm('FormData')">
                        </el-input>
                    </el-form-item>
                    <el-form-item>
                        <div class="submitBox">
                            <el-button class="submitButton" type="primary" @click="submitForm('FormData')">登录</el-button>
                            <el-link type="info" :underline="false" style="width: 100%; text-align: center; font-size: 10px" @click="forgetPwd">&nbsp;忘记密码?</el-link>
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
    return {
      captcha: '',
      FormData: {
        username: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请输入你的账号!', trigger: 'blur' }],
        password: [{ required: true, message: '请输入你的密码!', trigger: 'blur' }]
      }
    }
  },
  methods: {
    login (username, password) {
      const that = this
      that.$http.post(that.$store.state.api + '/v1/token', {
        username: username,
        password: password
      })
        .then(data => {
          that.$store.commit('updateToken', data.data.data.token)
          that.$store.commit('updateUser', true)
          that.$message.success('登录成功')
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
