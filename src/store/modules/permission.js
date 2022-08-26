import { routes } from "~/router";

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
  },
};

export default permission;
