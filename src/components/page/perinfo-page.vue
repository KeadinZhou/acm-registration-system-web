<template>
    <div>
        <div>
            <el-card class="box-card" shadow="hover">
                <div class="page-title">
                    <i class="el-icon-user-solid"></i><b>个人信息</b>
                </div>
                <el-divider><i class="el-icon-postcard"></i></el-divider>
                <template>
                    <div class="form-box">
                        <el-form :model="FormData" :rules="rules" ref="ruleForm" label-width="100px" label-position="top">
                            <el-form-item label="学号" prop="sid">
                                <el-input v-model="FormData.sid" disabled placeholder="请输入你的学号，例如：31701030" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="FormData.name" placeholder="请输入你的姓名，例如：张三" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-select v-model="FormData.sex" placeholder="请选择你的性别" class="inputItem">
                                    <el-option v-for="item in sexList" :key="item" :label="item" :value="item" :selected="item === FormData.sex"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分院" prop="college">
                                <el-select v-model="FormData.college" placeholder="请选择你的分院" class="inputItem">
                                    <el-option v-for="item in collegeList" :key="item" :label="item" :value="item" :selected="item === FormData.college"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="专业" prop="major">
                                <el-input v-model="FormData.major" placeholder="请输入你的专业全称，例如：计算机科学与技术" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="班级" prop="class">
                                <el-input v-model.number="FormData.class" placeholder="请输入你所在你班级，例如：1701" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model.number="FormData.phone" placeholder="请填写能联系上你的手机号，例如：18888888888" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ" prop="qq">
                                <el-input v-model.number="FormData.qq" placeholder="请填写能联系上你的QQ号，例如：888888888" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="备注" prop="remark">
                                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 10}" v-model="FormData.remark">
                                </el-input>
                            </el-form-item>
                            <el-form-item>
                                <div class="submitBox">
                                    <el-button class="submitButton" type="primary" @click="submitForm('ruleForm')">保存</el-button>
                                </div>
                            </el-form-item>
                        </el-form>
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store.js'
export default {
  name: 'perinfo-page',
  store,
  data () {
    return {
      FormData: {
        sid: '',
        name: '',
        sex: '',
        college: '',
        major: '',
        class: '',
        phone: '',
        qq: '',
        remark: ''
      },
      sexList: ['男', '女'],
      collegeList: ['计算机与计算科学学院', '信息与电气工程学院', '工程学院', '医学院', '外国语学院', '商学院', '传媒与人文学院', '法学院', '创意与艺术设计学院', '新西兰UW学院', '其它'],
      rules: {
        sid: [
          {required: true}
        ],
        name: [
          {required: true, message: '请输入你的姓名', trigger: 'blur'}
        ],
        sex: [
          {required: true, message: '请选你的性别', trigger: 'change'}
        ],
        college: [
          {required: true, message: '请选你的分院', trigger: 'change'}
        ],
        major: [
          {required: true, message: '请输入你的专业全称', trigger: 'blur'}
        ],
        class: [
          {required: true, message: '请输入你的班级', trigger: 'blur'},
          {type: 'number', message: '班级必须为数字，不含专业前缀', trigger: 'change'}
        ],
        phone: [
          {required: true, message: '请填写能联系上你的手机号', trigger: 'blur'},
          {type: 'number', message: '手机号必须为数字', trigger: 'change'}
        ],
        qq: [
          {required: true, message: '请填写能联系上你的QQ号', trigger: 'blur'},
          {type: 'number', message: 'QQ号必须为数字', trigger: 'change'}
        ]
      }
    }
  },
  methods: {
    permissionCheck () {
      if (this.$store.state.userIsUpdated) {
        if (this.$store.state.user.permission === -9) {
          this.$router.replace('/error401')
        } else
        if (this.$store.state.user.permission === 0) {
          this.$router.replace('/activate')
        } else {
          this.getData()
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    },
    getData () {
      const that = this
      var auth = that.$store.state.auth()

      that.FormData.sid = that.$store.state.user.username
      that.$http.get(that.$store.state.api + '/v1/user/' + that.FormData.sid, auth)
        .then(data => {
          const user = data.data.data.user
          console.log(user)
          that.FormData.name = user.nickname ? user.nickname : ''
          that.FormData.sex = user.gender ? (user.gender === 1 ? '男' : '女') : ''
          that.FormData.college = user.college ? user.college : ''
          that.FormData.major = user.profession ? user.profession : ''
          that.FormData.class = user.class_ ? Number(user.class_) : ''
          that.FormData.phone = user.phone ? Number(user.phone) : ''
          that.FormData.qq = user.qq ? Number(user.qq) : ''
          that.FormData.remark = user.remark ? user.remark : ''
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    putData () {
      const that = this
      var auth = that.$store.state.auth()

      that.$http.put(that.$store.state.api + '/v1/user/' + that.FormData.sid, {
        username: that.FormData.sid,
        nickname: that.FormData.name,
        gender: that.FormData.sex === '男' ? 1 : 2,
        college: that.FormData.college,
        profession: that.FormData.major,
        class_: String(that.FormData.class),
        phone: String(that.FormData.phone),
        qq: String(that.FormData.qq),
        remark: that.FormData.remark
      }, auth)
        .then(data => {
          that.$message.success('保存成功！')
          that.$router.push('/team')
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
          this.putData()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  },
  computed: {
  },
  created () {
    this.permissionCheck()
  }
}
</script>

<style scoped>
    .page-title{
        width: 100%;
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: center;
        font-size: 30px;
    }
    .form-box{
        width: auto;
        margin: 50px;
    }
    .inputItem{
        width: 100%;
    }
    .submitBox{
        width: 100%;
        margin-top: 50px;
    }
    .submitButton{
        width: 100%;
        height: auto;
    }
</style>
