<template>
    <div>
        <el-card class="box-card" shadow="hover">
            <div id="indexBigImg">
                <img src="@/assets/acm.png" width="100%">
            </div>

            <div id="indexTitle">
                <b>程序设计竞赛报名系统</b>
                <p class="about-text">
                    <br>
                    Copyright &copy; 2018-{{ new Date().getFullYear() }} ZUCC-ACM-LAB. All Rights Reserved.<br>
                    Powered by <el-link type="primary" href="https://github.com/taoting1234/acm-registration-system-backend">Taoting</el-link> & <el-link type="primary" href="https://github.com/KeadinZhou/acm-registration-system-web">Keadin</el-link>
                </p>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'about-page'
}
</script>

<style scoped>
    #indexBigImg{
        position: relative;
        top: 40px;
        left: 50%;
        width: 500px;
        transform: translate(-50%, 0);
    }
    #indexTitle{
        margin-top: 70px;
        margin-bottom: 50px;
        width: 100%;
        text-align: center;
        font-size: 25px;
    }
    .about-text{
        font-size: 14px;
    }
</style>
