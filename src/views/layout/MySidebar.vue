<template>
  <div scroll="no">
    <div class="layui-side layui-bg-black">
      <div class="user-photo">
        <a class="img" title="我的头像"
          ><img
            src="../../assets/img/face.png"
            th:src="${'/file/showImageByPath?path='+session.user.getImgpath()}"
            class="userAvatar"
        /></a>
        <p>
          你好！<span class="userName" th:text="${session.user.name}"></span>,
          欢迎登录
        </p>
      </div>
    </div>
    <!-- <div class="sidebar_face">
      <img src="../../assets/img/face.png" />
      <span>你好！落亦-, 欢迎登录</span>
    </div> -->
    <el-row class="tac">
      <el-col :span="24">
        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="1">
            <i class="el-icon-s-home"></i>
            <span slot="title">后台首页</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss" scoped>
.sidebar_face {
  // margin: 10% 10% 0% 10%;
  height: 200px;
  width: 200px;
  color: white;
  /* -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%; */
  // border: 5px solid #fff;
  // overflow: hidden;
  /* box-shadow: 0 0 30px #009688; */
  & img {
    display: block;
    border: none;
    width: 50%;
    height: 50%;
    border-radius: 50%;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border: 4px solid #44576b;
    box-sizing: border-box;
  }
}
</style>