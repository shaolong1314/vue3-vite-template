import { login, logout, getInfo } from "@/api/login";
import { getToken, setToken, removeToken } from "@/utils/auth";
import { ElMessage } from "element-plus";

const user = {
  state: {
    token: getToken(),
    name: "",
    avatar: "",
    roles: [],
    permissions: [],
    userInfo: {} /* 用户详细信息 */
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
    }
  },

  actions: {
    // 登录
    async Login({ commit }, params) {
      return new Promise(async (resolve, reject) => {
        let result = null;
        if (params.type == "phone") {
          result = await userLogin(params).catch((err) => {
            reject();
          });
          console.log("手机号登录 => ", result);
        } else if (params.type == "username") {
          result = await login(params).catch((err) => {
            console.log(err);
            reject();
          });
          console.log("用户名密码登录 => ", result);
        }

        if (result) {
          const { code } = result;
          if (code == 200) {
            setToken(result.data.token);
            commit("SET_TOKEN", result.data.token);
            resolve(result);
          } else if (code == 1007) {
            ElMessage.error("用户已被停用");
            return reject();
          } else if (code == 1008) {
            ElMessage.error("用户不存在或者密码错误");
            return reject();
          } else if (code == 1009) {
            ElMessage.error("验证码错误");
            return reject();
          } else {
            ElMessage.error(result.msg);
          }
        } else {
          reject(result);
        }
      });
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo(state.token)
          .then((res) => {
            if (res && res.code == 200) {
              const _result = res.data;
              if (_result.role && _result.role.role_menu) {
                _result.roles = _result.role.role_menu.map((item) => {
                  return item.menu && item.menu.permission;
                });
              }
              setUserInfo(_result, commit);
              resolve(_result);
            }
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
        logout()
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
    }
  }
};

export const setUserInfo = (res, commit) => {
  // 如果没有任何权限，则赋予一个默认的权限，避免请求死循环
  if (res.roleMenu.length === 0) {
    commit("SET_ROLES", ["ROLE_SYSTEM_DEFAULT"]);
  } else {
    commit("SET_ROLES", res.roleMenu);
  }
  commit("SET_USER", res);
};

export default user;
