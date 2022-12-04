<template>
  <div>
    <my-tree
      :data="deptList"
      @getId="getTreeId"
      class="tree-position"
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
            <el-form-item label="关键字：">
              <el-input
                style="width: 203px"
                v-model="listQuery.key"
                placeholder="参数名"
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
          添加部门
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
                <el-checkbox v-model="showColumn.pid">父级部门ID</el-checkbox>
                <el-checkbox v-model="showColumn.name">部门名称</el-checkbox>
                <el-checkbox v-model="showColumn.remark">部门备注</el-checkbox>
                <el-checkbox v-model="showColumn.address">部门地址</el-checkbox>
                <el-checkbox v-model="showColumn.orderNum">排序</el-checkbox>
                <el-checkbox v-model="showColumn.createTime"
                  >部门创建时间</el-checkbox
                >
                <el-checkbox v-model="showColumn.status">状态</el-checkbox>
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
            label="父级部门ID"
            width="120"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.pid }}</template>
          </el-table-column>
          <el-table-column
            v-if="showColumn.name"
            label="部门名称"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.name }}</template>
          </el-table-column>
          <el-table-column
            v-if="showColumn.remark"
            label="部门备注"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.remark }}</template>
          </el-table-column>
          <el-table-column
            v-if="showColumn.address"
            label="部门地址"
            align="center"
            :show-overflow-tooltip="true"
          >
            <template slot-scope="scope">{{ scope.row.address }}</template>
          </el-table-column>
          <el-table-column
            width="100"
            v-if="showColumn.orderNum"
            label="排序"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.ordernum }}</template>
          </el-table-column>
          <el-table-column
            width="100"
            v-if="showColumn.createTime"
            label="部门创建时间"
            align="center"
          >
            <template slot-scope="scope">{{ scope.row.createtime }}</template>
          </el-table-column>
          <el-table-column
            v-if="showColumn.status"
            label="是否可用"
            width="120"
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
        <el-form :model="dept" label-width="150px" size="small">
          <el-form-item label="父级部门ID：">
            <el-input
              v-model="dept.pid"
              style="width: 250px"
              placeholder="请输入父级部门ID"
            ></el-input>
          </el-form-item>

          <el-form-item label="部门名称：">
            <el-input
              v-model="dept.name"
              style="width: 250px"
              placeholder="请输入部门名称"
            ></el-input>
          </el-form-item>

          <el-form-item label="部门备注：">
            <el-input
              v-model="dept.remark"
              style="width: 250px"
              placeholder="请输入部门备注"
            ></el-input>
          </el-form-item>

          <el-form-item label="部门地址：">
            <el-input
              v-model="dept.address"
              style="width: 250px"
              placeholder="请输入部门地址"
            ></el-input>
          </el-form-item>

          <el-form-item label="排序：">
            <el-input
              v-model="dept.ordernum"
              style="width: 250px"
              placeholder="排序"
            ></el-input>
          </el-form-item>
          <el-form-item label="是否启用：">
            <el-radio-group v-model="dept.available">
              <el-radio :label="1">是</el-radio>
              <el-radio :label="0">否</el-radio>
            </el-radio-group>
          </el-form-item>
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
import { Message } from "element-ui";
import {
  fetchList,
  deleteDept,
  updateDept,
  addDept,
  updateStatus,
  getList as getDeptList,
} from "@/api/system_dept";
import tree from "@/utils/tree";
import myTree from "@/components/tree";
const defaultDept = {
  id: null,
  pid: null,
  name: null,
  remark: null,
  address: null,
  ordernum: null,
  createTime: null,
  status: null,
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
        id: "",
      },
      showColumn: {
        // 列状态：显示（true） / 隐藏（false）
        id: true,
        pid: true,
        name: true,
        remark: true,
        address: true,
        orderNum: true,
        createTime: true,
        status: true,
      },
      operates: [
        {
          label: "批量删除",
          value: "batchDelete",
        },
      ],
      operateType: null,
      total: null,
      listLoading: true,
      list: [],
      dialogVisible: false,
      isEdit: false,
      multipleSelection: [],
      deptList: [],
      dept: Object.assign({}, defaultDept),
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.totalCount;
      });
    },
    getRowKeys(row) {
      return row.id;
    },
    handleSearchList() {
      this.getList();
    },
    handleResetSearch() {
      this.listQuery.status = null;
      this.listQuery.key = null;
      this.listQuery.id = null;
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.dept = Object.assign({}, defaultDept);
    },
    resetList() {
      // 重置展示列
      for (let item in this.showColumn) {
        this.showColumn[item] = true;
      }
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.dept = row;
    },
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.removeDept(ids);
      });
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
          message: "请选择要操作的对象",
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
            this.removeDept(ids);
            break;
          default:
            break;
        }
        this.getList();
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
    handleDialogConfirm() {
      if (this.isEdit) {
        updateDept(this.dept).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        addDept(this.dept).then(() => {
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
    removeDept(ids) {
      deleteDept(ids).then(() => {
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
    getDept() {
      getDeptList().then((response) => {
        this.deptList = tree.formatRouter.treeData(response.data);
      });
    },
    handleNodeClick(data) {
      console.log(data);
    },
    getTreeId(val) {
      this.listLoading = true;
      this.listQuery.id = val;
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.totalCount;
      });
    },
  },
  created() {
    this.getList();
    this.getDept();
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
</style>