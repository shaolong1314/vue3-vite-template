import { login, logout, getInfo, refreshToken, userLogin } from "@/api/login";
import { getToken, setToken, setExpiresIn, removeToken } from "@/utils/auth";
import { ElMessage } from "element-plus";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
    userInfo: {} /* 用户详细信息 */,
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token;
    },
    SET_NAME: (state, name) => {
      state.name = name;
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar;
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles;
    },
    SET_PERMISSIONS: (state, permissions) => {
      state.permissions = permissions;
    },
    SET_USER: (state, obj) => {
      state.userInfo = obj;
    },
  },

  actions: {
    // 登录
    async Login({ commit }, payload) {
      return new Promise(async (resolve, reject) => {
        let result = null;
        if (params.type == "phone") {
          result = await userLogin(params.form).catch((err) => {
            reject();
          });
          console.log("手机号登录 => ", result);
        } else if (params.type == "username") {
          result = await login(params.form).catch((err) => {
            reject();
          });
          console.log("用户名密码登录 => ", result);
        }

        if (result) {
          const { code } = result;
          if (code == 200) {
            let data = result.data;
            setToken(data.access_token, params.rememberMe ? 30 * 24 * 60 : data.expires_in);
            commit("SET_TOKEN", data.access_token);
            setExpiresIn(data.expires_in);
            commit("SET_EXPIRES_IN", data.expires_in);
          } else if (code == 1007) {
            ElMessage.error("用户已被停用");
            return reject();
          } else if (code == 1008) {
            ElMessage.error("用户不存在或者密码错误");
            return reject();
          } else if (code == 1009) {
            ElMessage.error("验证码错误");
            return reject();
          }
          resolve(result);
        } else {
          reject(result);
        }
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then(async (res) => {
            console.log("用户信息", res);
            resolve(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 刷新token
    RefreshToken({ commit, state }) {
      return new Promise((resolve, reject) => {
        refreshToken(state.token)
          .then((res) => {
            setExpiresIn(res.data.expires_in);
            commit("SET_EXPIRES_IN", res.data.expires_in);
            resolve();
          })
          .catch((error) => {
            reject(error);
          });
      });
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token)
          .then(() => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_PERMISSIONS", []);
            removeToken();
            resolve();
          })
          .catch((error) => {
            commit("SET_TOKEN", "");
            commit("SET_ROLES", []);
            commit("SET_PERMISSIONS", []);
            removeToken();
            reject(error);
          });
      });
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit("SET_TOKEN", "");
        removeToken();
        resolve();
      });
    },
  },
};

export default user;
