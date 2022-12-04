
<template>
  <div class="treelistitem">
    <el-tree
      :data="data"
      node-key="id"
      :render-content="renderContent"
      @node-click="handleNodeClick"
      icon-class="none"
      default-expand-all
    ></el-tree>
  </div>
</template>
 
<script>
export default {
  data() {
    return {
      currentId: "",
      currentName: "",
      addName: "",
      open: false,
    };
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    deletefn: {
      type: Function,
    },
    edietFn: {
      type: Function,
    },
    addFn: {
      type: Function,
    },
    getId: {
      type: Function,
    },
    opreateId: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    prevent() {
      this.currentId = "";
    },
    ok(data, node) {
      if (data.name == this.currentName) {
        this.currentId = "";
        return false;
      }
 
      let edietData = {
        data,
        node,
        name: this.currentName,
        id: this.currentId,
      };
      this.$emit("edietFn", edietData);
      data.name = this.currentName;
      this.currentId = "";
    },
    handleNodeClick(val) {
      this.$emit("getId", val.id);
    },
    handleInput(val) {
      this.currentName = val;
    },
    handClick(value, data, node) {
      if (value == "1") {
        this.currentId = data.id;
        this.currentName = data.name;
      } else if (value == "2") {
        let addData = { data, node };
 
        this.$emit("addFn", addData);
      } else {
        this.$confirm("确定删除?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        })
          .then(() => {
            this.$emit("deletefn", data);
            const parent = node.parent;
            const children = parent.data.children || parent.data;
            const index = children.findIndex((d) => d.id === data.id);
            children.splice(index, 1);
          })
          .catch(() => {});
      }
    },
    renderContent(h, { node, data, store }) {
      return (
        <div class="custom-tree-node" style={{ width: "100%" }}>
          {data.children ? (
            node.expanded ? (
              <i class="el-icon-folder-opened" ></i>
            ) : (
              <i class="el-icon-folder" ></i>
            )
          ) : (
            <i class="el-icon-document" ></i>
          )}
          {this.currentId === data.id ? (
            <el-input
              value={this.currentName}
              on-input={this.handleInput}
              style={{ width: "40%" }}
            ></el-input>
          ) : (
            <el-tooltip effect="dark" content={data.name} placement="top">
              <span class="custom-tree-node-text">{data.name}</span>
            </el-tooltip>
          )}
        </div>
      );
    },
  },
};
</script>