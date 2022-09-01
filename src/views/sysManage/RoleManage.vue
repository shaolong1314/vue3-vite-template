<script setup>
import useTable from "../../hooks/useTable";
import { getRolesList } from "../../api/sysManage/roleManage";

import { ref } from "vue";

// 表单-表格hooks，传入列表接口可获取表格数据，且集搜索以及重置功能
const { pagination, searchData, tableData, sizeChange, currentChange, onReset, onSearch } = useTable(getRolesList);

const currentRole = ref(true);
</script>

<template>
  <div class="roleSettings">
    <el-card>
      <el-form :inline="true" @submit.native.prevent :model="searchData">
        <el-form-item label="角色名称">
          <el-input v-model="searchData.name" placeholder="请输入" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()">查询</el-button>
          <el-button plain @click="onReset()">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <div class="content">
      <div class="content-btns" style="display: flex; justify-content: space-between">
        <div>
          <el-button type="primary">新增</el-button>
        </div>
        <div v-show="currentRole">
          <span style="margin: 0 10px">当前角色: 超级管理员</span>
          <!-- <el-button plain @click="(currentRole = null), $refs.menu.setCheckedKeys([])"> 清空 </el-button> -->
        </div>
      </div>
      <div class="content-table">
        <el-row :gutter="15">
          <!--角色管理-->
          <el-col :xs="24" :sm="24" :md="16" :lg="16" :xl="17" style="margin-bottom: 10px">
            <el-card class="box-card" shadow="never">
              <el-table :data="tableData" ref="contentTable" height="500">
                <el-table-column label="角色名称" prop="name" />
                <el-table-column :show-overflow-tooltip="true" label="说明" prop="remark" />
                <el-table-column label="创建时间" width="150"></el-table-column>
                <el-table-column label="操作" width="200px" align="center" fixed="right"></el-table-column>
              </el-table>
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
            </el-card>
          </el-col>
          <!-- 授权 -->
          <el-col :xs="24" :sm="24" :md="8" :lg="8" :xl="7">
            <el-card class="box-card" shadow="never">
              <div slot="header" style="display: flex; justify-content: space-between; align-items: center">
                <el-tooltip class="item" effect="dark" content="选择指定角色分配菜单" placement="top">
                  <span class="role-span">角色权限</span>
                </el-tooltip>
                <div>
                  <el-button plain>刷新</el-button>
                  <el-button :disabled="!currentRole" type="primary">保存</el-button>
                </div>
              </div>
              <!-- <el-tree ref="menu" :data="[]" :default-checked-keys="menuIds" :props="defaultProps" check-strictly accordion show-checkbox node-key="menu_id" /> -->
            </el-card>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.roleSettings {
  .content {
    width: 100%;
    margin: auto;
    box-sizing: border-box;
    padding: 20px;
    margin-top: 10px;
    background-color: #ffffff;
    box-shadow: 0 2px 7px 0 rgba(5, 34, 97, 0.1);
    .content-btns {
      margin-bottom: 10px;
    }
    .pagination {
      text-align: right;
      margin-top: 10px;
    }
  }
}
</style>
