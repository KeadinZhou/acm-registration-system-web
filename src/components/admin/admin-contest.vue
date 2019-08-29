<template>
    <div class="tableBox">
        <el-dialog title="创建竞赛" :visible.sync="createBoxShow" :append-to-body="true" width="600px">
            <el-input placeholder="竞赛名称" v-model="createData.name"></el-input>
            <div style="margin: 20px"></div>
            <el-input placeholder="限制人数" v-model.number="createData.limit"></el-input>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createBoxShow = false">取消</el-button>
                <el-button type="primary" @click="creatContest">创建</el-button>
            </div>
        </el-dialog>
        <div v-loading="loading" v-if="isRefresh">
            <el-table :data="tableData" style="width: 100%" :show-header="false">
                <el-table-column label="Name">
                    <template slot-scope="scope">
                        {{ scope.row.name }}&nbsp;<span style="cursor: pointer" @click="editName(scope.row)"><i class="el-icon-edit"></i></span>
                    </template>
                </el-table-column>
                <el-table-column label="Limit" align="center" width="100">
                    <template slot-scope="scope">
                        {{ scope.row.limit }}人&nbsp;<span style="cursor: pointer" @click="editLimit(scope.row)"><i class="el-icon-edit"></i></span>
                    </template>
                </el-table-column>
                <el-table-column label="RegStatus" align="center" width="70">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="是否允许报名" placement="top">
                            <el-switch
                                    v-if="scope.row.status === 1"
                                    v-model="scope.row.registration_status"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="saveChange(scope.row)">
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
                <el-table-column label="Status" align="center" width="70">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="是否激活竞赛" placement="top">
                            <el-switch
                                    v-model="scope.row.status"
                                    :active-value="1"
                                    :inactive-value="0"
                                    @change="saveChange(scope.row)">
                            </el-switch>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination
                :page-size="20"
                layout="prev,pager,next"
                :total="this.dataCount"
                :current-page="this.currentPage"
                align="center"
                style="margin-top: 20px"
                @current-change="current_change">
        </el-pagination>
        <div style="margin: 20px"></div>
        <el-button style="float: right" @click="createBoxShow=true">添加竞赛</el-button>
    </div>
</template>

<script>
export default {
  name: 'admin-contest',
  data () {
    return {
      loading: false,
      isRefresh: true,
      currentPage: 1,
      dataCount: 0,
      tableData: [{
        id: 1,
        limit: 3,
        name: 'test',
        status: 0,
        registration_status: 0
      }],
      createBoxShow: false,
      createData: {
        name: '',
        limit: '',
        status: 0,
        registration_status: 0
      }
    }
  },
  methods: {
    current_change (currentPage) {
      this.getData(currentPage)
    },
    creatContest () {
      const that = this
      const auth = that.$store.state.auth()

      var tmp = that.createData
      that.$http.post(that.$store.state.api + '/v1/contest/', {
        name: tmp.name,
        limit: tmp.limit,
        status: tmp.status,
        registration_status: tmp.registration_status
      }, auth)
        .then(data => {
          that.$message.success('创建成功!')
          that.createData.name = ''
          that.createData.limit = ''
          that.createBoxShow = false
          that.getData(1)
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    saveChangeSure (row, row2) {
      console.log(row)
      console.log(row2)
      const that = this
      const auth = that.$store.state.auth()

      that.$http.put(that.$store.state.api + '/v1/contest/' + row.id, {
        name: row.name,
        limit: Number(row.limit),
        status: row.status,
        registration_status: row.registration_status
      }, auth)
        .then(data => {
          that.$store.commit('updateContest')
          if (row2) {
            that.saveChangeSure(row2)
          } else {
            that.getData(that.currentPage)
            that.$message.success('操作成功!')
          }
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    saveChange (row) {
      var contest = this.$store.state.contest
      if (row.status === 1 && contest.id !== -9) {
        contest.status = 0
        this.saveChangeSure(contest, row)
      } else {
        this.saveChangeSure(row)
      }
    },
    editName (row) {
      this.$prompt('', '修改竞赛名称', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputValue: row.name
      }).then(({ value }) => {
        row.name = value
        this.saveChangeSure(row)
      })
    },
    editLimit (row) {
      this.$prompt('', '修改人数限制', {
        confirmButtonText: '修改',
        cancelButtonText: '取消',
        inputValue: row.limit
      }).then(({ value }) => {
        row.limit = value
        this.saveChangeSure(row)
      })
    },
    getData (pageid) {
      const that = this
      const auth = that.$store.state.auth()

      that.loading = true
      that.$http.get(that.$store.state.api + '/v1/contest/?page=' + pageid, auth)
        .then(data => {
          that.tableData = data.data.data.res.data
          that.dataCount = data.data.data.res.count
          that.loading = false
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    }
  },
  created () {
    this.getData(1)
  }
}
</script>

<style scoped>
    .tableBox {
        position: relative;
        width: 750px;
        left: 50%;
        transform: translate(-50%, 0);
    }
</style>
