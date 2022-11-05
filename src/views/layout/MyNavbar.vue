<template>
  <div>
    <div class="top-box">
      <a href="#">仓库管理</a>
    </div>
    <ul class="top-menu">
      <li class="top-nav-item">
        <el-dropdown>
          <span class="el-dropdown-link" style="color: white;">
            <el-avatar
              shape="square"
              size="medium"
              :src="squareUrl"
              class="user-img"
            ></el-avatar>
            用户名<i class="el-icon-arrow-down el-icon--right"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人资料</el-dropdown-item>
            <el-dropdown-item>修改密码</el-dropdown-item>
            <el-dropdown-item>退出</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      circleUrl:
        "https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",
      squareUrl:
        "https://cube.elemecdn.com/9/c2/f0ee8a3c7c9638a54940382568c9dpng.png",
      sizeList: ["large", "medium", "small"],
    };
  },
};
</script>

<style lang="scss" scoped>
.user-img{
  vertical-align: middle;
}
.color-main {
  color: blue;
}
.top-menu {
  float: right;
}
.top-nav-item {
  padding: 0 20px;
  line-height: 50px !important;
}
.top-box {
  width: 200px;
  height: 100%;
  float: left;
  line-height: 50px !important;
  // background: red;
  & a {
    text-decoration-line: none;
    color: white;
    font-size: 20px;
  }
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
