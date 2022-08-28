import { createApp } from "vue";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router";
import { store } from "./store";
// 路由鉴权
import "./router/permission";

createApp(App).use(router).use(store).mount("#app");
