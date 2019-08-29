<template>
    <div>

        <el-dialog title="创建队伍" :visible.sync="createBoxShow" :append-to-body="true" width="600px">
            <el-input placeholder="队伍名称" v-model="createData.name"></el-input>
            <div style="margin: 20px"></div>
            <el-input placeholder="队伍密码" v-model="createData.password"></el-input>
            <div style="margin: 20px"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createBoxShow = false">取消</el-button>
                <el-button type="primary" @click="createTeam">创建</el-button>
            </div>
        </el-dialog>

        <el-dialog title="加入队伍" :visible.sync="addBoxShow" :append-to-body="true" width="600px">
            <el-input placeholder="队伍ID" v-model.number="addData.team_id"></el-input>
            <div style="margin: 20px"></div>
            <el-input placeholder="队伍密码" v-model="addData.password"></el-input>
            <div style="margin: 20px"></div>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createBoxShow = false">取消</el-button>
                <el-button type="primary" @click="addTeam">加入</el-button>
            </div>
        </el-dialog>

        <div>
            <el-card class="box-card" shadow="hover">
                <div class="page-title">
                    <i class="el-icon-share"></i><b>队伍管理</b>
                </div>
                <el-divider><i class="el-icon-postcard"></i></el-divider>
                <div class="form-box">
                    <div>
                        <template v-if="!haveTeam">
                            <div style="width:100%;display:flex;align-items:center;justify-content:space-around;">
                                <el-button @click="createBoxShow = true">创建队伍</el-button>
                                <el-button @click="addBoxShow = true">加入队伍</el-button>
                            </div>
                        </template>
                        <template v-else>
                            <el-divider>队伍信息</el-divider>

                            <el-table :data="teamTableData" style="width: 100%" :show-header="false">
                                <el-table-column label="Item" align="center" width="200">
                                    <template slot-scope="scope">
                                        {{ scope.row }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="Value" align="center">
                                    <template slot-scope="scope">
                                        <template v-if="scope.row==='比赛名称'">{{$store.state.contest.name}}</template>
                                        <template v-else-if="scope.row==='队伍ID'">{{team.id}}</template>
                                        <template v-else-if="scope.row==='队伍名称'">{{team.name}} <span style="cursor: pointer" @click="editName(team)"><i class="el-icon-edit"></i></span></template>
                                        <template v-else-if="scope.row==='队伍队长'">{{team.create_username}}</template>
                                        <template v-else-if="scope.row==='队伍状态'"><team-status :status="team.status" :info="true"></team-status></template>
                                        <template v-else>{{'!error'}}</template>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-divider>队员信息</el-divider>
                            <el-table :data="teamMember" style="width: 100%" :show-header="false">
                                <el-table-column label="ID" align="center">
                                    <template slot-scope="scope">
                                        队员{{scope.$index+1}}
                                    </template>
                                </el-table-column>
                                <el-table-column label="Username" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.user.username }}
                                    </template>
                                </el-table-column>
                                <el-table-column label="Nickname" align="center">
                                    <template slot-scope="scope">
                                        {{ scope.row.user.nickname }}
                                    </template>
                                </el-table-column>
                            </el-table>
                            <el-divider></el-divider>
                            <div style="width:100%;display:flex;align-items:center;justify-content:space-around;">
                                <template v-if="isLeader">
                                    <el-button type="success" @click="saveTeam({status:1})" :disabled="!(team.status===0||team.status===2)">提交审核</el-button>
                                    <el-popover placement="top" v-model="breakTeamSure">
                                        <p style="margin: 10px">确定解散队伍吗？</p>
                                        <div style="text-align: right; margin: 0">
                                            <el-button size="mini" type="text" @click="breakTeamSure = false" style="color: black">取消</el-button>
                                            <el-button type="danger" size="mini" @click="breakTeamSure = false; breakTeam()">确定</el-button>
                                        </div>
                                        <el-button type="danger" slot="reference" :disabled="!(team.status===0||team.status===2)">解散队伍</el-button>
                                    </el-popover>
                                </template>
                                <template v-else>
                                    <el-button type="danger" @click="exitTeam()" :disabled="!(team.status===0||team.status===2)">退出队伍</el-button>
                                </template>
                            </div>
                        </template>
                    </div>
                </div>
            </el-card>
        </div>
    </div>
