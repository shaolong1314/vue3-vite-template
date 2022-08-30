import routes from "~/router/routers";
import { trim_async_routes, filterAsyncRouter, loadView } from "~/utils/format.js";
import { getListByRole, getMenusList } from "@/api/sysManage/menuManage";

const permission = {
  state: {
    routers: routes,
    addRouters: [],
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = routes.concat(routers);
    },
  },
  actions: {
    generateRoutes({ commit }, asyncRouter) {
      commit("SET_ROUTERS", asyncRouter);
    },
    buildRoutes({ commit }) {
      return new Promise((resolve, reject) => {
        getListByRole()
          .then((res) => {
            console.log("当前用户的菜单", res);
            if (res.data && Array.isArray(res.data)) {
              const menus = trim_async_routes(res.data);
              const asyncRouter = filterAsyncRouter(menus);
              asyncRouter.push({ path: "/:catchAll(.*)", redirect: "/404", hidden: true });
              commit("SET_ROUTERS", asyncRouter);
              resolve(asyncRouter);
            } else {
              resolve([]);
            }
          })
          .catch((err) => {
            reject(error);
          });
      });
    },
  },
};

export default permission;
