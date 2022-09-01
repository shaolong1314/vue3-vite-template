import router from "./index.js";
import { store } from "../store";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "~/utils/auth";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/auth-redirect", "/bind", "/register", "/test-login", "/register", "/maintain"];

router.beforeEach(async (to, from, next) => {
  NProgress.start();
  if (getToken()) {
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        try {
          await store.dispatch("GetInfo");
          const asyncRouter = await store.dispatch("buildRoutes");
          asyncRouter.forEach((item) => {
            router.addRoute(item);
          });
          next({ ...to, replace: true });
        } catch (error) {
          console.log(error);
          next({ path: "/login" });
          // store.dispatch("LogOut").then(() => {
          //   ElMessage.error(err);
          //   next({ path: "/login" });
          // });
        }
      } else {
        next();
      }
    }
  } else {
    // 没有token
    if (whiteList.indexOf(to.path) !== -1) {
      // 在免登录白名单，直接进入
      next();
    } else {
      next(`/login?redirect=${to.fullPath}`); // 否则全部重定向到登录页
      NProgress.done();
    }
  }
});

router.afterEach(() => {
  NProgress.done();
});
