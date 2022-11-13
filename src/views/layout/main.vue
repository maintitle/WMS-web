<template>
  <el-container class="fullWin">
    <el-header style="height: 50px; padding: 0px; max-height: 50px">
      <main-navbar></main-navbar>
    </el-header>

    <el-container class="main-contain">
      <el-aside class="aside-contain" width=200px>
        <main-sidebar></main-sidebar>
      </el-aside>
      <el-container>
        <el-main style="padding: 0px; height: 100%">
          <main-content></main-content>
        </el-main>
        <el-footer style="height: 44px">copyright @2022 TangZhen</el-footer>
      </el-container>
    </el-container>
  </el-container>
</template>

<script>
import MainNavbar from "./MyNavbar.vue";
import MainSidebar from "./MySidebar.vue";
import MainContent from "./MainContent.vue";
export default {
  components: {
    MainNavbar,
    MainSidebar,
    MainContent,
  },
};
</script>

<style lang="scss" scoped>
.main-contain {
  height: 93vh;
  .aside-contain {
    height: 100%;
  }
}
.fullWin {
  height: 100%;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  /* overflow: hidden; */
}
.el-header {
  background-color: rgb(35, 38, 46);

  color: #333;
  text-align: center;
  line-height: 60px;
}
.el-footer {
  background-color: rgb(238, 238, 238);
  color: rgb(244, 236, 236);
  text-align: center;
  line-height: 60px;
}
.el-aside {
  background-color: rgb(57, 61, 73);
  color: #333;
  text-align: center;
  line-height: 200px;
}


body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
.el-tabs-a {
  height: 100%;
  border: 0px;
  max-height: 60px;
  height: 60px;
}
.el-footer {
  line-height: 44px;
  font-size: 14px;
  color: black;
}
</style>
