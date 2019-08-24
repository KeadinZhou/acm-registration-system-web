<template>
    <div>
        <el-menu :default-active="this.$route.path" class="page-nav" style="position: fixed; width: 100%;z-index:1000" mode="horizontal" router>
            <el-menu-item index="/about">
                <img src="@/assets/acm1-1.png" alt="logo" height="60px" width="60px">
            </el-menu-item>
            <el-menu-item index="/index" class="nav-item" route="/index">竞赛首页</el-menu-item>
            <el-menu-item index="/list" class="nav-item" route="/list">报名列表</el-menu-item>
            <template v-if="this.$store.state.user.permission !== -9">
                <el-menu-item index="/perinfo" class="nav-item" route="/perinfo">个人信息</el-menu-item>
                <el-menu-item index="/team" class="nav-item" route="/team">队伍管理</el-menu-item>
            </template>
            <template v-if="this.$store.state.user.permission === -1">
                <el-menu-item index="/admin" class="nav-item" route="/admin">管理后台</el-menu-item>
            </template>

            <el-dropdown @command="handleCommand" class="page-nav-right-menu">
                <span class="el-dropdown-link">
                    <i class="el-icon-user el-icon--right"></i>
                    {{ this.$store.state.user.username }}
                    <i class="el-icon-arrow-down el-icon--right"></i>
                </span>
                <el-dropdown-menu slot="dropdown">
                    <template v-if="this.$store.state.user.permission !== -9">
                        <el-dropdown-item command="setting">账户设置</el-dropdown-item>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </template>
                    <template v-else>
                        <el-dropdown-item command="login">&nbsp;&nbsp;登录&nbsp;&nbsp;</el-dropdown-item>
                        <el-dropdown-item command="register">&nbsp;&nbsp;注册&nbsp;&nbsp;</el-dropdown-item>
                    </template>
                </el-dropdown-menu>
            </el-dropdown>
        </el-menu>
        <div style="height: 60px"></div>
    </div>

</template>

<script>
import store from '@/vuex/store.js'
export default {
  name: 'page-nav',
  data () {
    return {
    }
  },
  store,
  methods: {
    handleCommand (command) {
      if (command === 'register') {
        this.$router.push('/register')
      }
      if (command === 'login') {
        this.$router.push('/login')
      }
      if (command === 'logout') {
        this.$store.commit('deleteToken')
      }
    }
  }
}
</script>

<style scoped>
    .nav-item{
        font-size: 16px;
    }
    .page-nav-right-menu{
        float: right;
        margin-right: 60px;
        height: 60px;
        line-height: 60px;
        outline:none;
    }
    .el-dropdown-link {
        cursor: pointer;
        color: #409EFF;
    }
    .el-icon-arrow-down {
        font-size: 12px;
    }
</style>
