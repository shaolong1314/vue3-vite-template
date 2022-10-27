/*
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-10-27 15:08:16
 * @Description: 管理异步路由store
 */
import routes from "~/router/routers";
import { trim_async_routes, filterAsyncRouter } from "~/utils/format.js";
import { getListByRole } from "@/api/sysManage/menuManage";

const permission = {
  state: {
    routers: [],
    addRouters: []
  },
  mutations: {
    SET_ROUTERS: (state, routers) => {
      state.addRouters = routers;
      state.routers = routes.concat(routers);
    }
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
              commit("SET_ROUTERS", asyncRouter);
              resolve(asyncRouter);
            } else {
              resolve([]);
            }
          })
          .catch((err) => {
            reject(err);
          });
      });
    }
  }
};

export default permission;
