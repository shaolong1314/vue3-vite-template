import { ref, watch } from "vue";

// 防抖hooks
export function useDebounce(cb, delay = 100) {
  const timer = ref(null);

  let handler = function () {
    clearTimeout(timer.value);
    let args = arguments,
      context = this;
    timer.value = setTimeout(() => {
      cb.apply(context, args);
    }, delay);
  };

  const cancel = () => {
    clearTimeout(timer);
    timer.value = null;
  };

  return {
    handler,
    cancel,
  };
}

export function useAssociateSearch() {
  const keyword = ref("");

  const search = () => {
    console.log("search...", keyword.value);
    // mock 请求接口获取数据
  };

  // watch(keyword, search) // 原始逻辑，每次变化都请求
  watch(keyword, debounce(search, 1000)); // 去抖，停止操作1秒后再请求

  return {
    keyword,
  };
}
