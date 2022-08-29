import Axios from "axios";
import qs from "qs";
import { ElNotification, ElMessage } from "element-plus";
import { store } from "~/store";
import { getToken } from "@/utils/auth";
import { tansParams } from "@/utils/format";

// 创建axios实例
const service = Axios.create({
  // 超时
  timeout: 5000 * 1000,
  withCredentials: true,
  responseType: "json",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
  },
});

// request拦截器
service.interceptors.request.use(
  (config) => {
    // 是否需要设置 token
    config.headers["Access-Token"] = getToken();
    return config;
  },
  (error) => {
    console.log(error);
    Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (res) => {
    // 未设置状态码则默认成功状态
    const code = res.data.code || 200;
    if (code === 401) {
      MessageBox.confirm("登录状态已过期，您可以继续留在该页面，或者重新登录", "系统提示", {
        confirmButtonText: "重新登录",
        cancelButtonText: "取消",
        type: "warning",
      }).then(() => {
        store
          .dispatch("FedLogOut")
          .then(() => {
            location.href = "/";
          })
          .catch((err) => {
            location.href = "/";
          });
      });
    } else if (code === 500) {
      ElMessage.error(res.data.msg);
      return Promise.reject(new Error(res.data.msg));
    } else if (code !== 200) {
      // let notNeedCode = [1610];
      // if (!notNeedCode.includes(code)) {
      //   ElNotification.error({
      //     title: res.data.msg,
      //   });
      // }
      return Promise.reject(res.data);
    } else {
      return res.data;
    }
  },
  (error) => {
    console.log("err => " + error.message);
    let { message } = error;
    let messageText = undefined;
    if (message == "Network Error") {
      messageText = "后端接口连接异常";
    } else if (message.includes("timeout")) {
      messageText = "系统接口请求超时";
    } else if (message.includes("Request failed with status code")) {
      let failedCode = message.substr(message.length - 3);
      if (failedCode == 502) {
        // 后台维护页面
      } else {
        messageText = "系统接口" + failedCode + "异常";
      }
    }
    messageText && ElMessage.error(messageText);
    return Promise.reject(error);
  }
);

// 通用下载方法
export function download(url, params, filename, method = "post", callback) {
  if (method == "get") {
    if (params && Object.keys(params).length > 0) {
      url = url + "?" + tansParams(params);
    }
  }
  return service[method](url, params, {
    transformRequest: [
      (params) => {
        return tansParams(params);
      },
    ],
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    responseType: "blob",
  })
    .then((data) => {
      if (callback) {
        callback(data);
      } else {
        const content = data;
        const blob = new Blob([content]);
        if ("download" in document.createElement("a")) {
          const elink = document.createElement("a");
          elink.download = filename;
          elink.style.display = "none";
          elink.href = URL.createObjectURL(blob);
          document.body.appendChild(elink);
          elink.click();
          URL.revokeObjectURL(elink.href);
          document.body.removeChild(elink);
        } else {
          navigator.msSaveBlob(blob, filename);
        }
      }
    })
    .catch((r) => {
      console.error(r);
    });
}

function request(config) {
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else {
    config.method = "get";
  }

  // get请求映射params参数
  if (config.method === "get" && config.params) {
    let url = config.url + "?";
    for (const propName of Object.keys(config.params)) {
      const value = config.params[propName];
      var part = encodeURIComponent(propName) + "=";
      if (value !== null && typeof value !== "undefined") {
        if (typeof value === "object") {
          for (const key of Object.keys(value)) {
            let params = propName + "[" + key + "]";
            var subPart = encodeURIComponent(params) + "=";
            url += subPart + encodeURIComponent(value[key]) + "&";
          }
        } else {
          url += part + encodeURIComponent(value) + "&";
        }
      }
    }
    url = url.slice(0, -1);
    config.params = {};
    config.url = url;
  }

  if ((config.method == "post" || config.method == "put") && config.data) {
    if (config && config.headers && (config.headers["content-type"] === "application/x-www-form-urlencoded;charset=UTF-8" || config.headers["Content-Type"] === "application/x-www-form-urlencoded;charset=UTF-8")) {
      config.data = qs.stringify(config.data);
    }
  }
  config.url = "/api/" + config.url;

  return service(config);
}

export default request;
