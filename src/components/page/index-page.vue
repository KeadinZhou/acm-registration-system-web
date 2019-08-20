<template>
    <div>
        <div id="indexBigImg">
            <img src="@/assets/acm.png" width="100%">
        </div>
        <div id="indexTitle">
            <b>{{ this.$store.state.contest.title }}</b>
        </div>

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="boxTitle">
                <span><b>01</b></span>
                <el-divider direction="vertical"></el-divider>
                <span>相关通知</span>
            </div>
            <div v-for="o in 4" :key="o" class="item">
                {{'相关通知相关通知相关通知相关通知 ' + o }}
            </div>
        </el-card>

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="boxTitle">
                <span><b>02</b></span>
                <el-divider direction="vertical"></el-divider>
                <span>报名方式</span>
            </div>
            <div class="item">
                报名开放时间为 <b>{{ this.$store.state.contest.regBeginTime + ' ~ ' + this.$store.state.contest.regEndTime}}</b>,
                请于截止时间之前在本系统注册、完成个人信息的完善{{ this.$store.state.contest.teamMode?'并完组队。':'。' }}
                请确保你的报名信息出现在报名列表中，并最终通过审核
            </div>
        </el-card>

        <el-card class="box-card" shadow="hover">
            <div slot="header" class="boxTitle">
                <span><b>03</b></span>
                <el-divider direction="vertical"></el-divider>
                <span>相关链接</span>
            </div>
            <div v-for="o in 6" :key="o" class="item">
                {{'相关链接相关链接相关链接 ' + o }}
            </div>
        </el-card>

    </div>
</template>

<script>
import store from '@/vuex/store.js'
export default {
  name: 'index-page',
  store,
  data () {
    return {
    }
  },
  methods: {
    permissionCheck () {
      if (this.$store.state.userIsUpdated) {
        if (this.$store.state.user.permission !== 0) {
          this.$router.replace('/activate')
        } else {
          // this.getData()
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
