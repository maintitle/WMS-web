<template>
    <div class="app-container">
    <el-card class="filter-container" shadow="never"></el-card>
    <el-card class="operate-container" shadow="never"></el-card>
    <div class="table-container"></div>
    <div class="batch-operate-container"></div>
    <div class="pagination-container"></div>
    <el-dialog
      :title="isEdit ? '编辑' : '添加'"
      :visible.sync="dialogVisible"
      width="40%"
    ></el-dialog>
  </div>
</template>
<script>
export default {

}
</script>

<style>

</style>