<!--
 * @Author: shaolong
 * @Date: 2022-11-15 17:42:10
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-16 11:43:08
 * @Description: 字典管理
-->
<script setup>
import { config } from "@/config";
import useTable from "../../hooks/useTable";
import { ref } from "vue";
import { getDictClassifyList } from "@/api/dict";

const { searchData, tableData, onReset, onSearch } = useTable();

const onAdd = () => {};
const onEdit = () => {};

const isShowDialog = ref(false);

const form = reactive({
  classifyName: "",
  remark: ""
});

const dictClassifyOptions = ref();
const selectId = ref();
// 获取字典分类
const getDictClassify = () => {
  getDictClassifyList().then((res) => {
    if (res && res.data) {
      dictClassifyOptions.value = res.data;
      selectId.value = res.data[0].id;
    }
  });
};

getDictClassify();

const dictClassifyData = ref();
const onSearchDictClassify = () => {};
const checkoutClassify = (event) => {
  if (event.target && event.target.dataset && event.target.dataset.id) {
    selectId.value = event.target.dataset.id;
  }
};
</script>
<template>
  <div class="page-dict">
    <div class="page-dict-classify">
      <div class="page-dict-classify-search">
        <el-form :inline="true" @submit.native.prevent :model="dictClassifyData" :size="config.ELEMENT_PLUS.SIZE">
          <el-form-item label="分类" label-width="40">
            <el-input v-model="searchData.dictClassifyName" placeholder="请输入" clearable :size="config.ELEMENT_PLUS.SIZE"></el-input>
          </el-form-item>
        </el-form>
        <el-button :size="config.ELEMENT_PLUS.SIZE" type="primary" @click="onSearchDictClassify()">查询</el-button>
      </div>
      <div class="page-dict-classify-list">
        <ul @click="checkoutClassify">
          <li v-for="item in dictClassifyOptions" :data-id="item.id" :key="item.id" :class="item.id == selectId ? 'active' : ''">{{ item.dictClassifyName }} - {{ item.dictClassifyKey }}</li>
        </ul>
      </div>
    </div>
    <div class="page-container">
      <el-card>
        <el-form :inline="true" @submit.native.prevent :model="searchData" :size="config.ELEMENT_PLUS.SIZE">
          <el-form-item label="字典名称">
            <el-input v-model="searchData.dictName" placeholder="请输入" clearable :size="config.ELEMENT_PLUS.SIZE"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSearch()" :size="config.ELEMENT_PLUS.SIZE">查询</el-button>
            <el-button :size="config.ELEMENT_PLUS.SIZE" @click="onReset">刷新</el-button>
          </el-form-item>
        </el-form>
      </el-card>

      <div class="page-content">
        <div class="page-content-btns">
          <el-button type="primary" :size="config.ELEMENT_PLUS.SIZE" @click="isShowDialog = true">新增字典</el-button>
        </div>
        <div class="page-content-table">
          <el-table :data="tableData" ref="contentTable" row-key="id" :size="config.ELEMENT_PLUS.SIZE" height="100%">
            <el-table-column label="字典名称" prop="dictName" />
            <el-table-column label="分类名称" prop="dictClassifyName" />
            <el-table-column label="分类Key" prop="name" />
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
          <div class="dialog-header">新增字典</div>
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
  </div>
</template>

<style lang="scss" scoped>
.page-dict {
  height: 100%;
  width: 100%;
  display: flex;
  .page-dict-classify {
    width: 20%;
    border-right: 1px solid #f0f0f0;
    background-color: #fff;
    margin: 10px 0 10px 10px;
    box-shadow: 0 2px 7px 0 rgba(5, 34, 97, 0.1);
    padding: 10px;
    display: flex;
    flex-direction: column;

    .page-dict-classify-search {
      display: flex;
    }
    .page-dict-classify-list {
      flex: 1;
      height: 0;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      ul {
        overflow-y: auto;
        li {
          height: 40px;
          line-height: 40px;
          margin-bottom: 8px;
          background-color: #f0f0f0;
          padding: 0 10px;
          border-radius: 4px;
          margin-right: 5px;
          cursor: pointer;
          color: rgb(104, 104, 104);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        .active {
          background-color: var(--theme-color);
          color: #fff;
          &::after {
            content: "";
            width: 7px;
            height: 7px;
            border-top: 2px solid #ffffff;
            border-right: 2px solid #ffffff;
            transform: rotate(45deg);
          }
        }
      }
    }
  }
  .page-container {
    flex: 1;
  }
}
</style>
