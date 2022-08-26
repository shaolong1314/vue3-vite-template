import { createApp } from "vue";
import "./styles/style.css";
import App from "./App.vue";
import router from "./router";

// 路由鉴权
// import "./router/permission";

createApp(App).use(router).mount("#app");
