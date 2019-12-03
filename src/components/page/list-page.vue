<template>
    <div>
        <el-card class="box-card" shadow="hover" v-loading="loading">
            <div class="page-title">
                <i class="el-icon-s-order"></i><b>报名列表</b>
            </div>
            <el-collapse accordion>

                <el-collapse-item v-for="(team,index) in listData" :key="index"  class="collapse-item">
                    <template slot="title">
                        <team-status :status="team.status"></team-status>
                        <el-divider direction="vertical"></el-divider>
                        <b>{{team.name}}</b>
                    </template>
                    <el-table :data="listTableData" style="width: 100%" :show-header="false">
                        <el-table-column label="Item" align="center" width="200">
                            <template slot-scope="scope">
                                {{ scope.row }}
                            </template>
                        </el-table-column>
                        <el-table-column label="Value" align="center">
                            <template slot-scope="scope">
                                <template v-if="scope.row==='比赛名称'">{{$store.state.contest.name}}</template>
                                <template v-else-if="scope.row==='队伍ID'">{{team.id}}</template>
                                <template v-else-if="scope.row==='队伍名称'">{{team.name}}</template>
                                <template v-else-if="scope.row==='队伍状态'"><team-status :status="team.status" :info="true"></team-status></template>
                                <template v-else-if="scope.row==='队伍成员'">
                                    <template v-for="(mem,memIndex) in memberData.get(team.id)">
                                        <template v-if="memIndex!==0">、</template>
                                        {{mem.nickname}}({{mem.username}})
                                    </template>
                                </template>
                                <template v-else>{{'!error'}}</template>
                            </template>
                        </el-table-column>
                    </el-table>
                </el-collapse-item>
            </el-collapse>
            <el-pagination
                    :page-size="20"
                    layout="prev,pager,next"
                    :total="this.dataCount"
                    :current-page="this.currentPage"
                    align="center"
                    style="margin-top: 20px"
                    @current-change="current_change">
            </el-pagination>
        </el-card>
    </div>
</template>

<script>
import TeamStatus from '@/components/pageitem/team-status'
export default {
  name: 'list-page',
  components: {
    'team-status': TeamStatus
  },
  data () {
    return {
      loading: false,
      dataCount: 0,
      currentPage: 1,
      listData: [],
      memberData: [], // map
      listTableData: ['队伍ID', '队伍名称', '队伍成员', '队伍状态']
    }
  },
  methods: {
    permissionCheck () {
      if (this.$store.state.userIsUpdated) {
        if (this.$store.state.user.permission === 0) {
          this.$router.replace('/activate')
        } else {
          this.getData(1)
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    },
    current_change (currentPage) {
      this.getData(currentPage)
    },
    getMemberOfTeam (id) {
      const that = this
      const auth = that.$store.state.auth()
      that.$http.get(that.$store.state.api + '/v1/team_relationship/?team_id=' + id, auth)
        .then(data => {
          const memList = data.data.data.res.data
          var memTmp = []
          for (var tmp of memList) {
            memTmp.push({
              username: tmp.user.username,
              nickname: tmp.user.nickname
            })
          }
          that.memberData.set(id, memTmp)
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
    getMember () {
      const that = this
      that.memberData = new Map()
      for (var team of that.listData) {
        that.getMemberOfTeam(team.id)
      }
    },
    getData (page) {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      if (contest.id === -9) {
        setTimeout(() => {
          that.$store.commit('updateContest')
          this.getData(1)
        }, 500)
        return
      }
      that.$http.get(that.$store.state.api + '/v1/team/?page_size=20&contest_id=' + contest.id + '&page=' + page, auth)
        .then(data => {
          that.dataCount = data.data.data.res.count
          const tmp = data.data.data.res.data
          that.listData = []
          for (var item of tmp) {
            that.listData.push({
              id: item.id,
              name: item.name,
              status: item.status
            })
          }
          that.getMember()
          console.log(that.listData)
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
</style>
