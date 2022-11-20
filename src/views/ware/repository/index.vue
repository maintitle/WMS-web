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
          <el-form-item label="仓库：">
            <el-select v-model="listQuery.wareId" placeholder="请选择仓库">
              <template>
                <el-option
                  v-for="item in ware"
                  :key="item.wareId"
                  :label="item.wareName"
                  :value="item.wareId"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input
              style="width: 203px"
              v-model="listQuery.key"
              placeholder="请输入商品名称"
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
              <el-checkbox v-model="showColumn.goodsId">商品ID</el-checkbox>
              <el-checkbox v-model="showColumn.goodsName">商品名称</el-checkbox>
              <el-checkbox v-model="showColumn.wareId">仓库ID</el-checkbox>
              <el-checkbox v-model="showColumn.wareName">仓库名</el-checkbox>
              <el-checkbox v-model="showColumn.stock">库存</el-checkbox>
              <el-checkbox v-model="showColumn.threshold">阈值</el-checkbox>
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
          v-if="showColumn.goodsId"
          label="商品ID"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.goodsId }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.goodsName"
          label="商品名称"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.goodsName }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.wareId"
          label="仓库ID"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.wareId }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.wareName"
          label="仓库名"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.wareName }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.stock"
          label="库存"
          width="140"
          align="center"
        >
          <template slot-scope="scope">{{ scope.row.stock }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.threshold"
          label="阈值"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.threshold }}</template>
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
      <el-form :model="repository" label-width="150px" size="small">
        <el-form-item label="阈值：">
          <el-input
            v-model="repository.threshold"
            style="width: 250px"
            placeholder="请输入阈值"
          ></el-input>
        </el-form-item>
        <el-form-item label="仓库：">
          <el-select v-model="repository.wareId" placeholder="请选择仓库">
            <template>
              <el-option
                v-for="item in ware"
                :key="item.wareId"
                :label="item.wareName"
                :value="item.wareId"
              ></el-option>
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
  updateRepository,
  deleteRepository,
} from "@/api/ware_repository";
import { getWareNameAndId } from "@/api/ware_site";
const defaultRepository = {
  id: null,
  goodsId: null,
  goodsName: null,
  wareId: null,
  wareName: null,
  stock: null,
  threshold: null,
};
export default {
  data() {
    return {
      listQuery: {
        wareId: "",
        key: "",
        page: 1,
        limit: 5,
      },
      showColumn: {
        id: true,
        goodsId: true,
        goodsName: true,
        wareId: true,
        wareName: true,
        stock: true,
        threshold: true,
      },
      operates: [
        {
          label: "批量删除",
          value: "batchDelete",
        },
      ],
      operateType: null,
      dialogVisible: false,
      isEdit: false,
      visible: false,
      product: [],
      listLoading: true,
      list: [],
      total: null,
      repository: Object.assign({}, defaultRepository),
      multipleSelection: [],
      ware: [],
    };
  },
  methods: {
    getList() {
      fetchList(this.listQuery).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.totalCount;
      });
    },
    getRowKeys(row) {
      return row.id;
    },
    handleResetSearch() {
      this.listQuery.wareId = "";
      this.listQuery.key = "";
      this.getList();
    },
    handleSearchList() {
      this.getList();
    },
    resetList() {
      for (let item in this.showColumn) {
        this.showColumn[item] = true;
      }
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.repository = row;
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        updateRepository(this.repository).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      }
    },
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.removeRepository(ids);
      });
    },
    removeRepository(ids) {
      deleteRepository(ids).then(() => {
        Message({
          message: "删除成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
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
            this.removeRepository(ids);
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
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    getWareSite() {
      getWareNameAndId().then((response) => {
        this.ware = response.data;
      });
    },
  },
  created() {
    this.getList();
    this.getWareSite();
  },
};
</script>

<style>
</style>