<template>
    <div>
        <div>
            <el-card class="box-card" shadow="hover">
                <div class="page-title">
                    <i class="el-icon-user-solid"></i><b>个人信息</b>
                </div>
                <el-divider><i class="el-icon-postcard"></i></el-divider>
                <template v-if="!this.$store.state.user.isLogin">
                    <el-alert
                            title="没有权限"
                            type="error"
                            description="想要访问该页面请先登录"
                            show-icon
                            :closable="false"
                            effect="dark">
                    </el-alert>
                </template>
                <template v-else>
                    <div class="form-box">
                        <el-form :model="FormDate" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" label-position="top">
                            <el-form-item label="学号" prop="sid">
                                <el-input v-model="this.$store.state.user.username" disabled placeholder="请输入你的学号，例如：31701030" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="姓名" prop="name">
                                <el-input v-model="FormDate.name" placeholder="请输入你的姓名，例如：张三" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="性别" prop="sex">
                                <el-select v-model="FormDate.sex" placeholder="请选择你的性别" class="inputItem">
                                    <el-option label="男" value="男"></el-option>
                                    <el-option label="女" value="女"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="分院" prop="college">
                                <el-select v-model="FormDate.college" placeholder="请选择你的分院" class="inputItem">
                                    <el-option label="计算机与计算科学学院" value="计算机与计算科学学院"></el-option>
                                    <el-option label="信息与电气工程学院" value="信息与电气工程学院"></el-option>
                                    <el-option label="工程学院" value="工程学院"></el-option>
                                    <el-option label="医学院" value="医学院"></el-option>
                                    <el-option label="外国语学院" value="外国语学院"></el-option>
                                    <el-option label="商学院" value="商学院"></el-option>
                                    <el-option label="传媒与人文学院" value="传媒与人文学院"></el-option>
                                    <el-option label="法学院" value="法学院"></el-option>
                                    <el-option label="创意与艺术设计学院" value="创意与艺术设计学院"></el-option>
                                    <el-option label="新西兰UW学院" value="新西兰UW学院"></el-option>
                                    <el-option label="其它" value="其它"></el-option>
                                </el-select>
                            </el-form-item>
                            <el-form-item label="专业" prop="major">
                                <el-input v-model="FormDate.major" placeholder="请输入你的专业全称，例如：计算机科学与技术" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="班级" prop="class">
                                <el-input v-model="FormDate.class" placeholder="请输入你所在你班级，例如：1701" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="联系电话" prop="phone">
                                <el-input v-model="FormDate.phone" placeholder="请填写能联系上你的手机号，例如：18888888888" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="QQ" prop="qq">
                                <el-input v-model="FormDate.qq" placeholder="请填写能联系上你的QQ号，例如：888888888" class="inputItem"></el-input>
                            </el-form-item>
                            <el-form-item label="校园卡" prop="idcard">
                                <el-alert title="请将校园卡正面拍照后上传，需保证校园卡正面信息清晰可见，否则可能导致审核不通过" type="info" center show-icon :closable="false"></el-alert>
                                <br>
                                <el-upload
                                        class="upload-demo"
                                        action="#"
                                        auto-submit
                                        :on-remove="handleRemove"
                                        :multiple="false"
                                        :with-credentials="true"
                                        :limit="1"
                                        accept="image/*">
                                    <el-button size="small" type="primary">点击上传</el-button>
                                </el-upload>
                                <el-input v-model="FormDate.idcard" class="inputItem idcardInput"></el-input>
                                <img :src="this.imgUrl" alt="">
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
      FormDate: {
        sid: this.$store.state.user.username,
        name: '',
        sex: '',
        college: '',
        major: '',
        class: '',
        phone: '',
        qq: '',
        idcard: 'A'
      },
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
        ],
        idcard: [
          {required: true, message: '请上传校园卡照片', trigger: 'blur'}
        ]
      }
    }
  },
  methods: {
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    handleRemove () {
    }
  },
  computed: {
    imgUrl: function () {
      return this.FormDate.idcard ? '' + this.FormDate.idcard : '/assets/acm-man-cut.png'
    }
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
    .idcardInput{
        display: none;
    }
</style>
