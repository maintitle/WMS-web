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
          <!-- <el-form-item label="所属部门：">
            <el-cascader
              v-model="listQuery.deptid"
              :options="deptList"
              :props="{
                expandTrigger: 'hover',
                label: 'name',
                value: 'id',
                emitPath: false,
              }"
              :show-all-levels="false"
              clearable
            ></el-cascader>
          </el-form-item> -->
          <el-form-item label="用户名：">
            <el-input
              style="width: 203px"
              v-model="listQuery.key"
              placeholder="请输入用户名"
            ></el-input>
          </el-form-item>

          <el-form-item label="用户地址：">
            <el-input
              style="width: 203px"
              v-model="listQuery.address"
              placeholder="请输入用户地址"
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
        添加用户
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
              <el-checkbox v-model="showColumn.name">用户昵称</el-checkbox>
              <el-checkbox v-model="showColumn.loginname">登入名称</el-checkbox>
              <el-checkbox v-model="showColumn.phone">电话</el-checkbox>
              <el-checkbox v-model="showColumn.sex">性别</el-checkbox>
              <el-checkbox v-model="showColumn.deptid">所属部门</el-checkbox>
              <el-checkbox v-model="showColumn.ordernum">排序码</el-checkbox>
              <el-checkbox v-model="showColumn.role">角色</el-checkbox>
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
          label="用户昵称"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.loginname"
          label="登入名称"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.loginname }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.phone"
          label="电话"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.sex"
          label="性别"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{
            scope.row.sex == 1 ? "男" : "女"
          }}</template>
        </el-table-column>

        <el-table-column
          v-if="showColumn.deptid"
          label="所属部门"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{
            getDeptName(scope.row.deptid)
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.role"
          label="角色"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{
            getRoleName(scope.row.role)
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.ordernum"
          label="排序码"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.ordernum }}</template>
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
        <el-table-column label="操作" width="160" align="center" fixed="right">
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
      <el-form :model="user" label-width="150px" size="small">
        <el-form-item label="登入名称："><el-input :disabled="isEdit" v-model="user.loginname" style="width: 250px"></el-input></el-form-item>
        <el-form-item label="用户昵称：">
          <el-input v-model="user.name" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="电话：">
          <el-input v-model="user.phone" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="用户地址：">
          <el-input v-model="user.address" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="性别：">
          <el-radio-group v-model="user.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <!-- <el-form-item label="所属部门：">
          <el-input v-model="user.deptid" style="width: 250px"></el-input>
        </el-form-item> -->
        <el-form-item label="角色：" v-if="isEdit" >
          <el-select
            v-model="user.role"
            multiple
            collapse-tags
            placeholder="请选择"
          >
            <el-option
              v-for="item in role"
              :key="item.value"
              :label="item.name"
              :value="item.id"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <!-- <el-form-item label="上级领导：">
          <el-input v-model="user.mgr" style="width: 250px"></el-input>
        </el-form-item> -->

        <el-form-item label="入职时间：">
          <el-date-picker
            v-model="user.hiredate"
            type="date"
            placeholder="选择日期"
            value-format="yyyy-MM-dd HH:mm:ss"
          >
          </el-date-picker>
        </el-form-item>
        <!-- <el-form-item label="用户类型：">
          <el-input v-model="user.type" style="width: 250px"></el-input>
        </el-form-item> -->
        <el-form-item label="排序码：">
          <el-input v-model="user.ordernum" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="用户备注：">
          <el-input
            type="textarea"
            maxlength="50"
            show-word-limit
            v-model="user.remark"
            style="width: 250px"
          ></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import {
  getUserInfo,
  fetchList,
  deleteUser,
  updateUser,
  addUser,
  updateStatus,
} from "@/api/system_user";
import tree from "@/utils/tree";
import { getList as getDeptList } from "@/api/system_dept";
import { getIdAndNameList as getRoleNameList } from "@/api/system_role";
import { Message } from "element-ui";
const defaultUser = {
  id: null,
  name: null,
  loginname: null,
  phone: null,
  sex: null,
  deptid: null,
  ordernum: null,
  role: null,
  available: null,
};

export default {
  data() {
    return {
      visible: false,
      listQuery: {
        key: "",
        deptid: "",
        address: "",
        page: 1,
        limit: 5,
      },
      showColumn: {
        // 列状态：显示（true） / 隐藏（false）
        id: true,
        name: true,
        loginname: true,
        phone: true,
        sex: true,
        deptid: false,
        ordernum: true,
        available: true,
        role: true,
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
      user: Object.assign({}, defaultUser),
      dialogVisible: false,
      isEdit: false,
      multipleSelection: [],
      deptList: [],
      dept: [],
      role: [],
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
    getDept() {
      getDeptList().then((response) => {
        this.dept = response.data;
        this.deptList = tree.formatRouter.treeData(response.data);
      });
    },
    getRole() {
      getRoleNameList().then((response) => {
        this.role = response.data;
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
      this.listQuery.key = "";
      this.listQuery.deptid = "";
      this.listQuery.address = "";
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
        this.removeUser(ids);
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.isEdit & this.dialogVisible;
      getUserInfo(row.id).then((response) => {
        this.user = response.data;
      });
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        updateUser(this.user).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        addUser(this.user).then(() => {
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
      this.user = Object.assign({}, defaultUser);
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
            this.removeUser(ids);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    removeUser(ids) {
      deleteUser(ids).then(() => {
        Message({
          message: "删除成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
      });
    },
    updateUserStatus(ids, status) {
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
      this.updateUserStatus(ids, row.available);
    },
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //获取部门名称
    getDeptName(key) {
      for (var i = 0; this.dept.length; i++) {
        if (this.dept[i].id == key) {
          return this.dept[i].name;
        } else {
          return null;
        }
      }
    },
    getRoleName(key) {
      return key
        ?.map((item) => {
          var r = this.role.filter((i) => i.id == item);
          if (r != undefined && r != null && r.length > 0) {
            return r[0].name;
          }
        })
        .join(",");
    },
  },
  created() {
    this.getList();
    this.getDept();
    this.getRole();
  },
};
</script>

<style scoped>
</style>