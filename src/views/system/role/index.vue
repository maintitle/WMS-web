<template>
  <div class="app-container">
    <el-card class="filter-container" shadow="never">
      <div>
        <i class="el-icon-search" style="margin-right: 5px"></i>
        <span>筛选搜索</span>
        <el-button
          style="float: right"
          @click="handleSearchList()"
          type="primary"
          size="small"
        >
          查询结果
        </el-button>
        <el-button
          style="float: right; margin-right: 15px"
          @click="handleResetSearch()"
          size="small"
        >
          重置
        </el-button>
      </div>
      <div style="margin-top: 15px">
        <el-form
          :inline="true"
          :model="listQuery"
          size="small"
          label-width="140px"
        >
          <el-form-item label="角色名称：">
            <el-input
              style="width: 203px"
              v-model="listQuery.key"
              placeholder="请输入角色名称"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button
        class="btn-refresh"
        circle
        icon="el-icon-refresh"
        @click="getList()"
      ></el-button>
      <el-button class="btn-add" @click="handleAdd()" size="mini">
        添加权限
      </el-button>
      <!-- 配置列面板 -->
      <el-popover
        placement="bottom"
        :width="600"
        :visible="visible"
        style="float: right"
      >
        <!-- 配置列面板 -->
        <transition name="fade">
          <div>
            <div>选择显示字段</div>
            <div>
              <el-checkbox v-model="showColumn.id" disabled>编号</el-checkbox>
              <el-checkbox v-model="showColumn.name">角色名称</el-checkbox>
              <el-checkbox v-model="showColumn.remark">角色备注</el-checkbox>
              <el-checkbox v-model="showColumn.createTime"
                >创建时间</el-checkbox
              >
              <el-checkbox v-model="showColumn.available">是否可用</el-checkbox>
            </div>
          </div>
        </transition>
        <div style="text-align: right; margin: 0">
          <el-button size="small" icon="el-icon-refresh" @click="resetList()"
            >重置展示列</el-button
          >
        </div>
        <template #reference>
          <i style="font-size: 22px; cursor: pointer" @click="visible = true"
            ><el-button size="mini">选择显示字段</el-button></i
          >
        </template>
      </el-popover>
    </el-card>
    <div class="table-container">
      <el-table
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
        :row-key="getRowKeys"
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
          :reserve-selection="true"
        ></el-table-column>
        <el-table-column
          v-if="showColumn.id"
          label="编号"
          width="100"
          align="center"
          fixed="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.name"
          label="角色名称"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.remark"
          label="角色备注"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.remark }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.createTime"
          label="创建时间"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.available"
          label="是否可用"
          width="140"
          align="center"
        >
          <template slot-scope="scope">
            <el-switch
              @change="handleShowStatusChange(scope.$index, scope.row)"
              :active-value="1"
              :inactive-value="0"
              v-model="scope.row.available"
            >
            </el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="240" align="center" fixed="right">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                type="success"
                @click="handleUpdate(scope.$index, scope.row)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                >删除
              </el-button>
              <el-button
                size="mini"
                type="warning"
                @click="handleAuthority(scope.$index, scope.row)"
                >分配权限
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <el-select size="small" v-model="operateType" placeholder="批量操作">
        <el-option
          v-for="item in operates"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        >
        </el-option>
      </el-select>
      <el-button
        style="margin-left: 20px"
        class="search-button"
        @click="handleBatchOperate()"
        type="primary"
        size="small"
      >
        确定
      </el-button>
    </div>
    <div class="pagination-container">
      <el-pagination
        background
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        layout="total, sizes,prev, pager, next,jumper"
        :page-size="listQuery.limit"
        :page-sizes="[5, 10, 15]"
        :current-page.sync="listQuery.page"
        :total="total"
      >
      </el-pagination>
    </div>
    <el-dialog
      :title="isEdit ? '编辑' : '添加'"
      :visible.sync="dialogVisible"
      width="40%"
    >
      <el-form :model="role" label-width="150px" size="small">
        <el-form-item label="角色名称：">
          <el-input v-model="role.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="角色备注：">
          <el-input v-model="role.remark" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="role.available">
            <el-radio :label="1">是</el-radio>
            <el-radio :label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      :title="'分配权限'"
      :visible.sync="dialogAuthorityVisible"
      width="40%"
    >
      <my-tree :data="menuList" :isCheckbox="true" :expandList="expandList" ref="treeNode"></my-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAuthorityVisible = false" size="small"
          >取 消</el-button
        >
        <el-button
          type="primary"
          @click="handleDialogAuthorityConfirm()"
          size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  fetchList,
  deleteRole,
  updateRole,
  addRole,
  updateStatus,
  getRoleRelationPermission,
  setRoleRelationPermission,
} from "@/api/system_role";
import { getAllList } from "@/api/system_permission";
import { Message } from "element-ui";
import myTree from "@/components/tree";
import tree from "@/utils/tree";
const defaultRole = {
  id: null,
  name: null,
  remark: null,
  createTime: null,
  available: null,
};
export default {
  components: { myTree },
  data() {
    return {
      visible: false,
      listQuery: {
        key: "",
        page: 1,
        limit: 5,
      },
      showColumn: {
        // 列状态：显示（true） / 隐藏（false）
        id: true,
        name: true,
        remark: true,
        createTime: true,
        available: false,
      },
      operates: [
        {
          label: "批量删除",
          value: "batchDelete",
        },
        {
          label: "激活",
          value: "batchStatusActive",
        },
        {
          label: "冻结",
          value: "batchStatusDeActive",
        },
      ],
      operateType: null,
      total: null,
      listLoading: true,
      list: [],
      role: Object.assign({}, defaultRole),
      dialogVisible: false,
      dialogAuthorityVisible: false,
      isEdit: false,
      multipleSelection: [],
      menuList: [],
      rid: "",
      expandList: []
    };
  },
  methods: {
    resetList() {
      // 重置展示列
      for (let item in this.showColumn) {
        this.showColumn[item] = true;
      }
    },
    getRowKeys(row) {
      return row.id;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.totalCount;
      });
    },
    getMenus() {
      getAllList().then((response) => {
        this.menuList = tree.formatRouter.treeData(response.data);
        // response.data.forEach(row=>{
        //   if(row.type=="menu"){
        //     this.expandList.push(row.id)
        //   }
        // })
        this.expandList.push(1)//展开
        console.log("exp:",this.expandList)
      });
    },
    getTreeNode(val) {
      // console.log(val);
    },
    handleSizeChange(val) {
      this.listQuery.page = 1;
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleSearchList() {
      this.getList();
    },
    handleResetSearch() {
      this.listQuery.key = "";
      this.getList();
    },
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.removeRole(ids);
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.role = row;
    },
    handleAuthority(index, row) {
      this.getMenus();
      this.rid = row.id;
      getRoleRelationPermission(this.rid).then((response) => {
        this.$refs.treeNode.setKeys(response.data);
      });
      this.dialogAuthorityVisible = true;
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        updateRole(this.role).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        addRole(this.role).then(() => {
          Message({
            message: "添加成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      }
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.role = Object.assign({}, defaultRole);
    },
    handleBatchOperate() {
      if (this.operateType == null) {
        this.$message({
          message: "请选择操作类型",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      if (this.multipleSelection == null || this.multipleSelection.length < 1) {
        this.$message({
          message: "请选择要操作的客户",
          type: "warning",
          duration: 1000,
        });
        return;
      }
      this.$confirm("是否要进行该批量操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          ids.push(this.multipleSelection[i].id);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.removeRole(ids);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    removeRole(ids) {
      deleteRole(ids).then(() => {
        Message({
          message: "删除成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
      });
    },
    updateRoleStatus(ids, status) {
      updateStatus(ids, status).then(() => {
        Message({
          message: "更新成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
      });
    },
    handleShowStatusChange(index, row) {
      let ids = [];
      ids.push(row.id);
      this.updateRoleStatus(ids, row.available);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleDialogAuthorityConfirm() {
      setRoleRelationPermission(
        this.rid,
        this.$refs.treeNode.getNodeKey()
      ).then(() => {
        // this.handleAuthority();
        Message({
          message: "更新成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
        this.dialogAuthorityVisible = false;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
</style>