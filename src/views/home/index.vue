<template>
  <div>
    <el-row class="row-margin">
      <el-col :span="24">
        <div class="grid-content bg-purple-dark bg-green">
          <p>
            亲爱的，超级管理员 下午好！ 欢迎使用 仓库管理系统。当前时间为：{{
              gettime
            }}
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row class="row-margin" :gutter="10">
      <el-col class="" :span="12">
        <div class="grid-content bg-purple elem-quote col-height">
          <p>最新公告</p>
        </div>
        <div class="col-content">
          <span>asdas</span>
          <span>2020-03-08</span>
        </div>
      </el-col>
      <el-col class="" :span="12"
        ><div class="grid-content bg-purple-light elem-quote col-height">
          库存预警
        </div></el-col
      >
    </el-row>

    <!-- 查看公告的div -->
    <div id="desk_viewNewsDiv" style="padding: 10px; display: none">
      <h2 id="view_title" align="center"></h2>
      <hr />
      <div style="text-align: right">
        发布人:<span id="view_opername"></span>
        <span style="display: inline-block; width: 20px"></span>
        发布时间:<span id="view_createtime"></span>
      </div>
      <hr />
      <div id="view_content"></div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      gettime: "", //当前时间
    };
  },

  methods: {
    getTime() {
      var _this = this;
      let yy = new Date().getFullYear();
      let wk = new Date().getDay();
      var mm =
        new Date().getMonth() > 9
          ? new Date().getMonth() + 1
          : new Date().getMonth() == 9
          ? new Date().getMonth() + 1
          : "0" + (new Date().getMonth() + 1);
      var dd =
        new Date().getDate() < 10
          ? "0" + new Date().getDate()
          : new Date().getDate();
      let hh = new Date().getHours();
      let mf =
        new Date().getMinutes() < 10
          ? "0" + new Date().getMinutes()
          : new Date().getMinutes();
      let ss =
        new Date().getSeconds() < 10
          ? "0" + new Date().getSeconds()
          : new Date().getSeconds();
      let weeks = [
        "星期日",
        "星期一",
        "星期二",
        "星期三",
        "星期四",
        "星期五",
        "星期六",
      ];
      let week = weeks[wk];
      _this.gettime =
        yy +
        "年" +
        mm +
        "月" +
        dd +
        "日 " +
        hh +
        ":" +
        mf +
        ":" +
        ss +
        " " +
        week;
    },
    currentTime() {
      setInterval(this.getTime, 1000);
    },
  },
  mounted() {
    this.currentTime();
  },
};
</script>

<style lang="scss" scoped>
.row-margin {
  margin-bottom: 10px;
  position: relative;
  .col-height {
    height: 23px;
    line-height: 23px;
    text-align: left;
    padding: 10px 15px;
  }
  .col-content {
    height: 20px;
    line-height: 20px;
    padding: 9px 15px;
    text-align: left;
    border: 1px solid rgb(230, 230, 230);
    display: flex;
    justify-content: space-between;
    font: 14px;
  }
}
.bg-green {
  height: 44px;
  background: rgb(0, 150, 136);
  color: rgb(255, 255, 255);
  font: 14px Helvetica Neue, Helvetica, PingFang SC, Tahoma, Arial, sans-serif;
  & p {
    margin: 0 20px;
    text-align: left;
    line-height: 44px;
  }
}
.elem-quote {
  border-left: 4px solid rgb(0, 150, 136);
  background-color: rgb(242, 242, 242);
}
</style>