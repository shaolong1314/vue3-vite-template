import router from "./index.js";
import { store } from "../store";
import { ElMessage } from "element-plus";
import NProgress from "nprogress";
import "nprogress/nprogress.css";
import { getToken } from "~/utils/auth";
import { trim_async_routes, filterAsyncRouter, loadView } from "~/utils/format.js";
import { getListByRole, getMenusList } from "@/api/sysManage/menuManage";

NProgress.configure({ showSpinner: false });

const whiteList = ["/login", "/auth-redirect", "/bind", "/register", "/test-login", "/register", "/maintain"];

router.beforeEach((to, from, next) => {
  NProgress.start();
  if (getToken()) {
    /* has token*/
    if (to.path === "/login") {
      next({ path: "/" });
      NProgress.done();
    } else {
      if (store.getters.roles.length === 0) {
        // 判断当前用户是否已拉取完user_info信息
        store
          .dispatch("GetInfo")
          .then((res) => {
            // 拉取user_info
            const roles = res.roles;
            // 动态路由，拉取菜单
            loadMenus(next, to);
          })
          .catch((err) => {
            store.dispatch("LogOut").then(() => {
              ElMessage.error(err);
              next({ path: "/" });
            });
          });
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

// 加载菜单
export const loadMenus = (next, to) => {
  getListByRole()
    .then((res) => {
      // console.log("当前用户的菜单", res);
      if (res.data && Array.isArray(res.data)) {
        const menus = trim_async_routes(res.data);
        const asyncRouter = filterAsyncRouter(menus);
        asyncRouter.push({ path: "/:catchAll(.*)", redirect: "/404", hidden: true });
        store.dispatch("generateRoutes", asyncRouter);
        asyncRouter.forEach((item) => {
          router.addRoute(item);
        });
        if (!to.matched.length) {
          router.push(to.path);
        }
        // router.addRoutes(asyncRouter);
        // next({ ...to, replace: true });
      } else {
        next({ ...to, replace: true });
      }
    })
    .catch((err) => {
      next({ ...to, replace: true });
    });
};
