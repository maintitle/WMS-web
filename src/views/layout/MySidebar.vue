<template>
  <div class="menu-wrapper">
    <div class="layui-side layui-bg-black side-wrapper">
      <div class="user-photo">
        <a class="img" title="我的头像"
          ><img
            :src="$store.getters.avatar"
            th:src="${'/file/showImageByPath?path='+session.user.getImgpath()}"
            class="userAvatar"
        /></a>
        <p>你好！{{ $store.getters.name }}, 欢迎登录</p>
      </div>
    </div>

    <el-scrollbar class="page-scroll">
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
            <router-link to="/home" key="home">
              <el-menu-item :index="'/home'">
                <svg-icon icon-class="user" color='#27ac3d'/>
                <span slot="title">后台首页</span>
              </el-menu-item>
            </router-link>
            <template
              v-for="item in routes"
              v-if="!item.hidden && item.children && item.name">
              <el-submenu :index="item.name || item.path" :key="item.name">
                <template slot="title">
                  <!-- <svg-icon
                  v-if="item.meta && item.meta.icon"
                  :icon-class="item.meta.icon"
                ></svg-icon> -->
                  <span v-if="item.meta && item.meta.title" slot="title">
                    {{ item.meta.title }}</span
                  >
                </template>

                <template v-for="child in item.children" v-if="!child.hidden">
                  <sidebar-item
                    :is-nest="true"
                    class="nest-menu"
                    v-if="child.children && child.children.length > 0"
                    :routes="[child]"
                    :key="child.path"
                  ></sidebar-item>

                  <router-link
                    v-else
                    :to="item.path + '/' + child.path"
                    :key="child.name"
                  >
                    <el-menu-item :index="item.path + '/' + child.path">
                      <!-- <svg-icon
                      v-if="child.meta && child.meta.icon"
                      :icon-class="child.meta.icon"
                    ></svg-icon> -->
                      <span
                        v-if="child.meta && child.meta.title"
                        slot="title"
                        >{{ child.meta.title }}</span
                      >
                    </el-menu-item>
                  </router-link>
                </template>
              </el-submenu>
            </template>
          </el-menu>
        </el-col>
      </el-row>
    </el-scrollbar>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
// import ScrollBar from '@/components/ScrollBar'
export default {
  // components: { ScrollBar },
  props: {
    isNest: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters(["routers"]),
    routes() {
      // return this.$router.options.routes
      return this.routers;
    },
  },

  methods: {
    hasOneShowingChildren(children) {
      const showingChildren = children.filter((item) => {
        return !item.hidden;
      });
      if (showingChildren.length === 1) {
        return true;
      }
      return false;
    },
    handleOpen(key, keyPath) {
      // console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      // console.log(key, keyPath);
    },
  },
};
</script>

<style lang="scss">
.menu-wrapper {
  height: 79%;
}

.user-photo {
  width: 200px;
  height: 120px;
  padding: 15px 0 5px;
}
.page-scroll {
  height: 100%;
  // position: relative;
  // top: 150px;
}

.el-scrollbar__wrap {
  overflow: scroll;
  width: 110%;
  height: 120%;
}

.page-scroll .el-scrollbar__wrap {
  overflow-x: hidden;
}
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
