<template>
  <el-upload
    class="upload-demo"
    ref="upload"
    :action="' '"
    :file-list="fileList"
    :on-remove="handleRemove"
    :on-change="handleAvatarChangeIcon"
    :before-remove="handleBeforeRemove"
    :auto-upload="false"
    :limit="1"
  >
    <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
    <el-button
      style="margin-left: 10px"
      size="small"
      type="success"
      @click="submitUpload"
      :disabled="isDisabled"
      >上传到服务器</el-button
    >
    <div slot="tip" class="el-upload__tip">
      只能上传jpg/png文件，且不超过500kb
    </div>
  </el-upload>
</template>

<script>
import { policy, deleteFile } from "@/api/obs";
import axios from "axios";
import { Message } from "element-ui";
import { getUUID, getFileExtension } from "@/utils";

export default {
  data() {
    return {
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        AccessKeyId: "",
      },
      iconformData: {
        img: "",
        name: "",
      },
      obsUploadUrl: "",
      dir: "",
      imgpath: "",
      isDisabled: true,
      fileList: [
        {
          name: "food.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
        {
          name: "food2.jpeg",
          url: "https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100",
        },
      ],
    };
  },
  methods: {
    emitInput(val) {
      this.$emit("input", val);
    },
    handleAvatarChangeIcon(file, fileList) {
      const isJPG = file.raw.type === "image/jpeg";
      const isPNG = file.raw.type === "image/png";
      const isLt2M = file.raw.size / 1024 / 1024 < 0.5;
      this.hideUploadIcon = fileList.length >= 1;
      if (!isPNG && !isJPG) {
        this.$message.error("上传图片只能是 JPG/PNG 格式!");
        return false;
      } else if (!isLt2M) {
        this.$message.error("上传图片大小不能超过 200kb!");
        return false;
      } else if (isLt2M && (isPNG || isJPG)) {
        this.iconformData.img = file.raw; //图片的url
        this.iconformData.name = getUUID + getFileExtension(file.name); //图片的名字
        this.isDisabled = false;
      }
    },
    submitUpload() {
      policy().then((response) => {
        this.dataObj.policy = response.data.policy;
        this.dataObj.signature = response.data.signature;
        this.dataObj.AccessKeyId = response.data.accessKeyId;
        this.dataObj.key = response.data.dir + this.iconformData.name;
        this.dir = response.data.dir;
        this.obsUploadUrl = response.data.host;
        axios({
          method: "post",
          baseURL: this.obsUploadUrl,
          headers: { "Content-Type": "multipart/form-data" },
          data: {
            policy: this.dataObj.policy,
            signature: this.dataObj.signature,
            key: this.dataObj.key,
            AccessKeyId: this.dataObj.AccessKeyId,
            "x-obs-acl": "public-read",
            file: this.iconformData.img,
          },
        }).then(() => {
          Message({
            message: "上传成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.imgpath = this.obsUploadUrl + "/" + this.dataObj.key;
          this.fileList.push({
            name: this.iconformData.name,
            url: this.imgpath,
          });
          this.emitInput(this.imgpath);
        });
      });
    },
    handleRemove(file, fileList) {
      console.log("asd", file, fileList);
    },
    handleBeforeRemove(file, fileLis) {
      console.log(file);
      deleteFile(file.url).then(() => {
        Message({
          message: "删除成功",
          type: "success",
          duration: 3 * 1000,
        });
        return true;
      });
      return false;
    },
  },
  computed: {
    imageUrl() {
      if (this.url == null && this.url == "") {
        return null;
      }
      return null;
    },
    imageName() {
      if (this.url != null && this.url !== "") {
        return this.url.substr(this.url.lastIndexOf("/") + 1);
      } else {
        return null;
      }
    },
  },
};

<style></style>;
