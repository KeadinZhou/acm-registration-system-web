<template>
    <div>
        <template v-if="!this.$store.state.user.isAdmin">
            <error-page></error-page>
        </template>
        <template v-else>
            <el-card class="box-card" shadow="hover">
                <div class="page-title">
                    <i class="el-icon-edit"></i><b>管理后台</b>
                </div>
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="竞赛配置" name="1">
                        竞赛配置
                    </el-tab-pane>
                    <el-tab-pane label="首页管理" name="2">
                        首页管理
                    </el-tab-pane>
                    <el-tab-pane label="个人管理" name="3">
                        个人管理
                    </el-tab-pane>
                    <el-tab-pane label="队伍管理" name="4">
                        队伍管理
                    </el-tab-pane>
                    <el-tab-pane label="结果导出" name="5">
                        结果导出
                    </el-tab-pane>
                </el-tabs>
            </el-card>
        </template>
    </div>
</template>

<script>
import ErrorPage from '@/components/notfound-page'
export default {
  name: 'admin-page',
  data () {
    return {
      activeName: '1'
    }
  },
  methods: {
    handleClick (tab, event) {
      this.$message(tab.label)
    }
  },
  components: {
    'error-page': ErrorPage
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
</style>
