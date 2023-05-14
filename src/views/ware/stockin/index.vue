<template>
  <div class="app-container">
    <div class="table-container">
      <el-table
        :data="list"
        style="width: 100%"
        v-loading="listLoading"
        :row-key="getRowKeys"
        border
      >
        <!-- <el-table-column
          type="selection"
          width="60"
          align="center"
          :reserve-selection="true"
        ></el-table-column> -->
        <el-table-column
          label="编号"
          width="100"
          align="center"
          fixed="left"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.id }}</template>
        </el-table-column>
        <el-table-column
          label="仓库"
          width="120"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.wname }}</template>
        </el-table-column>

        <el-table-column
          label="商品编码"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.gid }}</template>
        </el-table-column>

        <el-table-column
          label="商品数量"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.num }}</template>
        </el-table-column>

        <el-table-column
          label="商品名称"
          align="center"
          :show-overflow-tooltip="true"
        >
          <template slot-scope="scope">{{ scope.row.name }}</template>
        </el-table-column>
        <el-table-column label="状态" align="center">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.status == 0">审批中</el-tag>
            <el-tag type="info" v-if="scope.row.status == 1">审批通过</el-tag>
            <el-tag type="wanring" v-if="scope.row.status == 2"
              >拒绝通过</el-tag
            >
          </template>
        </el-table-column>
        <el-table-column label="操作" width="160" align="center" fixed="right">
          <template slot-scope="scope">
            <p>
              <el-button
                size="mini"
                :disabled="!scope.row.status == 0"
                @click="handleApprove(scope.$index, scope.row, 1)"
                >同意
              </el-button>
              <el-button
                size="mini"
                type="danger"
                :disabled="!scope.row.status == 0"
                @click="handleApprove(scope.$index, scope.row, 2)"
                >拒绝
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
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
  </div>
</template>

<script>
import { Message } from "element-ui";
import { fetchList, examineAndApprove } from "@/api/ware_stockin";
export default {
  data() {
    return {
      visible: false,
      listQuery: {
        page: 1,
        limit: 5,
      },
      total: null,
      listLoading: true,
      list: [],
      approve: {
        id: null,
        status: null,
      },
    };
  },
  methods: {
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery, 1).then((response) => {
        this.listLoading = false;
        this.list = response.data.list;
        this.total = response.data.totalCount;
      });
    },
    getRowKeys(row) {
      return row.id;
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
    handleApprove(index, row, status) {
      this.approve.id = row.id;
      this.approve.status = status;
      examineAndApprove(this.approve).then(() => {
        Message({
          message: "成功",
          type: "success",
          duration: 3 * 1000,
        });
        this.getList();
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