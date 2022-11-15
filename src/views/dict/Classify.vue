<!--
 * @Author: shaolong
 * @Date: 2022-11-15 17:50:22
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 17:53:58
 * @Description: 字典分类
-->
<script setup>
import { config } from "@/config";
import { ref } from "vue";
import useTable from "../../hooks/useTable";
const { searchData, tableData, onReset, onSearch } = useTable();

const expand = ref(false);
const expandRow = ref([]);

const onAdd = () => {};
const onEdit = () => {};
</script>
<template>
  <div class="page-container">
    <el-card>
      <el-form :inline="true" @submit.native.prevent :model="searchData" :size="config.ELEMENT_PLUS.SIZE">
        <el-form-item label="分类名称">
          <el-input v-model="searchData.name" placeholder="请输入" clearable :size="config.ELEMENT_PLUS.SIZE"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()" :size="config.ELEMENT_PLUS.SIZE">查询</el-button>
          <el-button :size="config.ELEMENT_PLUS.SIZE" @click="onReset">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="page-content">
      <div class="page-content-btns">
        <el-button type="primary" :size="config.ELEMENT_PLUS.SIZE" @click="onAdd()">新增分类</el-button>
      </div>
      <div class="page-content-table">
        <el-table :data="tableData" ref="contentTable" row-key="user_id" :size="config.ELEMENT_PLUS.SIZE" height="100%">
          <el-table-column :show-overflow-tooltip="true" label="分类名称" prop="name" />
          <el-table-column label="备注" prop="company" align="center"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" label="状态">
            <template #default="scope">
              {{ scope.row.status }}
            </template>
          </el-table-column>
          <el-table-column label="操作" width="300px" align="center" fixed="right">
            <template #default="scope">
              <el-button :size="config.ELEMENT_PLUS.SIZE" @click="onAdd(scope.row)" type="primary">查看</el-button>
              <el-button class="m10" :size="config.ELEMENT_PLUS.SIZE" @click="onEdit(scope.row)">修改</el-button>
              <el-button class="m10" :size="config.ELEMENT_PLUS.SIZE">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
