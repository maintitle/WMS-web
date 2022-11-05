<template>
  <div style="height:100%">
    <!-- 主入口标签页 -->
    <el-tabs type="border-card" closable class="el-tabs-a">
      <el-tab-pane label="消息中心"></el-tab-pane>
    </el-tabs>
    <el-card class="card-body">
      <router-view />
    </el-card>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.el-tabs-a {
  line-height: 41px;
  height: 41px;
  border: 0px;
  box-shadow: 0;
}
.card-body {
  height: 93%;
}
</style>