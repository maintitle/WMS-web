<template>
  <div class="page-box">
    <div class="translucent-box"></div>
    <el-form
      :model="ruleForm"
      status-icon
      label-width="100px"
      ref="ruleForm"
      :rules="rules"
      class="demo-ruleForm layui-form"
    >
      <div class="login_face">
        <img src="../../assets/img/face.png" />
      </div>

      <el-form-item prop="username" label-width="0px">
        <el-input
          name="username"
          type="test"
          v-model="ruleForm.username"
          autocomplete="on"
          placeholder="请输入用户名"
        >
        </el-input>
      </el-form-item>

      <el-form-item prop="password" label-width="0px">
        <el-input
          type="password"
          v-model="ruleForm.password"
          autocomplete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>

      <el-form-item prop="code" id="imgCode" label-width="0px">
        <el-input
          type="text"
          placeholder="请输入验证码"
          autocomplete="off"
          v-model="ruleForm.code"
        ></el-input>
        <img :src="src" @click="getCaptcha()" alt="" />
      </el-form-item>

      <el-form-item label-width="0px">
        <el-button
          type="primary"
          class="buttonSize"
          :loading="loading"
          @click.native.prevent="handleLogin"
          >登入</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { isvalidUsername } from "@/utils/validate";
import { setCookie, getCookie } from "@/utils/support";
import { getCode } from "@/api/login";
export default {
  data() {
    var checkCode = (rule, value, callback) => {
      if (value === "") {
        return callback(new Error("验证码不能为空"));
      } else if (value.toLowerCase() !== this.codekey){
        return callback(new Error("验证码错误"));
      }else{
        callback();
      }
    };
    var validateUser = (rule, value, callback) => {
      if (!isvalidUsername(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      loading: false,
      ruleForm: {
        username: "",
        password: "",
        code: "",
      },
      rules: {
        username: [{ validator: validateUser, trigger: "blur" }],
        password: [{ validator: validatePass, trigger: "blur" }],
        code: [{ validator: checkCode, trigger: "blur" }],
      },
      src: "",
      codekey: ""
    };
  },
  created() {
    this.getCaptcha();
    this.ruleForm.username = getCookie("username");
    if (
      this.ruleForm.username === undefined ||
      this.ruleForm.username == null ||
      this.ruleForm.username === ""
    ) {
      this.ruleForm.username = "system";
    }
  },
  methods: {
    handleLogin() {
      this.$refs["ruleForm"].validate((valid) => {
        if (valid) {
          // let isSupport = getSupport();
          // if(isSupport===undefined||isSupport==null){
          //   this.dialogVisible =true;
          //   return;
          // }
          this.loading = true;
          this.$store
            .dispatch("Login", this.ruleForm)
            .then(() => {
              this.loading = false;
              setCookie("username", this.ruleForm.username, 15);
              this.$router.push({ path: "/" });
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          this.$message({
            message: "参数验证不合法！",
            type: "warning",
          });
          return false;
        }
      });
    },
    // 获取验证码
    getCaptcha() {
      return new Promise((reject) => {
        getCode()
          .then((response) => {
            this.src=response.data.img
            this.codekey=response.data.key
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
};
</script>
<style scoped>
.page-box {
  background: linear-gradient(to right, rgb(46, 37, 138), rgb(231, 0, 188));
  /* 若页面占不满时加 */
  height: 100vh;
}
.translucent-box {
  width: 300px;
  height: 400px;
  position: absolute;
  left: 40%;
  top: 19%;
  background-color: wheat;
  border-radius: 5px;
  transform: rotate(-10deg);
}
.layui-form {
  padding: 0 20px;
  width: 300px;
  height: 400px;
  position: absolute;
  left: 50%;
  top: 40%;
  margin: -150px 0 0 -150px;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  -o-box-sizing: border-box;
  box-sizing: border-box;
  background-color: rgb(255, 255, 255);
  -webkit-border-radius: 5px;
  -moz-border-radius: 5px;
  border-radius: 5px;
  /* box-shadow: 0 0 50px #009688;
  box-shadow: 0 0 50px #409eff; */
}
.login_face {
  margin: 20px;
  height: 100px;
  /* -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%; */
  border: 5px solid #fff;
  overflow: hidden;
  /* box-shadow: 0 0 30px #009688; */
}
.imgCode {
  position: relative;
}
#imgCode img {
  position: absolute;
  top: 3px;
  right: 1px;
  cursor: pointer;
}
.buttonSize {
  width: 100%;
}

.login_face-shadow {
  box-shadow: 0 0 30px #409eff;
}

/* .el-button--primary{
  background-color: rgb(2,151,137) !important;
  border-color: rgb(2,151,137) !important;
}
.el-button--primary:hover{
  background-color: rgb(51,171,160) !important;
  border-color: rgb(51,171,160) !important;
}
/* .el-button--primary:focus{
  background-color: rgb(0,150,136) !important;
  border-color: rgb(0,150,136) !important;
} */
</style>