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
          <el-form-item label="供应商：">
            <el-select
              v-model="listQuery.providerid"
              placeholder="请选择供应商"
            >
              <template>
                <el-option
                  v-for="item in product"
                  :key="item.producterid"
                  :label="item.productername"
                  :value="item.producterid"
                ></el-option>
              </template>
            </el-select>
          </el-form-item>
          <el-form-item label="商品名称：">
            <el-input
              style="width: 203px"
              v-model="listQuery.goodsname"
              placeholder="请输入商品名称"
            ></el-input>
          </el-form-item>
          <el-form-item label="生产批号：">
            <el-input
              style="width: 203px"
              v-model="listQuery.productcode"
              placeholder="请输入生产批号"
            ></el-input>
          </el-form-item>
          <el-form-item label="批准文号：">
            <el-input
              style="width: 203px"
              v-model="listQuery.promitcode"
              placeholder="请输入批准文号"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
    </el-card>

    <el-card class="operate-container" shadow="never">
      <i class="el-icon-tickets"></i>
      <span>数据列表</span>
      <el-button class="btn-add" @click="handleAdd()" size="mini">
        添加商品
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
              <el-checkbox v-model="showColumn.goodsname">商品名称</el-checkbox>
              <el-checkbox v-model="showColumn.providername"
                >供应商</el-checkbox
              >
              <el-checkbox v-model="showColumn.produceplace"
                >商品产地</el-checkbox
              >
              <el-checkbox v-model="showColumn.description"
                >商品描述</el-checkbox
              >
              <el-checkbox v-model="showColumn.goodsimg">商品图片</el-checkbox>
              <el-checkbox v-model="showColumn.goodspackage">规格</el-checkbox>
              <el-checkbox v-model="showColumn.size">包装</el-checkbox>
              <el-checkbox v-model="showColumn.productcode"
                >生产批号</el-checkbox
              >
              <el-checkbox v-model="showColumn.promitcode"
                >批准文号</el-checkbox
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
          v-if="showColumn.goodsname"
          label="商品名称"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.goodsname }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.providername"
          label="供应商"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.providername }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.produceplace"
          label="商品产地"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.produceplace }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.description"
          label="商品描述"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.description }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.goodsimg"
          label="商品图片"
          width="140"
          align="center"
        >
          <template slot-scope="scope"
            ><img style="height: 40px" :src="scope.row.goodsimg"
          /></template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.goodspackage"
          label="规格"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.goodspackage }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.size"
          label="包装"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.size }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.productcode"
          label="生产批号"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.productcode }}</template>
        </el-table-column>
        <el-table-column
          v-if="showColumn.promitcode"
          label="批准文号"
          width="140"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.promitcode }}</template>
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
      <el-form :model="goods" label-width="150px" size="small">
        <el-form-item label="商品名称：">
          <el-input v-model="goods.goodsname" style="width: 250px"></el-input>
        </el-form-item>
        <el-form-item label="供应商：">
          <el-select v-model="goods.providerid" placeholder="请选择供应商">
            <template>
              <el-option
                v-for="item in product"
                :key="item.producterid"
                :label="item.productername"
                :value="item.producterid"
              ></el-option>
            </template>
          </el-select>
        </el-form-item>
        <el-form-item label="商品产地：">
          <el-input
            v-model="goods.produceplace"
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
import { Message } from "element-ui";
const defaultGoods = {
  id: null,
  goodsname: null,
  providerid: null,
  providername: null,
  produceplace: null,
  description: null,
  price: null,
  number: null,
  threshold: null,
  goodsimg: null,
  goodspackage: null,
  size: null,
  productcode: null,
  promitcode: null,
  available: null,
};
export default {
  data() {
    return {
      listQuery: {
        providerid: "",
        goodsname: "",
        productcode: "",
        promitcode: "",
        page: 1,
        limlt: 5,
      },
      showColumn: {
        id: true,
        goodsname: true,
        providername: true,
        produceplace: true,
        description: true,
        goodsimg: true,
        goodspackage: true,
        size: true,
        productcode: true,
        promitcode: true,
        available: true,
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
      dialogVisible: false,
      isEdit: false,
      visible: false,
      product: [],
      listLoading: true,
      list: [],
      total: null,
      goods: Object.assign({}, defaultGoods),
      multipleSelection: [],
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
    getProduct() {
      getProductNameAndId().then((response) => {
        this.product = response.data;
      });
    },
    handleResetSearch() {
      this.listQuery.providerid = "";
      this.listQuery.goodsname = "";
      this.listQuery.productcode = "";
      this.listQuery.promitcode = "";
      this.getList();
    },
    handleSearchList() {
      this.getList();
    },
    handleAdd() {
      this.dialogVisible = true;
      this.isEdit = false;
      this.goods = Object.assign({}, defaultGoods);
    },
    resetList() {
      for (let item in this.showColumn) {
        this.showColumn[item] = true;
      }
    },
    handleUpdate(index, row) {
      this.dialogVisible = true;
      this.isEdit = true;
      this.goods = row;
    },
    handleDialogConfirm() {
      if (this.isEdit) {
        updateGoods(this.goods).then(() => {
          Message({
            message: "更新成功",
            type: "success",
            duration: 3 * 1000,
          });
          this.dialogVisible = false;
          this.getList();
        });
      } else {
        addGoods(this.goods).then(() => {
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
    handleDelete(index, row) {
      this.$confirm("是否要进行删除操作?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        let gids = [];
        gids.push(row.id);
        this.removeGoods(gids);
      });
    },
    removeGoods(gids) {
      deleteGoods(gids).then(() => {
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
        let gids = [];
        for (let i = 0; i < this.multipleSelection.length; i++) {
          gids.push(this.multipleSelection[i].id);
        }
        switch (this.operateType) {
          case this.operates[0].value:
            this.removeGoods(gids);
            break;
          case this.operates[1].value:
            this.updateGoodsStatus(gids, 1);
            break;
          case this.operates[2].value:
            this.updateGoodsStatus(gids, 0);
            break;
          default:
            break;
        }
        this.getList();
      });
    },
    updateGoodsStatus(gids, status) {
      updateStatus(gids, status).then(() => {
        Message({
          message: "更新成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
      });
    },
    handleShowStatusChange(index, row) {
      let gids = [];
      gids.push(row.id);
      this.updateGoodsStatus(gids, row.available);
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
  },
  mounted() {
    this.$on("input", (val) => {
      console.log(val);
    });
  },
  created() {
    this.getList();
    this.getProduct();
  },
};
</script>

<style>

</style>