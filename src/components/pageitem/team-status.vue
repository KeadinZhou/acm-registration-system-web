<template>
    <div class="statusBox">
        <template v-if="info">
            <template v-if="status===0">
                <el-popover placement="top" trigger="hover" content="报名暂未提交，需要队长提交审核">
                    <div class="state-unknown" slot="reference">
                        <i class="el-icon-warning"></i>
                        暂未提交
                    </div>
                </el-popover>
            </template>
            <template v-else-if="status===1">
                <el-popover placement="top" trigger="hover" content="报名提交成功，等待管理员审核">
                    <div class="state-wait" slot="reference">
                        <i class="el-icon-question"></i>
                        等待审核
                    </div>
                </el-popover>
            </template>
            <template v-else-if="status===2">
                <el-popover placement="top" trigger="hover" content="报名被驳回，请仔细阅读须知并检查报名信息后重新提交">
                    <div class="state-reject" slot="reference">
                        <i class="el-icon-error"></i>
                        审核驳回
                    </div>
                </el-popover>
            </template>
            <template v-else-if="status===3">
                <el-popover placement="top" trigger="hover" content="审核通过，报名成功">
                    <div class="state-success" slot="reference">
                        <i class="el-icon-success"></i>
                        审核通过
                    </div>
                </el-popover>
            </template>
        </template>
        <template v-else>
            <template v-if="status===0">
                <div class="state-unknown">
                    <i class="el-icon-warning"></i>
                    暂未提交
                </div>
            </template>
            <template v-else-if="status===1">
                <div class="state-wait">
                    <i class="el-icon-question"></i>
                    等待审核
                </div>
            </template>
            <template v-else-if="status===2">
                <div class="state-reject">
                    <i class="el-icon-error"></i>
                    审核驳回
                </div>
            </template>
            <template v-else-if="status===3">
                <div class="state-success">
                    <i class="el-icon-success"></i>
                    审核通过
                </div>
            </template>
        </template>
    </div>
</template>

<script>
export default {
  name: 'team-status',
  props: {
    status: Number,
    info: Boolean
  }
}
</script>

<style scoped>
    .statusBox{
        display: inline;
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