</template>

<script>
import TeamStatus from '@/components/pageitem/team-status'
import store from '@/vuex/store.js'
export default {
  name: 'team-page',
  store,
  components: {
    'team-status': TeamStatus
  },
  data () {
    return {
      haveTeam: false,
      isLeader: false,
      relationId: 0,
      team: {
        contest_id: 2,
        create_username: '31701030',
        id: 3,
        name: 'TESTTEAM',
        status: 0
      },
      teamMember: [],
      createBoxShow: false,
      createData: {
        name: '',
        password: ''
      },
      addBoxShow: false,
      addData: {
        team_id: '',
        password: ''
      },
      breakTeamSure: false,
      exitTeamSure: false,
      teamTableData: ['比赛名称', '队伍ID', '队伍名称', '队伍队长', '队伍状态']
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
        } else
        if (!this.$store.state.user.nickname) {
          this.$message.error('必须完善个人信息后才能进行队伍操作！')
          this.$router.replace('/perinfo')
        } else
        if (this.$store.state.contest.id === -9) {
          this.$message.error('暂无活动的的竞赛！')
          this.$router.replace('/index')
        } else {
          this.getData()
        }
      } else {
        setTimeout(() => {
          this.permissionCheck()
        }, 100)
      }
    },
    createTeam () {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      const tmp = that.createData
      var sendData = {
        name: tmp.name,
        password: tmp.password,
        contest_id: contest.id,
        status: 0
      }
      that.$http.post(that.$store.state.api + '/v1/team/', sendData, auth)
        .then(data => {
          that.$message.success('创建成功!')
          that.createBoxShow = false
          that.getData()
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    addTeam () {
      const that = this
      const auth = that.$store.state.auth()
      const tmp = that.addData
      var sendData = {
        team_id: tmp.team_id,
        password: tmp.password
      }
      that.$http.post(that.$store.state.api + '/v1/team_relationship/', sendData, auth)
        .then(data => {
          that.$message.success('加入成功!')
          that.addBoxShow = false
          that.getData()
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    refreshTeamData () {
      const that = this
      const auth = that.$store.state.auth()
      that.$http.get(that.$store.state.api + '/v1/team_relationship/?team_id=' + that.team.id, auth)
        .then(data => {
          const tmp = data.data.data.res
          that.teamMember = tmp.data
          console.log(tmp)
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    breakTeam () {
      const that = this
      const auth = that.$store.state.auth()
      that.$http.delete(that.$store.state.api + '/v1/team/' + that.team.id, auth)
        .then(data => {
          that.$message.success('解散成功!')
          that.getData()
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    exitTeam () {
      const that = this
      const auth = that.$store.state.auth()
      that.$http.delete(that.$store.state.api + '/v1/team_relationship/' + that.relationId, auth)
        .then(data => {
          that.$message.success('退出成功!')
          that.getData()
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    saveTeam (sendData) {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      sendData.contest_id = contest.id
      if (!sendData.name) sendData.name = that.team.name
      if (!sendData.status) sendData.status = that.team.status
      that.$http.put(that.$store.state.api + '/v1/team/' + that.team.id, sendData, auth)
        .then(data => {
          if (sendData.status) {
            that.$message.success('提交成功!')
          } else {
            that.$message.success('修改成功!')
          }
          that.getData()
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    editName (team) {
      this.$prompt('', '修改队伍名称', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputValue: team.name
      }).then(({ value }) => {
        team.name = value
        this.saveTeam({name: value})
      })
    },
    getData () {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      that.$http.get(that.$store.state.api + '/v1/team_relationship/?username=' + that.$store.state.user.username + '&contest_id=' + contest.id, auth)
        .then(data => {
          const tmp = data.data.data.res
          if (tmp.count === 0) {
            that.haveTeam = false
          } else {
            that.haveTeam = true
            that.isLeader = that.$store.state.user.username === tmp.data[0].team.create_username
            that.team = tmp.data[0].team
            that.relationId = tmp.data[0].id
            that.refreshTeamData()
          }
          console.log(data.data)
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
    .page-title{
        width: 100%;
        margin-top: 50px;
        margin-bottom: 50px;
        text-align: center;
        font-size: 30px;
    }
    .form-box{
        width: calc(100% - 50px - 50px);
        margin: 50px;
    }
</style>
