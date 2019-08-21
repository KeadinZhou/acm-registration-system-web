<template>
    <div>
        <div>
            <el-card class="box-card" shadow="hover">
                <div class="page-title">
                    <i class="el-icon-share"></i><b>队伍管理</b>
                </div>
                <el-divider><i class="el-icon-postcard"></i></el-divider>
                <template>
                    <div class="form-box">
                        login yet
                    </div>
                </template>
            </el-card>
        </div>
    </div>
</template>

<script>
import store from '@/vuex/store.js'
export default {
  name: 'team-page',
  store,
  methods: {
    permissionCheck () {
      if (this.$store.state.userIsUpdated) {
        if (this.$store.state.user.permission === -9) {
          this.$router.replace('/error401')
        } else
        if (this.$store.state.user.permission === 0) {
          this.$router.replace('/activate')
        } else {
          // this.getData()
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    }
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
        width: 100%;
        margin: 50px;
    }
</style>
