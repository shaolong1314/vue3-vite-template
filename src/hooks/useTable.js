/*
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 17:35:51
 * @Description:
 */
import { reactive, ref } from "vue";

export default function useTable(getList) {
  const searchData = reactive({});
  const pagination = reactive({
    total: 0,
    page: 1,
    pageSize: 10,
    sizes: [10, 20, 30, 40, 50]
  });

  // 返回数据
  const tableData = ref([]);

  // 获取表格数据
  const getTableList = (params) => {
    if (!getList || typeof getList != "function") {
      tableData.value = [];
      pagination.total = 0;
      return;
    }
    getList(params).then((res) => {
      if (res && res.code == 200) {
        const { total, data } = res;
        tableData.value = data;
        pagination.total = total || 0;
      }
    });
  };

  // 引入生命周期，执行搜索
  onMounted(() => {
    getTableList({ ...searchData, ...pagination });
  });

  // 调整每一页多少行数据
  const sizeChange = (val) => {
    pagination.page = 1;
    pagination.pageSize = val;
    getTableList({ ...searchData, ...pagination });
  };
  // 翻页的
  const currentChange = (val) => {
    pagination.page = val;
    getTableList({ ...searchData, ...pagination });
  };

  const onSearch = () => {
    console.log(searchData);
  };

  // 重置
  const onReset = () => {
    const keys = Object.keys(searchData);
    keys.forEach((item) => {
      searchData[item] = "";
    });
    pagination.total = 0;
    pagination.page = 1;
    pagination.pageSize = 10;
    pagination.sizes = [10, 20, 30, 40, 50];
  };

  return {
    searchData,
    pagination,
    tableData,
    getTableList,
    sizeChange,
    currentChange,
    onReset,
    onSearch
  };
}
