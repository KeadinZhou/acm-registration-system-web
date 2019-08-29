<template>
    <div>
        <el-table :data="listData" style="width: 100%" :show-header="false">
            <el-table-column label="ID" width="50" align="center">
                <template slot-scope="scope">
                    {{scope.row.id}}
                </template>
            </el-table-column>
            <el-table-column label="Name" align="center">
                <template slot-scope="scope">
                    {{scope.row.name}}
                </template>
            </el-table-column>
            <el-table-column label="Members">
                <template slot-scope="scope">
                    <template v-for="(item, index) of memberData.get(scope.row.id)">
                        <template v-if="index !== 0">、</template>
                        {{item.nickname}}({{item.username}})
                    </template>
                </template>
            </el-table-column>
            <el-table-column label="Op" width="110">
                <template slot-scope="scope">
                    <el-select v-model="scope.row.status" placeholder="请选择" size="small" style="width: 100px" @change="saveTeam(scope.row)">
                        <el-option label="等待审核" :value="1"><team-status :status="1"></team-status></el-option>
                        <el-option label="审核驳回" :value="2" :selected="true"><team-status :status="2"></team-status></el-option>
                        <el-option label="审核通过" :value="3"><team-status :status="3"></team-status></el-option>
                    </el-select>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :page-size="100"
                layout="prev,pager,next"
                :total="this.dataCount"
                :current-page="this.currentPage"
                align="center"
                style="margin-top: 20px"
                @current-change="current_change">
        </el-pagination>
    </div>
</template>

<script>
import TeamStatus from '@/components/pageitem/team-status'
export default {
  name: 'admin-team',
  components: {
    'team-status': TeamStatus
  },
  data () {
    return {
      loading: false,
      dataCount: 0,
      currentPage: 1,
      listData: [],
      memberData: [] // map
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
            that.$message.error(error.response.data.msg)
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
    saveTeam (row) {
      const that = this
      const auth = that.$store.state.auth()
      that.$http.put(that.$store.state.api + '/v1/team/' + row.id, row, auth)
        .then(data => {
          that.$message.success('操作成功!')
          that.getData(1)
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    getData (page) {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      that.$http.get(that.$store.state.api + '/v1/team/?page_size=100&contest_id=' + contest.id + '&page=' + page, auth)
        .then(data => {
          const tmp = data.data.data.res.data
          that.listData = []
          for (var item of tmp) {
            if (item.status === 0) continue
            that.listData.push({
              id: item.id,
              name: item.name,
              status: item.status,
              contest_id: item.contest_id
            })
          }
          that.listData.sort(function (x, y) {
            return x.id - y.id
          })
          that.getMember()
          console.log(that.listData)
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
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

</style>
