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
          <el-form-item label="状态：">
            <el-select v-model="listQuery.status" placeholder="请选择状态">
              <template>
                <el-option
                  v-for="item in statusTag"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
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
        添加采购单
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
              <el-checkbox v-model="showColumn.purchaseId"
                >采购人ID</el-checkbox
              >
              <el-checkbox v-model="showColumn.purchaseName"
                >采购人姓名</el-checkbox
              >
              <el-checkbox v-model="showColumn.phone">联系人电话</el-checkbox>
              <el-checkbox v-model="showColumn.amount">总金额</el-checkbox>
              <el-checkbox v-model="showColumn.createTime"
                >创建时间</el-checkbox
              >
              <el-checkbox v-model="showColumn.updateTime"
                >更新时间</el-checkbox
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
          v-if="showColumn.purchaseId"
          label="采购人ID"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.assigneeId }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.purchaseName"
          label="采购人姓名"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.assigneeName }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.phone"
          label="联系人电话"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.amount"
          label="总金额"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.amount }}</template>
        </el-table-column>
        <el-table-column
          width="100"
          v-if="showColumn.createTime"
          label="创建时间"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.createTime }}</template>
        </el-table-column>
        <el-table-column
          width="100"
          v-if="showColumn.updateTime"
          label="更新时间"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.updateTime }}</template>
        </el-table-column>
        <el-table-column v-if="showColumn.status" label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0">新建</el-tag>
            <el-tag type="info" v-if="scope.row.status == 1">已分配</el-tag>
            <el-tag type="wanring" v-if="scope.row.status == 2">已领取</el-tag>
            <el-tag type="success" v-if="scope.row.status == 3">已完成</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 4">有异常</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)"
                :disabled="!(scope.row.status == 0 || scope.row.status == 1)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="scope.row.status == 2"
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
      <el-form :model="purchase" label-width="150px" size="small">
        <el-form-item label="采购人：">
          <el-select
            v-model="purchase.assigneeId"
            placeholder="请选择采购人"
            clearable
          >
            <template>
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              >
                <span style="float: left">|采购人ID：{{ item.id }}|</span>
                <span style="float: right; color: #8492a6; font-size: 13px"
                  >{{ item.name }}:{{ item.phone }}</span
                >
              </el-option>
            </template>
          </el-select>
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
import { Message } from "element-ui";
import {
  fetchList,
  deletePurchase,
  updatePurchase,
  addPurchase,
} from "@/api/ware_purchase";
import { fetchListAll as fetchListUser } from "@/api/user";
const defaultPurchase = {};
export default {
  data() {
    return {
      visible: false,
      listQuery: {
        status: "",
        key: "",
        page: 1,
        limit: 5,
      },
      showColumn: {
        // 列状态：显示（true） / 隐藏（false）
        id: true,
        purchaseId: true,
        purchaseName: true,
        phone: true,
        amount: true,
        createTime: true,
        updateTime: true,
        status: true,
      },
      statusTag: [
        {
          id: 0,
          name: "新建",
          type: "primary",
        },
        {
          id: 1,
          name: "已分配",
          type: "warning",
        },
        {
          id: 2,
          name: "已领取",
          type: "info",
        },
        {
          id: 3,
          name: "已完成",
          type: "success",
        },
        {
          id: 4,
          name: "有异常",
          type: "danger",
        },
      ],
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
      purchase: Object.assign({}, defaultPurchase),
      dialogVisible: false,
      isEdit: false,
      multipleSelection: [],
      userList: [],
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
      this.getList();
    },
    handleAdd() {
      this.getUser();
      this.dialogVisible = true;
      this.isEdit = false;
      this.purchase = Object.assign({}, defaultPurchase);
    },
    resetList() {
      // 重置展示列
      for (let item in this.showColumn) {
        this.showColumn[item] = true;
      }
    },
    handleUpdate(index, row) {
      this.getUser();
      this.dialogVisible = true;
      this.isEdit = true;
      this.purchase = row;
    },
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.removePurchase(ids);
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
            this.removePurchase(ids);
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
        updatePurchase(this.purchase).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        addPurchase(this.purchase).then(() => {
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
    removePurchase(ids) {
      deletePurchase(ids).then(() => {
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
    getUser() {
      fetchListUser().then((response) => {
        this.userList = response.data;
      });
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style>
</style>