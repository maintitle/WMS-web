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
          <el-form-item label="客户名称：">
            <el-input
              style="width: 203px"
              v-model="listQuery.customername"
              placeholder="客户名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人名称：">
            <el-input
              style="width: 203px"
              v-model="listQuery.connectionpersion"
              placeholder="联系人名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="联系人电话号码：">
            <el-input
              style="width: 203px"
              v-model="listQuery.phone"
              placeholder="联系人电话号码"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAddProduct()" size="mini">
        添加
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
              <el-checkbox v-model="showColumn.customername"
                >客户名称</el-checkbox
              >
              <el-checkbox v-model="showColumn.address">客户地址</el-checkbox>
              <el-checkbox v-model="showColumn.telephone">客户电话</el-checkbox>
              <el-checkbox v-model="showColumn.zip">邮编</el-checkbox>
              <el-checkbox v-model="showColumn.connectionpersion"
                >联系人</el-checkbox
              >
              <el-checkbox v-model="showColumn.phone">联系电话</el-checkbox>
              <el-checkbox v-model="showColumn.bank">开户银行</el-checkbox>
              <el-checkbox v-model="showColumn.account">银行账号</el-checkbox>
              <el-checkbox v-model="showColumn.email">邮箱</el-checkbox>
              <el-checkbox v-model="showColumn.fax">传真</el-checkbox>
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
        ref="productTable"
        :data="list"
        style="width: 100%"
        @selection-change="handleSelectionChange"
        v-loading="listLoading"
        border
      >
        <el-table-column
          type="selection"
          width="60"
          align="center"
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
          v-if="showColumn.customername"
          label="客户名称"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.customername }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.address"
          label="客户地址"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.address }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.telephone"
          label="客户电话"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.telephone }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.zip"
          label="邮编"
          width="120"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.zip }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.connectionpersion"
          label="联系人"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{
            scope.row.connectionpersion
          }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.phone"
          label="联系电话"
          width="140"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.phone }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.bank"
          label="开户银行"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.bank }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.account"
          label="银行账号"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.account }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.email"
          label="邮箱"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.email }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.fax"
          label="传真"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.fax }}</template>
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
    <!-- <div class="batch-operate-container">
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
    </div> -->
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
      <el-form :model="admin" ref="adminForm" label-width="150px" size="small">
        <el-form-item label="客户名称：">
          <el-input v-model="admin.username" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="客户地址：">
          <el-input v-model="admin.nickName" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="客户电话：">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮编">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="联系人">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="联系人电话">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="开户银行">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="银行账号">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="	传真">
          <el-input v-model="admin.email" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="是否启用：">
          <el-radio-group v-model="admin.status">
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
  </div>
</template>

<script>
import { fetchList, deleteCustomer } from "@/api/base_customer";
import { Message } from "element-ui";
export default {
  data() {
    return {
      visible: false,
      listQuery: {
        customername: "",
        connectionpersion: "",
        phone: "",
        page: 1,
        limit: 5,
      },
      showColumn: {
        // 列状态：显示（true） / 隐藏（false）
        id: true, // 姓名列
        customername: true, // 省份列
        zip: true,
        address: true,
        telephone: true,
        connectionpersion: true,
        phone: true,
        bank: true,
        account: true,
        email: true,
        fax: true,
        available: true,
      },
      total: null,
      listLoading: true,
      list: "",
    };
  },
  methods: {
    resetList() {
      // 重置展示列
      for (let item in this.showColumn) {
        this.showColumn[item] = true;
      }
    },
    getList() {
      this.listLoading = true;
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
      this.listQuery.customername = "";
      this.listQuery.connectionpersion = "";
      this.listQuery.phone = "";
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
        deleteCustomer(ids).then(() => {
          Message({
            message: "删除成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.getList();
        });
      });
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.admin = Object.assign({}, row);
    },
  },
  created() {
    this.getList();
  },
};
</script>

<style scoped>
/* 控制淡入淡出效果 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>