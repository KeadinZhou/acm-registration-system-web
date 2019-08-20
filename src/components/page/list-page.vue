<template>
    <div>
        <el-card class="box-card" shadow="hover" v-loading="loading">
            <div class="page-title">
                <i class="el-icon-s-order"></i><b>报名列表</b>
            </div>
            <el-collapse accordion>
                <el-collapse-item class="collapse-item">
                    <template slot="title">
                        <b>001</b>
                        <el-divider direction="vertical"></el-divider>
                        三个臭皮匠
                        <el-divider direction="vertical"></el-divider>
                        <template>
                            <div class="state-success">
                                <i class="el-icon-success"></i>
                                审核通过
                            </div>
                        </template>
                    </template>
                    <template>
                        <div>队伍编号：001</div>
                        <div>队伍名称：三个臭皮匠</div>
                        <div>队伍成员：罗贤哲、罗贤哲、罗贤哲</div>
                        <div>
                            队伍状态：
                            <template>
                                <div class="state-success">
                                    <i class="el-icon-success"></i>
                                    审核通过
                                </div>
                            </template>
                        </div>
                    </template>
                </el-collapse-item>

                <el-collapse-item class="collapse-item">
                    <template slot="title">
                        <b>002</b>
                        <el-divider direction="vertical"></el-divider>
                        三个臭臭臭皮匠
                        <el-divider direction="vertical"></el-divider>
                        <template>
                            <div class="state-reject">
                                <i class="el-icon-error"></i>
                                审核驳回
                            </div>
                        </template>
                    </template>
                    <template>
                        <div>队伍编号：002</div>
                        <div>队伍名称：三个臭臭臭皮匠</div>
                        <div>队伍成员：罗贤哲、罗贤哲、罗贤哲</div>
                        <div>
                            队伍状态：
                            <template>
                                <div class="state-reject">
                                    <i class="el-icon-error"></i>
                                    审核驳回
                                </div>
                            </template>
                        </div>
                    </template>
                </el-collapse-item>

                <el-collapse-item class="collapse-item">
                    <template slot="title">
                        <b>003</b>
                        <el-divider direction="vertical"></el-divider>
                        三个臭臭
                        <el-divider direction="vertical"></el-divider>
                        <template>
                            <div class="state-wait">
                                <i class="el-icon-question"></i>
                                等待审核
                            </div>
                        </template>
                    </template>
                    <template>
                        <div>队伍编号：003</div>
                        <div>队伍名称：三个臭臭</div>
                        <div>队伍成员：罗贤哲、罗贤哲、罗贤哲</div>
                        <div>
                            队伍状态：
                            <template>
                                <div class="state-wait">
                                    <i class="el-icon-question"></i>
                                    等待审核
                                </div>
                            </template>
                        </div>
                    </template>
                </el-collapse-item>

                <el-collapse-item class="collapse-item">
                    <template slot="title">
                        <b>004</b>
                        <el-divider direction="vertical"></el-divider>
                        两个臭臭臭臭didi
                        <el-divider direction="vertical"></el-divider>
                        <template>
                            <div class="state-unknown">
                                <i class="el-icon-warning"></i>
                                暂未提交
                            </div>
                        </template>
                    </template>
                    <template>
                        <div>队伍编号：004</div>
                        <div>队伍名称：两个臭臭臭臭didi</div>
                        <div>队伍成员：罗贤哲、罗贤哲</div>
                        <div>
                            队伍状态：
                            <template>
                                <div class="state-unknown">
                                    <i class="el-icon-warning"></i>
                                    暂未提交
                                </div>
                            </template>
                        </div>
                    </template>
                </el-collapse-item>
            </el-collapse>
        </el-card>
    </div>
</template>

<script>
export default {
  name: 'list-page',
  data () {
    return {
      loading: false
    }
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
    .state-success{
        display: inline;
        color: #67C23A;
    }
    .state-reject{
        display: inline;
        color: #F56C6C;
    }
    .state-wait{
        display: inline;
        color: #E6A23C;
    }
    .state-unknown{
        display: inline;
        color: #909399;
    }
</style>
