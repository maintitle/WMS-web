<template>
  <div>
   <single-upload :photo=avatar></single-upload>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import SingleUpload from '@/components/upload/singleUpload.vue'
export default {
  components:{SingleUpload},
  name: "updatePhoto",
  computed:{
    ...mapGetters(["avatar"]),
  }
};
</script>

<style lang="scss" scoped>
// ::v-deep .avatar-uploader .el-upload {
//   border: 1px dashed #d9d9d9;
//   border-radius: 6px;
//   cursor: pointer;
//   position: relative;
//   overflow: hidden;
// }
// ::v-deep .avatar-uploader .el-upload:hover {
//   border-color: #409eff;
// }
// ::v-deep .avatar-uploader-icon {
//   font-size: 28px;
//   color: #8c939d;
//   width: 178px;
//   height: 178px;
//   line-height: 178px;
//   text-align: center;
// }
// ::v-deep .avatar {
//   width: 178px;
//   height: 178px;
//   display: block;
// }
</style>