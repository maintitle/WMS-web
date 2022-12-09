<template>
  <div>
    <el-tabs
      v-model="activeName"
      :stretch="false"
      style="color: white; height: 300px; width: 100%; caret-color: transparent"
    >
      <el-tab-pane label="基本资料" name="1">
        <InforTable :userDetail="userDetail"></InforTable>
      </el-tab-pane>
      <el-tab-pane label="修改头像" name="2">
        <PhotoTable> </PhotoTable>
      </el-tab-pane>
      <el-tab-pane label="密码管理" name="3">
        <PwdTable :userDetail="userDetail"></PwdTable>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import { InforTable, PhotoTable, PwdTable } from "./components";
import { mapGetters } from "vuex";
import { getUserInfo } from "@/api/system_user";
export default {
  data() {
    return {
      activeName: "1",
      userDetail: {},
    };
  },
  methods: {
    getUser() {
      return new Promise(() => {
        getUserInfo(this.id).then((response) => {
          this.userDetail = response.data;
        });
      });
    },
  },
  created() {
    this.getUser();
  },
  computed: {
    ...mapGetters(["id"]),
  },
  components: {
    InforTable,
    PhotoTable,
    PwdTable,
  },
};
</script>

<style lang="scss" scoped>
::v-deep .el-tabs__content {
  width: 90%;
  margin: 50px 50px;
}
::v-deep .el-tabs__item {
  display: table-cell;
}
::v-deep .el-tabs__nav-scroll {
  margin: 10px 10px 0px 10px;
}
a {
  color: black;
}
</style>