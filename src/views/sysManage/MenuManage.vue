<!--
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 16:20:03
 * @Description: 
-->
<script setup>
import { config } from "@/config";
import { ref } from "vue";
import useTable from "../../hooks/useTable";
import { getMenusList } from "@/api/sysManage/menuManage";
const { searchData, tableData, onReset, onSearch } = useTable(getMenusList);

const expand = ref(false);
const expandRow = ref([]);

const onAdd = () => {};
const onEdit = () => {};
</script>
<template>
  <div class="page-container">
    <el-card>
      <el-form :inline="true" @submit.native.prevent :model="searchData" :size="config.ELEMENT_PLUS.SIZE">
        <el-form-item label="菜单名称">
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
        <el-button type="primary" :size="config.ELEMENT_PLUS.SIZE" @click="onAdd()">新增菜单</el-button>
      </div>
      <div class="page-content-table">
        <el-table
          :data="tableData"
          ref="contentTable"
          row-key="menu_id"
          :default-expand-all="expand"
          :size="config.ELEMENT_PLUS.SIZE"
          :expand-row-keys="expandRow"
          :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          height="100%"
        >
          <el-table-column :show-overflow-tooltip="true" label="菜单名称" prop="name" />
          <el-table-column label="图标" align="center">
            <!-- <template #default="scope">
              <i :class="scope.row.icon"></i>
            </template> -->
          </el-table-column>
          <el-table-column label="排序" prop="sort" align="center"></el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="url" label="路由地址" />
          <el-table-column :show-overflow-tooltip="true" label="权限标识">
            <template #default="scope">
              {{ scope.row.permission }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="component_url" label="组件路径" />
          <el-table-column label="类型" align="center" width="100">
            <template #default="scope">
              <el-tag effect="dark" :size="config.ELEMENT_PLUS.SIZE" v-if="scope.row.type == 1">目录</el-tag>
              <el-tag effect="dark" :size="config.ELEMENT_PLUS.SIZE" v-if="scope.row.type == 2">菜单</el-tag>
              <el-tag effect="dark" :size="config.ELEMENT_PLUS.SIZE" v-if="scope.row.type == 3">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="缓存" align="center" width="100">
            <template #default="scope">
              <el-tag effect="dark" :size="config.ELEMENT_PLUS.SIZE" v-if="scope.row.keepAlive">是</el-tag>
              <el-tag effect="plain" :size="config.ELEMENT_PLUS.SIZE" v-else>否</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="可见" align="center" width="100">
            <template #default="scope">
              <el-tag effect="dark" :size="config.ELEMENT_PLUS.SIZE" v-if="!scope.row.hidden">是</el-tag>
              <el-tag effect="plain" :size="config.ELEMENT_PLUS.SIZE" v-else>否</el-tag>
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
