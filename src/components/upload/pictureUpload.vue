<template>
  <div>
    <el-upload
      drag
      :show-file-list="false"
      action="#"
      :on-change="uploadFile"
      :on-preview="handlePictureCardPreview"
      :auto-upload="false"
      accept="image/jpg,image/jpeg,image/png"
    >
      <i v-if="!imageUrl" class="el-icon-plus" style="color: #8c939d"></i>

      <img v-if="imageUrl" :src="imageUrl" class="avatar" />
      <div v-if="imageUrl" class="img-shade">
        <span>
          <i class="el-icon-zoom-in" @click.stop="handlePictureCardPreview"></i>
        </span>
        <span>
          <i class="el-icon-delete" @click.stop="handleRemove"></i>
        </span>
      </div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="" />
    </el-dialog>

    <div>
      <el-button type="primary" @click="updatePhoto"
        >上传<i class="el-icon-upload el-icon--right"></i
      ></el-button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { policy } from "@/api/obs";
import { updateUser } from "@/api/system_user";
import { Message } from "element-ui";
export default {
  name: "pictureUpload",
  props: {
    photo: String,
    uid: Number,
  },
  data() {
    return {
      localfile: "",
      imageUrl: this.photo,
      dialogImageUrl: "",
      dialogVisible: false,
      disabled: false,
      id: this.uid,
      dataObj: {
        policy: "",
        signature: "",
        key: "",
        AccessKeyId: "",
        "x-obs-acl": "public-read",
      },
      userData: {
        id: "",
        imgpath: "",
      },
      obsUploadUrl: "",
      dir: "",
    };
  },
  methods: {
    handleRemove() {
      this.imageUrl = "";
    },
    handlePictureCardPreview() {
      this.dialogImageUrl = this.imageUrl;
      this.dialogVisible = true;
    },
    uploadFile(file) {
      this.imageUrl = URL.createObjectURL(file.raw);
      this.localfile = file;
    },
    updatePhoto() {
      return new Promise((resolve) => {
        policy(this.id)
          .then((response) => {
            this.dataObj.policy = response.data.policy;
            this.dataObj.signature = response.data.signature;
            this.dataObj.AccessKeyId = response.data.accessKeyId;
            this.dataObj.key = response.data.dir + this.localfile.name;
            this.dir = response.data.dir;
            this.obsUploadUrl = response.data.host;
            //发送post表单提交图片
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
                file: this.localfile.raw,
              },
            })
            resolve(true);
          })
      }).then(() => {
        return new Promise(() => {
          this.userData.id = this.id;
          this.userData.imgpath = this.obsUploadUrl + "/" + this.dataObj.key;
          updateUser(this.userData).then(() => {
            this.imageUrl = this.userData.imgpath;
            Message({
              message: "上传成功",
              type: "success",
              duration: 3 * 1000,
            });
          });
        });
      });
    },
  },
};
</script>

<style  lang="scss" scoped >
::v-deep .el-upload {
  text-align: center;
  .el-upload-dragger {
    box-sizing: content-box;
    height: 146px;
    width: 146px;
  }
  img {
    width: 100%;
    height: 100%;
  }
  .img-shade {
    width: 100%;
    height: 100%;
    display: none;
    opacity: 1;
    position: absolute;
    left: 0px;
    top: 0px;
    color: #fff;
    span + span {
      margin-left: 15px;
    }
  }
  i {
    font-size: 28px;
    line-height: 1;
  }
}
.el-upload:hover {
  .img-shade {
    display: block;
    background-color: rgba(0, 0, 0, 0.5);
    transition: opacity 0.3s;
  }
}
</style>