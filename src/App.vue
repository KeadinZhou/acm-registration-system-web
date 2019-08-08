<template>
  <div id="app">
      <page-nav></page-nav>
      <div class="page-main-box" ref="pageMainBox">
          <router-view/>
      </div>
      <page-foot></page-foot>
  </div>
</template>

<script>
import Nav from '@/components/page-nav'
import Foot from '@/components/page-foot'
export default {
  name: 'App',
  components: {
    'page-nav': Nav,
    'page-foot': Foot
  },
  data () {
    return {
      clientHeight: ''
    }
  },
  mounted () {
    this.clientHeight = document.documentElement.clientHeight - 60 - 40 - 100 + 'px'
    this.$refs.pageMainBox.style.minHeight = this.clientHeight
  }
}
</script>

<style>
    *{
        padding: 0;
        margin: 0;
        border: 0;
        text-decoration: none;
        list-style-type: none;
    }
    #app{
        font-family: "Helvetica Neue",Helvetica,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",Arial,sans-serif;
        min-width: 1200px;
    }
    .page-main-box{
        margin-top: 20px;
        margin-bottom: 20px;
        position: relative;
        width: 800px;
        min-height: 1000px;
        left: 50%;
        transform: translate(-50%,0);
    }
</style>
