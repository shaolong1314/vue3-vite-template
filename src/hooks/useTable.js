import { reactive, ref } from "vue";

export default function useTable(getList) {
  const searchData = reactive({});
  const pagination = reactive({
    total: 0,
    page: 1,
    pageSize: 10,
    sizes: [10, 20, 30, 40, 50],
  });

  // 返回数据
  const tableData = ref([]);

  // 获取表格数据
  const getTableList = (params) => {
    getList(params).then((res) => {
      if (res && res.code == 200) {
        const { total, data } = res.data;
        tableData.value = data;
        pagination.total = total;
      }
    });
  };

  //引入生命周期，执行搜索
  onMounted(() => {
    getTableList({ ...searchData, ...pagination });
  });

  //调整每一页多少行数据
  const sizeChange = (val) => {
    searchState.pageNo = 1;
    searchState.pageSize = val;
    getTableList(searchState);
  };
  //翻页的
  const currentChange = (val) => {
    searchState.pageNo = val;
    getTableList(searchState);
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
    onSearch,
  };
}
