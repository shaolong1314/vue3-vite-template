<script setup>
import { config } from "@/config";
import { ref } from "vue";
import useTable from "../../hooks/useTable";
import { getMenusList } from "@/api/sysManage/menuManage";
import { parseTime } from "@/utils/format";
const { searchData, tableData, onReset } = useTable(getMenusList);

const expand = ref(false);
const expandRow = ref([]);

const onAdd = () => {};
const onEdit = () => {};
const onDelete = () => {};
</script>
<template>
  <div class="menuManage">
    <div class="search">
      <el-form :inline="true" @submit.native.prevent :model="searchData" :size="config.ELEMENT_PLUS.size">
        <el-form-item label="菜单名称">
          <el-input v-model="searchData.name" placeholder="请输入" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <el-button plain :size="config.ELEMENT_PLUS.size" @click="onReset">刷新</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="content">
      <div class="content-btns">
        <el-button type="primary" :size="config.ELEMENT_PLUS.size" @click="onAdd()">新增菜单</el-button>
      </div>
      <div class="content-table">
        <el-table :data="tableData" ref="contentTable" row-key="menu_id" :default-expand-all="expand" :size="config.ELEMENT_PLUS.size" :expand-row-keys="expandRow" :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
          <el-table-column :show-overflow-tooltip="true" label="菜单名称" prop="name" />
          <el-table-column label="图标" align="center" width="60">
            <!-- <template #default="scope">
              <i :class="scope.row.icon"></i>
            </template> -->
          </el-table-column>
          <el-table-column label="排序" prop="sort" align="center" width="60"> </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="url" label="路由地址" />
          <el-table-column :show-overflow-tooltip="true" label="权限标识">
            <template #default="scope">
              {{ scope.row.permission }}
            </template>
          </el-table-column>
          <el-table-column :show-overflow-tooltip="true" prop="component_url" label="组件路径" />
          <el-table-column label="类型" width="80" align="center">
            <template #default="scope">
              <el-tag :size="config.ELEMENT_PLUS.size" v-if="scope.row.type == 1" type="warning">目录</el-tag>
              <el-tag :size="config.ELEMENT_PLUS.size" v-if="scope.row.type == 2" type="success">菜单</el-tag>
              <el-tag :size="config.ELEMENT_PLUS.size" v-if="scope.row.type == 3">按钮</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="缓存" width="60" align="center">
            <template #default="scope">
              <el-tag :size="config.ELEMENT_PLUS.size" :type="scope.row.is_cache ? 'success' : 'danger'">{{ scope.row.is_cache == 1 ? "是" : "否" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="可见" width="60" align="center">
            <template #default="scope">
              <el-tag :size="config.ELEMENT_PLUS.size" :type="scope.row.status ? 'danger' : 'success'">{{ scope.row.status == 2 ? "否" : "是" }}</el-tag>
            </template>
          </el-table-column>
          <el-table-column label="创建时间" width="140" align="center">
            <template #default="scope">
              <span>{{ parseTime(scope.row.create_time) }}</span>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="200px" align="center" fixed="right">
            <template #default="scope">
              <el-button :size="config.ELEMENT_PLUS.size" type="text" @click="onAdd(scope.row)">查看</el-button>
              <el-button class="m10" :size="config.ELEMENT_PLUS.size" type="text" @click="onEdit(scope.row)">修改</el-button>
              <el-popover placement="top" width="200">
                <p>确定删除吗,如果下级存在机构或者部门，则无法删除！</p>
                <div style="text-align: right">
                  <el-button type="text" @click="closePopover" :size="config.ELEMENT_PLUS.size" plain>取消</el-button>
                  <el-button :loading="delLoading" type="success" @click="onDelete(scope.row)" :size="config.ELEMENT_PLUS.size">确定</el-button>
                </div>
                <el-button slot="reference" type="text" :size="config.ELEMENT_PLUS.size">删除</el-button>
              </el-popover>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.menuManage {
  padding: 10px;
  .search {
    width: 100%;
    box-sizing: border-box;
    padding: 20px;
    background-color: #ffffff;
    box-shadow: 0 2px 7px 0 rgba(5, 34, 97, 0.1);
    .search-btns {
      text-align: right;
    }
  }
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
      text-align: center;
      margin-top: 10px;
    }
  }
}
</style>
