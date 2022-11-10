<template>
  <div>
    <el-descriptions
      direction="horizontal"
      :column="1"
      border
      :contentStyle="CS"
      :label-style="LS"
    >
      <el-descriptions-item>
        <template slot=label>
          <!-- <i class="el-icon-user"></i> -->
        用户名
        </template>
        {{userDetail.name}}</el-descriptions-item>
      <el-descriptions-item label="登入名">{{
        userDetail.loginname
      }}</el-descriptions-item>
      <el-descriptions-item label="居住地">{{
        userDetail.address
      }}</el-descriptions-item>
      <el-descriptions-item label="入职时间">{{
        userDetail.hiredate
      }}</el-descriptions-item>
      <el-descriptions-item label="性别">{{
        (userDetail.sex = "1" ? "男" : "女")
      }}</el-descriptions-item>
    </el-descriptions>
  </div>
</template>

<script>
export default {
  name: "InforTable",
  props:['userDetail'],
  data() {
    return {
      CS: {
        "text-align": "left", //文本居中
        "min-width": "250px", //最小宽度
        "word-break": "break-all", //过长时自动换行
      },
      LS: {
        color: "#000",
        "text-align": "center",
        "font-weight": "600",
        height: "40px",
        "background-color": "rgba(242,242,242, 1)",
        "min-width": "110px",
        "word-break": "keep-all",
      },
    };
  },
};
</script>
<style lang="scss" scoped>

</style>