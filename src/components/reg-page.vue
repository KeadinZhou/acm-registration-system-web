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
                <el-form :model="FormData" status-icon :rules="rules" ref="ruleForm" class="demo-ruleForm">
                    <el-form-item prop="sid">
                        <el-input v-model="FormData.pass" placeholder="请输入学号" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="pass">
                        <el-input type="password" v-model="FormData.pass" placeholder="请输入密码" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item prop="checkPass">
                        <el-input type="password" v-model="FormData.checkPass" placeholder="请重复密码" autocomplete="off"></el-input>
                    </el-form-item>

                    <el-form-item>
                        <div class="submitBox">
                            <el-button class="submitButton" type="primary" @click="submitForm('ruleForm')">注册</el-button>
                        </div>
                    </el-form-item>
                </el-form>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'reg-page',
  data () {
    return {
      FormData: {

      }
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
        width: 60%;
    }
    .imgBox{
        position: absolute;
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
        font-size: 30px;
    }
    .submitBox{
        width: 100%;
        margin-top: 20px;
    }
    .submitButton{
        width: 100%;
        height: auto;
    }
</style>
