import { createStore } from "vuex";
import user from "./modules/user";
import permission from "./modules/permission";
import { getters } from "./getters";

// 创建一个新的 store 实例
export const store = createStore({
  modules: {
    user,
    permission,
  },
  getters,
});
