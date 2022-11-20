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
      <el-button class="btn-refresh"  circle icon="el-icon-refresh" @click="getList()"></el-button>
      <el-button class="btn-add" @click="handleAdd()" size="mini">
        添加采购需求
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
              <el-checkbox v-model="showColumn.purchase">采购单</el-checkbox>
              <el-checkbox v-model="showColumn.goods">商品</el-checkbox>
              <el-checkbox v-model="showColumn.num">采购数量</el-checkbox>
              <el-checkbox v-model="showColumn.price">采购金额</el-checkbox>
              <el-checkbox v-model="showColumn.ware">仓库</el-checkbox>
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
          v-if="showColumn.purchase"
          label="采购单"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.purchaseId }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.goods"
          label="采购商品"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.goodsName }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.num"
          label="采购数量"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.price"
          label="采购金额"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.price }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.ware"
          label="仓库"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.wareName }}</template>
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
            <el-tag type="wanring" v-if="scope.row.status == 2"
              >正在采购</el-tag
            >
            <el-tag type="success" v-if="scope.row.status == 3">已完成</el-tag>
            <el-tag type="danger" v-if="scope.row.status == 4">采购失败</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                @click="handleUpdate(scope.$index, scope.row)"
                :disabled="!(scope.row.status==0||scope.row.status==1)"
                >编辑
              </el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
                :disabled="scope.row.status==2"
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
      <el-form :model="requirement" label-width="150px" size="small">
        <el-form-item
          label="采购单："
          v-if="isEdit && (requirement.status == 0 || requirement.status == 1)">
          <el-select
            v-model="requirement.purchaseId"
            placeholder="请选择采购单"
            clearable
          >
            <template>
              <el-option
                v-for="item in purchasetableData"
                :key="item.id"
                :label="item.id"
                :value="item.id"
              >
                <span style="float: left;" >|采购单ID：{{ item.id }}|</span>
                <span style="float: right; color: #8492a6; font-size: 13px"
                  >采购人员：{{ item.assigneeName }}：{{ item.phone }}</span
                >
              </el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="采购商品：">
          <el-select v-model="requirement.goodsId" placeholder="请选择商品">
            <template>
              <el-option
                v-for="item in goods"
                :key="item.goodsId"
                :label="item.goodsName"
                :value="item.goodsId"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="采购数量：">
          <el-input v-model="requirement.num" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="采购金额：">
          <el-input v-model="requirement.price" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="仓库：">
          <el-select v-model="requirement.wareId" placeholder="请选择仓库">
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

    <el-dialog title="合并到整单" :visible.sync="mergedialogVisible">
      <!-- id  assignee_id  assignee_name  phone   priority status -->
      <el-select v-model="purchaseId" placeholder="请选择" clearable filterable>
        <el-option
          v-for="item in purchasetableData"
          :key="item.id"
          :label="item.id"
          :value="item.id"
        >
          <span style="float: left">{{ item.id }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px"
            >{{ item.assigneeName }}：{{ item.phone }}</span
          >
        </el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="mergedialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="merge()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import { Message } from "element-ui";
import {
  fetchList,
  deleteRequirement,
  updateRequirement,
  addRequirement,
} from "@/api/ware_requirement";
import { getWareNameAndId } from "@/api/ware_site";
import { getGoodsNameAndId } from "@/api/base_goods";
import { getUnreceivedPurchase, mergeRequirement } from "@/api/ware_purchase";
const defaultRequirement = {
  id: null,
  goodsName: null,
  wareName: null,
  purchaseId: null,
  goodsId: null,
  num: null,
  price: null,
  wareId: null,
  status: null,
  createTime: null,
  updateTime: null,
};
export default {
  data() {
    return {
      visible: false,
      listQuery: {
        key: "",
        wareId: "",
        status: "",
        page: 1,
        limit: 5,
      },
      showColumn: {
        // 列状态：显示（true） / 隐藏（false）
        id: true,
        purchase: true,
        goods: true,
        num: true,
        price: true,
        ware: true,
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
          name: "正在采购",
          type: "info",
        },
        {
          id: 3,
          name: "已完成",
          type: "success",
        },
        {
          id: 4,
          name: "采购失败",
          type: "danger",
        },
      ],
      operates: [
        {
          label: "批量删除",
          value: "batchDelete",
        },
        {
          label: "合并整单",
          value: "mergeRequirement",
        },
      ],
      operateType: null,
      total: null,
      listLoading: true,
      list: [],
      ware: [],
      goods: [],
      requirement: Object.assign({}, defaultRequirement),
      dialogVisible: false,
      isEdit: false,
      multipleSelection: [],
      mergedialogVisible: false,
      purchasetableData: [],
      items: [],
      purchaseId: "",
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
      return row.id
    },
    handleSearchList() {
      this.getList();
    },
    handleResetSearch() {
      this.listQuery.key = "";
      this.listQuery.status = "";
      this.listQuery.wareId = "";
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.requirement = Object.assign({}, defaultRequirement);
    },
    resetList() {
      // 重置展示列
      for (let item in this.showColumn) {
        this.showColumn[item] = true;
      }
    },
    handleUpdate(index, row) {
      this.getUnreceivedPurchaseList();
      this.dialogVisible = true;
      this.isEdit = true;
      this.requirement = row;
    },
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let ids = [];
        ids.push(row.id);
        this.removeRequirement(ids);
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
            this.removeRequirement(ids);
            break;
          case this.operates[1].value:
            this.getUnreceivedPurchaseList();
            this.mergedialogVisible = true;
            this.items = ids;
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
        updateRequirement(this.requirement).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        addRequirement(this.requirement).then(() => {
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
    removeRequirement(ids) {
      deleteRequirement(ids).then(() => {
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
    getWare() {
      getWareNameAndId().then((response) => {
        this.ware = response.data;
      });
    },
    getGoods() {
      getGoodsNameAndId().then((response) => {
        this.goods = response.data;
      });
    },
    merge() {
      mergeRequirement(this.items, this.purchaseId).then(() => {
        Message({
          message: "合并成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.mergedialogVisible = false;
        this.getList();
      });
    },
    getUnreceivedPurchaseList() {
      getUnreceivedPurchase().then((response) => {
        this.purchasetableData = response.data;
      });
    },
  },
  created() {
    this.getList();
    this.getWare();
    this.getGoods();
  },
};
</script>

<style>
</style>