<template>
    <div v-loading="loading" v-if="isRefresh">

        <el-dialog :visible.sync="userShow" :append-to-body="true" width="600px">
            <el-table :data="userList" style="width: 100%" :show-header="false">
                <el-table-column label="Item" align="center" width="200">
                    <template slot-scope="scope">
                        {{scope.row}}
                    </template>
                </el-table-column>
                <el-table-column label="Value" align="center">
                    <template slot-scope="scope">
                        <template v-if="scope.row==='学号'">{{userShowData.username}}</template>
                        <template v-else-if="scope.row==='姓名'">{{userShowData.nickname}}</template>
                        <template v-else-if="scope.row==='性别'">{{userShowData.gender===1?'男':'女'}}</template>
                        <template v-else-if="scope.row==='分院'">{{userShowData.college}}</template>
                        <template v-else-if="scope.row==='专业'">{{userShowData.profession}}</template>
                        <template v-else-if="scope.row==='班级'">{{userShowData.class_}}</template>
                        <template v-else-if="scope.row==='联系电话'">{{userShowData.phone}}</template>
                        <template v-else-if="scope.row==='QQ'">{{userShowData.qq}}</template>
                        <template v-else-if="scope.row==='备注'"><markdown-it-vue :content="userShowData.remark?userShowData.remark:''"></markdown-it-vue></template>
                        <template v-else>{{'!error'}}</template>
                    </template>
                </el-table-column>
            </el-table>
        </el-dialog>

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
                        <el-button type="text" :key="item.username" style="color: black" @click="showUser(item.username)">{{item.nickname}}({{item.username}})</el-button>
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
        <el-popover placement="top" trigger="click">
            <el-checkbox v-model="showSetting[1]" @change="getData(1)">等待审核</el-checkbox>
            <el-checkbox v-model="showSetting[2]" @change="getData(1)">审核驳回</el-checkbox>
            <el-checkbox v-model="showSetting[3]" @change="getData(1)">审核通过</el-checkbox>
            <el-button slot="reference" style="float: right" icon="el-icon-setting" circle></el-button>
        </el-popover>
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
      isRefresh: true,
      dataCount: 0,
      currentPage: 1,
      listData: [],
      memberData: [], // map
      settingBox: false,
      showSetting: [false, true, false, false],
      userShowData: {},
      userShow: false,
      userList: ['学号', '姓名', '性别', '分院', '专业', '班级', '联系电话', 'QQ', '备注']
    }
  },
  methods: {
    refreshAll () {
      this.isRefresh = false
      this.$nextTick(function () {
        this.isRefresh = true
        this.loading = false
      })
    },
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
    watchToRefresh () {
      if (this.memberData.size === this.listData.length) {
        this.refreshAll()
      } else {
        setTimeout(() => {
          this.watchToRefresh()
        }, 500)
      }
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
      this.watchToRefresh()
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
    getUser (username) {
      const that = this
      const auth = that.$store.state.auth()
      that.$http.get(that.$store.state.api + '/v1/user/' + username, auth)
        .then(data => {
          that.userShowData = data.data.data.user
          console.log(that.userShowData)
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
    showUser (username) {
      this.getUser(username)
      this.userShow = true
    },
    getData (page) {
      this.loading = true
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      that.$http.get(that.$store.state.api + '/v1/team/?page_size=100&contest_id=' + contest.id + '&page=' + page, auth)
        .then(data => {
          const tmp = data.data.data.res.data
          that.listData = []
          for (var item of tmp) {
            if (!that.showSetting[item.status]) continue
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

</style>
