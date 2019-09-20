<template>
    <div class="tableBox">
        <el-dialog title="发布公告" :visible.sync="createBoxShow" :append-to-body="true" width="600px">
            <el-input placeholder="公告标题" v-model="createData.title"></el-input>
            <div style="margin: 20px"></div>
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="公告内容" v-model="createData.text"></el-input>
            <div style="margin: 20px"></div>
            <el-select placeholder="公告类型" v-model="createData.type" >
                <el-option v-for="item in createList" :key="item.lable" :label="item.lable" :value="item.value" :selected="item.value === createData.type"></el-option>
            </el-select>
            <el-checkbox v-model="createData.toAll" v-if="createData.type !== 2" style="float: right">全局公告</el-checkbox>
            <div slot="footer" class="dialog-footer">
                <el-button @click="createBoxShow = false">取消</el-button>
                <el-button type="primary" @click="creatAnnouncement">发布</el-button>
            </div>
        </el-dialog>

        <el-dialog title="编辑公告" :visible.sync="editBoxShow" :append-to-body="true" width="600px">
            <el-input placeholder="公告标题" v-model="editData.title"></el-input>
            <div style="margin: 20px"></div>
            <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" placeholder="公告内容" v-model="editData.text"></el-input>
            <div style="margin: 20px"></div>
            <el-select placeholder="公告类型" v-model="editData.type" >
                <el-option v-for="item in createList" :key="item.lable" :label="item.lable" :value="item.value" :selected="item.value === editData.type"></el-option>
            </el-select>
            <el-checkbox v-model="editData.toAll" v-if="editData.type !== 2" style="float: right">全局公告</el-checkbox>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editBoxShow = false">取消</el-button>
                <el-button type="danger" @click="editBoxShow = false;deleteAnnouncement(editData.id)">删除</el-button>
                <el-button type="primary" @click="editAnnouncement">保存</el-button>
            </div>
        </el-dialog>

        <el-divider>相关通知</el-divider>
        <div v-loading="loading" v-if="isRefresh">
            <el-table :data="tableData[0]" style="width: 100%" :show-header="false">
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        {{ JSON.parse(scope.row.content).title }}
                        <template v-if="scope.row.contest_id === null">
                            <el-divider direction="vertical"></el-divider>
                            <el-tag size="mini">全局</el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="Edit" width="50">
                    <template slot-scope="scope">
                        <span style="cursor: pointer" @click="openEditBox(0,scope.$index)"><i class="el-icon-edit"></i></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-divider>报名方式</el-divider>
        <div v-loading="loading" v-if="isRefresh">
            <el-table :data="tableData[1]" style="width: 100%" :show-header="false">
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        {{ JSON.parse(scope.row.content).title }}
                        <template v-if="scope.row.contest_id === null">
                            <el-divider direction="vertical"></el-divider>
                            <el-tag size="mini">全局</el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="Edit" width="50">
                    <template slot-scope="scope">
                        <span style="cursor: pointer" @click="openEditBox(1,scope.$index)"><i class="el-icon-edit"></i></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-divider>相关链接</el-divider>
        <div v-loading="loading" v-if="isRefresh">
            <el-table :data="tableData[2]" style="width: 100%" :show-header="false">
                <el-table-column label="Title">
                    <template slot-scope="scope">
                        {{ JSON.parse(scope.row.content).title }}
                        <template v-if="scope.row.contest_id === null">
                            <el-divider direction="vertical"></el-divider>
                            <el-tag size="mini">全局</el-tag>
                        </template>
                    </template>
                </el-table-column>
                <el-table-column label="Edit" width="50">
                    <template slot-scope="scope">
                        <span style="cursor: pointer" @click="openEditBox(2,scope.$index)"><i class="el-icon-edit"></i></span>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <div style="margin: 20px"></div>
        <el-button style="float: right" @click="createBoxShow=true">发布公告</el-button>
    </div>
</template>

<script>
export default {
  name: 'admin-index',
  data () {
    return {
      loading: false,
      isRefresh: true,
      currentPage: 1,
      dataCount: 0,
      tableData: [[], [], []],
      createList: [{value: 1, lable: '相关通知'}, {value: 2, lable: '报名方式'}, {value: 3, lable: '相关链接'}],
      createBoxShow: false,
      createData: {
        title: '',
        text: '',
        type: '',
        toAll: false
      },
      editBoxShow: false,
      editData: {
        title: '',
        text: '',
        type: '',
        toAll: false,
        id: ''
      }
    }
  },
  methods: {
    creatAnnouncement () {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      const tmp = that.createData
      if (contest.id === -9) return
      var sendData = {
        contest_id: contest.id,
        type: tmp.type,
        content: JSON.stringify({
          title: tmp.title,
          text: tmp.text
        })
      }
      if (tmp.type !== 2 && tmp.toAll) delete (sendData['contest_id'])
      that.$http.post(that.$store.state.api + '/v1/announcement/', sendData, auth)
        .then(data => {
          that.$message.success('创建成功!')
          that.createData.title = ''
          that.createData.text = ''
          that.createData.type = ''
          that.createData.toAll = false
          that.createBoxShow = false
          that.getData()
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
    openEditBox (x, y) {
      console.log(x + ' ' + y)
      const tmp = JSON.parse(this.tableData[x][y].content)
      this.editData.title = tmp.title
      this.editData.text = tmp.text
      this.editData.type = this.tableData[x][y].type
      this.editData.toAll = this.tableData[x][y].contest_id === null
      this.editData.id = this.tableData[x][y].id
      this.editBoxShow = true
    },
    editAnnouncement () {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      const tmp = that.editData
      if (contest.id === -9) return
      var sendData = {
        contest_id: contest.id,
        type: tmp.type,
        content: JSON.stringify({
          title: tmp.title,
          text: tmp.text
        })
      }
      if (tmp.type !== 2 && tmp.toAll) delete (sendData['contest_id'])
      that.$http.put(that.$store.state.api + '/v1/announcement/' + tmp.id, sendData, auth)
        .then(data => {
          that.$message.success('修改成功!')
          that.editBoxShow = false
          that.getData()
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
    deleteAnnouncement (id) {
      const that = this
      const auth = that.$store.state.auth()
      that.$http.delete(that.$store.state.api + '/v1/announcement/' + id, auth)
        .then(data => {
          that.$message.success('删除成功!')
          that.getData()
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
    getData () {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      if (contest.id === -9) return

      that.loading = true
      that.$http.get(that.$store.state.api + '/v1/announcement/?contest_id=' + contest.id, auth)
        .then(data => {
          console.log(data.data.data.res.data)
          that.tableData = [[], [], []]
          var tmp = data.data.data.res.data
          for (var item of tmp) {
            that.tableData[item.type - 1].push(item)
          }
          that.loading = false
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
    this.getData()
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
