import { createApp } from "vue";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
import "./styles/global.scss";
// 路由鉴权
import "./router/permission";

const app = createApp(App).use(store);

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

// 权限指令
import permission from "./components/Permission";
app.directive("permission", permission);

app.use(router).mount("#app");
