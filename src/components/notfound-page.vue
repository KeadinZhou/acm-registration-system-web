<template>
    <div style="margin: 100px">
        <el-alert
                title="404 NOT FOUND"
                type="error"
                description="啊哦,没有找到你想要的页面"
                show-icon
                :closable="false"
                effect="dark">
        </el-alert>
    </div>
</template>

<script>
export default {
  name: 'notfound-page'
}
</script>

<style scoped>

</style>
