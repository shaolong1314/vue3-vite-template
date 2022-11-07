/*
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-07 11:06:55
 * @Description:
 */
import { createApp } from "vue";
import "element-plus/theme-chalk/dark/css-vars.css";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./styles/global.scss";
// 路由鉴权
import "./router/permission";

// mock数据
import "./mock/api";

const app = createApp(App).use(store);

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 权限指令
import permission from "./components/Permission";
app.directive("permission", permission);

app.use(router).mount("#app");
