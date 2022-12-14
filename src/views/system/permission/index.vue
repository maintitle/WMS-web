<template>
  <div>
    <my-tree
      :data="menuList"
      @getId="getTreeId"
      class="tree-position"
      :expandList="expandList"
    ></my-tree>
    <div class="app-container container-position">
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
            <el-form-item label="权限名称：">
              <el-input
                style="width: 203px"
                v-model="listQuery.title"
                placeholder="请输入权限名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="权限编码：">
              <el-input
                style="width: 203px"
                v-model="listQuery.percode"
                placeholder="请输入权限编码"
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
                <el-checkbox v-model="showColumn.pid">父级权限ID</el-checkbox>
                <el-checkbox v-model="showColumn.title">权限名称</el-checkbox>
                <el-checkbox v-model="showColumn.percode">权限编码</el-checkbox>
                <el-checkbox v-model="showColumn.ordernum">排序</el-checkbox>
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
            v-if="showColumn.pid"
            label="父级权限ID"
            width="120"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.pid }}</template>
          </el-table-column>
          <el-table-column
            v-if="showColumn.title"
            label="权限名称"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.title }}</template>
          </el-table-column>
          <el-table-column
            v-if="showColumn.percode"
            label="权限编码"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.percode }}</template>
          </el-table-column>
          <el-table-column
            v-if="showColumn.ordernum"
            label="排序"
            width="120"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.ordernum }}</template>
          </el-table-column>
          <el-table-column
            label="操作"
            width="160"
            align="center"
            fixed="right"
          >
            <template slot-scope="scope">
              <p>
                <el-button
                  size="mini"
                  @click="handleUpdate(scope.$index, scope.row)"
                  >编辑
                </el-button>
                <el-button
                  size="mini"
                  type="danger"
                  @click="handleDelete(scope.$index, scope.row)"
                  >删除
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
        <el-form :model="permission" label-width="100px" size="small">
          <el-row>
            <el-col :span="23">
              <el-form-item label="父级权限：">
                <el-cascader
                  v-model="permission.pid"
                  :options="menuList"
                  :props="{
                    expandTrigger: 'hover',
                    label: 'name',
                    value: 'id',
                    emitPath: false,
                  }"
                  :show-all-levels="false"
                  clearable
                  style="width: 100%"
                ></el-cascader>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="权限名称：">
                <el-input
                  v-model="permission.title"
                  style="width: 180px"
                ></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="权限编码：">
                <el-input
                  v-model="permission.percode"
                  style="width: 180px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
          <el-row>
            <el-col :span="12">
              <el-form-item label="排序">
                <el-input
                  v-model="permission.ordernum"
                  style="width: 180px"
                ></el-input>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button @click="dialogVisible = false" size="small"
            >取 消</el-button
          >
          <el-button type="primary" @click="handleDialogConfirm()" size="small"
            >确 定</el-button
          >
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import {
  fetchList,
  deletePermission,
  updatePermission,
  addPermission,
  getMenusList,
} from "@/api/system_permission";
import { Message } from "element-ui";
import myTree from "@/components/tree";
import tree from "@/utils/tree";
const defaultPermission = {
  id: null,
  pid: null,
  type: null,
  percode: null,
  ordernum: null,
};
export default {
  components: { myTree },
  data() {
    return {
      visible: false,
      listQuery: {
        title: "",
        percode: "",
        pid: "",
        page: 1,
        limit: 5,
      },
      showColumn: {
        // 列状态：显示（true） / 隐藏（false）
        id: true,
        pid: true,
        title: true,
        percode: true,
        ordernum: true,
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
      permission: Object.assign({}, defaultPermission),
      dialogVisible: false,
      isEdit: false,
      multipleSelection: [],
      menuList: [],
      expandList: [],
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
      getMenusList().then((response) => {
        this.menuList = tree.formatRouter.treeData(response.data);
        this.expandList.push(1); //展开
      });
    },
    getTreeId(val) {
      this.listLoading = true;
      this.listQuery.pid = val;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.totalCount;
      });
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
      this.listQuery.title = "";
      this.listQuery.percode = "";
      this.listQuery.pid = "";
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
        this.removePermission(ids);
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.permission = row;
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        updatePermission(this.permission).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        addPermission(this.permission).then(() => {
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
      this.permission = Object.assign({}, defaultPermission);
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
            this.removePermission(ids);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    removePermission(cids) {
      deletePermission(cids).then(() => {
        Message({
          message: "删除成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
      });
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
  },
  created() {
    this.getList();
    this.getMenus();
  },
};
</script>

<style scoped>
.container-position {
  padding-top: 20px;
  float: left;
  height: 100%;
  width: 76%;
}
.tree-position {
  float: left;
  width: 20%;
}
::v-deep .el-dialog {
  height: 40%;
}
</style>