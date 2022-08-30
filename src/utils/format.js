// 循环递归数组
export function trim_async_routes(routes) {
  const cloneData = JSON.parse(JSON.stringify(routes)); // 对源数据深度克隆
  let trim_routes = [];
  cloneData.forEach((item) => {
    // 目录和菜单进行递归
    if ([1, 2].includes(item.type)) {
      const obj = {
        component: item.component_url ? item.component_url : "Layout",
        hidden: item.status == 1 ? false : true,
        id: item.menu_id,
        iframe: item.is_outsize,
        meta: { url: item.is_outsize ? item.component_url : "", title: item.name, icon: item.icon, cache: item.is_cache },
        name: item.component_name,
        path: !item.parent_id ? "/" + item.url : item.url,
      };
      if (item.children && item.children.length > 0) {
        obj.children = trim_async_routes(item.children);
      }
      trim_routes.push(obj);
    }
  });
  return trim_routes;
}

import Layout from "~/components/Layout/index.vue";

const modules = import.meta.glob(`../views/**/*.vue`);
export const filterAsyncRouter = (routers) => {
  // 遍历后台传来的路由字符串，转换为组件对象
  const accessedRouters = routers.filter((router) => {
    if (router.component) {
      if (router.iframe) {
        router.component = iFrame;
      } else if (router.component === "Layout") {
        // Layout组件特殊处理
        router.component = Layout;
      } else if (router.component === "Layout2") {
        router.component = Layout2;
      } else {
        const component = router.component;
        router.component = loadView(component);
      }
    } else {
      return false;
    }
    if (router.children && router.children.length) {
      router.children = filterAsyncRouter(router.children);
    }
    return true;
  });
  return accessedRouters;
};

export const loadView = (view) => {
  // 路由懒加载
  return modules[`../views/${view}.vue`];
};

/**
 * 参数处理
 * @param {*} params  参数
 */
export const tansParams = (params) => {
  let result = "";
  Object.keys(params).forEach((key) => {
    if (!Object.is(params[key], undefined) && !Object.is(params[key], null) && !Object.is(JSON.stringify(params[key]), "{}")) {
      result += encodeURIComponent(key) + "=" + encodeURIComponent(params[key]) + "&";
    }
  });
  return result;
};

// 日期格式化
export const parseTime = (time, pattern) => {
  if (arguments.length === 0 || !time) {
    return null;
  }
  const format = pattern || "{y}-{m}-{d} {h}:{i}:{s}";
  let date;
  if (typeof time === "object") {
    date = time;
  } else {
    if (typeof time === "string" && /^[0-9]+$/.test(time)) {
      time = parseInt(time);
    } else if (typeof time === "string") {
      time = time.replace(new RegExp(/-/gm), "/");
    }
    if (typeof time === "number" && time.toString().length === 10) {
      time = time * 1000;
    }
    date = new Date(time);
  }
  const formatObj = {
    y: date.getFullYear(),
    m: date.getMonth() + 1,
    d: date.getDate(),
    h: date.getHours(),
    i: date.getMinutes(),
    s: date.getSeconds(),
    a: date.getDay(),
  };
  const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
    let value = formatObj[key];
    // Note: getDay() returns 0 on Sunday
    if (key === "a") {
      return ["日", "一", "二", "三", "四", "五", "六"][value];
    }
    if (result.length > 0 && value < 10) {
      value = "0" + value;
    }
    return value || 0;
  });
  return time_str;
};

// 表单重置
export const resetForm = (refName) => {
  if (this.$refs[refName]) {
    this.$refs[refName].resetFields();
  }
};
