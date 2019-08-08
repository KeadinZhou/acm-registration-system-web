<template>
    <div>
        <div>
            <el-card class="box-card" shadow="hover">
                <div class="page-title">
                    <i class="el-icon-share"></i><b>队伍管理</b>
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
  store
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
