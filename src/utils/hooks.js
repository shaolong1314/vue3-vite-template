import { reactive } from "vue";

// 特性描述前面加上“use”是一种composition api命名约定

// 表单查询表格数据hooks
export const useSearch = () => {

  // 搜索数据
  const onSearch = (getTableList) => {
    getTableList();
  };

  // 重置表单
  const onReset = (getTableList) => {
    pagination.page = 1;
    getTableList();
  };

  // 改变页码
  const pageChange = (e) => {
    pagination.page = e;
  };

  // 改变单页数量
  const sizeChange = (e) => {
    pagination.page = 1;
    pagination.pageSize = e;
    getTableList;
  };

  return {
    searchData,
    onSearch,
    onReset,
    pagination,
    pageChange,
    sizeChange,
  };
};
