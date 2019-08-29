<template>
    <div>
        <div id="indexBigImg">
            <img src="@/assets/acm.png" width="100%">
        </div>
        <div id="indexTitle">
            <b>{{ this.$store.state.contest.name }}</b>
        </div>

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="boxTitle">
                <span><b>01</b></span>
                <el-divider direction="vertical"></el-divider>
                <span>相关通知</span>
            </div>
            <div v-for="index in tableData[0].length" :key="index" class="item">
                <el-link :underline="false" style="font-size: 16px" @click="showBox(index-1)">{{ JSON.parse(tableData[0][index-1].content).title }}</el-link>
            </div>
        </el-card>

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="boxTitle">
                <span><b>02</b></span>
                <el-divider direction="vertical"></el-divider>
                <span>报名方式</span>
            </div>
            <div v-for="index in tableData[1].length" :key="index" class="item">
                <markdown-it-vue class="md-body" :content="JSON.parse(tableData[1][index-1].content).text"/>
            </div>
        </el-card>

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="boxTitle">
                <span><b>03</b></span>
                <el-divider direction="vertical"></el-divider>
                <span>相关链接</span>
            </div>
            <div v-for="index in tableData[2].length" :key="index" class="item">
                <el-link :underline="false" :href="JSON.parse(tableData[2][index-1].content).text" style="font-size: 16px" target="_blank">{{ JSON.parse(tableData[2][index-1].content).title }}</el-link>
            </div>
        </el-card>

        <el-dialog :title="dialogData.title" :visible.sync="dialogShow" :append-to-body="true" width="1000px">
            <markdown-it-vue class="md-body" :content="dialogData.text"/>
        </el-dialog>
    </div>
</template>

<script>
import store from '@/vuex/store.js'
export default {
  name: 'index-page',
  store,
  data () {
    return {
      tableData: [[], [], []],
      dialogShow: false,
      dialogData: {
        title: '',
        text: ''
      }
    }
  },
  methods: {
    showBox (index) {
      this.dialogData = JSON.parse(this.tableData[0][index].content)
      this.dialogShow = true
    },
    getData () {
      const that = this
      const auth = that.$store.state.auth()
      const contest = that.$store.state.contest
      if (contest.id === -9) {
        setTimeout(() => {
          this.getData()
        }, 500)
        return
      }

      that.loading = true
      that.$http.get(that.$store.state.api + '/v1/announcement/?contest_id=' + contest.id, auth)
        .then(data => {
          that.tableData = [[], [], []]
          var tmp = data.data.data.res.data
          for (var item of tmp) {
            that.tableData[item.type - 1].push(item)
          }
          that.loading = false
        })
        .catch(function (error) {
          if (error.response) {
            that.$message.error(error.response.data.msg)
          }
        })
    },
    permissionCheck () {
      if (this.$store.state.userIsUpdated) {
        if (this.$store.state.user.permission === 0) {
          this.$router.replace('/activate')
        } else {
          this.getData()
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
    #indexBigImg{
        position: relative;
        left: 50%;
        width: 500px;
        transform: translate(-50%, 0);
    }
    #indexTitle{
        margin-top: 50px;
        margin-bottom: 50px;
        width: 100%;
        text-align: center;
        font-size: 25px;
    }

    .boxTitle{
        font-size: 18px;
    }
    .item {
        font-size: 16px;
        margin: 18px 50px;
    }

    .box-card {
        width: 100%;
        margin-bottom: 50px;
    }
</style>
