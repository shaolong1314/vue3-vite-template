<script setup>
import useTable from "../../hooks/useTable";
import { getRolesList } from "../../api/sysManage/roleManage";
import { config } from "@/config";

import { ref } from "vue";

// 表单-表格hooks，传入列表接口可获取表格数据，且集搜索以及重置功能
const { pagination, searchData, tableData, sizeChange, currentChange, onReset, onSearch } = useTable(getRolesList);

const currentRole = ref(true);
</script>

<template>
  <div class="page-container">
    <el-card class="page-search">
      <el-form :inline="true" @submit.native.prevent :model="searchData">
        <el-form-item label="角色名称">
          <el-input v-model="searchData.name" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()" :size="config.ELEMENT_PLUS.SIZE">查询</el-button>
          <el-button plain @click="onReset()" :size="config.ELEMENT_PLUS.SIZE">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="page-content">
      <div class="page-content-btns">
        <div>
          <el-button type="primary" :size="config.ELEMENT_PLUS.SIZE">新增</el-button>
        </div>
        <div v-show="currentRole">
          <span style="margin: 0 10px">当前角色: 超级管理员</span>
          <!-- <el-button plain @click="(currentRole = null), $refs.menu.setCheckedKeys([])"> 清空 </el-button> -->
        </div>
      </div>
      <div class="page-content-table">
        <!--角色管理-->
        <div class="box-card box-card_left">
          <div class="box-card_table">
            <el-table :data="tableData" ref="contentTable" height="300">
              <el-table-column label="角色名称" prop="name" />
              <el-table-column :show-overflow-tooltip="true" label="备注" prop="remark" />
              <el-table-column label="创建时间" width="150"></el-table-column>
              <el-table-column label="操作" width="200px" align="center" fixed="right"></el-table-column>
            </el-table>
          </div>
          <!--分页组件-->
          <el-pagination
            background
            :total="pagination.total"
            :current-page="pagination.page"
            layout="total, prev, pager, next, sizes"
            :page-sizes="pagination.sizes"
            :page-size="pagination.pageSize"
            @size-change="sizeChange"
            @current-change="currentChange"
          />
        </div>
        <div class="box-card">
          <div slot="header" class="box-card-premission_header">
            <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
              <span class="role-span">角色权限</span>
            </el-tooltip>
            <div>
              <el-button plain :size="config.ELEMENT_PLUS.SIZE">刷新</el-button>
              <el-button :disabled="!currentRole" type="primary" :size="config.ELEMENT_PLUS.SIZE">保存</el-button>
            </div>
          </div>
          <div></div>
          <!-- <el-tree ref="menu" :data="[]" :default-checked-keys="menuIds" :props="defaultProps" check-strictly accordion show-checkbox node-key="menu_id" /> -->
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-container {
  .page-content {
    .page-content-btns {
      margin-bottom: 10px;
      display: flex;
      justify-content: space-between;
    }

    .page-content-table {
      flex: 1;
      height: 0;
      display: flex;
      .box-card:nth-child(1) {
        width: 60%;
      }
      .box-card:nth-child(2) {
        flex: 1;
        margin-left: 15px;
      }
      .box-card {
        height: 100%;
        border: 1px solid #e4e7ed;
        border-radius: 4px;
        padding: 15px;
        .box-card-premission_header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid #f0f0f0;
          padding-bottom: 10px;
          margin-bottom: 10px;
        }
      }
      .box-card_left {
        display: flex;
        flex-direction: column;
        .box-card_table {
          flex: 1;
          height: 0;
        }
      }
    }
  }
}
</style>
