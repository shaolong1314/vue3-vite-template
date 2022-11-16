<!--
 * @Author: shaolong
 * @Date: 2022-11-15 17:50:22
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-16 10:19:32
 * @Description: 字典分类
-->
<script setup>
import { config } from "@/config";
import useTable from "../../hooks/useTable";
import { getDictClassifyList } from "@/api/dict";
import { ref } from "vue";
const { searchData, tableData, onReset, onSearch } = useTable(getDictClassifyList);

const onAdd = () => {};
const onEdit = () => {};

const isShowDialog = ref(false);

const form = reactive({
  classifyName: "",
  remark: ""
});
</script>
<template>
  <div class="page-container">
    <el-card>
      <el-form :inline="true" @submit.native.prevent :model="searchData" :size="config.ELEMENT_PLUS.SIZE">
        <el-form-item label="分类名称">
          <el-input v-model="searchData.dictClassifyName" placeholder="请输入" clearable :size="config.ELEMENT_PLUS.SIZE"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSearch()" :size="config.ELEMENT_PLUS.SIZE">查询</el-button>
          <el-button :size="config.ELEMENT_PLUS.SIZE" @click="onReset">刷新</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <div class="page-content">
      <div class="page-content-btns">
        <el-button type="primary" :size="config.ELEMENT_PLUS.SIZE" @click="isShowDialog = true">新增分类</el-button>
      </div>
      <div class="page-content-table">
        <el-table :data="tableData" ref="contentTable" row-key="id" :size="config.ELEMENT_PLUS.SIZE" height="100%">
          <el-table-column label="分类名称" prop="dictClassifyName" />
          <el-table-column label="分类Key" prop="dictClassifyKey" />
          <el-table-column label="备注" prop="remark" align="center"></el-table-column>
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

    <!-- 新建字典分类弹窗 -->
    <el-dialog v-model="isShowDialog" :show-close="false" destroy-on-close width="30%">
      <template #header>
        <div class="dialog-header">新增分类</div>
      </template>
      <el-form :model="form" label-width="80px">
        <el-form-item label="分类名称">
          <el-input v-model="form.name" />
        </el-form-item>
        <el-form-item label="分类Key">
          <el-input v-model="form.key" />
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.remark" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="isShowDialog = false">Cancel</el-button>
          <el-button type="primary" @click="isShowDialog = false">Confirm</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style lang="scss"></style>
