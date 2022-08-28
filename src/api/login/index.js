import request from "@/axios";
// 获取列表
export function login(data) {
  return request({
    url: "backend/publicize/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
export function logout(data) {
  return request({
    url: "/login/logout",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
export function getInfo(data) {
  return request({
    url: "/backend/publicize/getUserInfo",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export function getUserMenu(data) {
  return request({
    url: "/backend/publicize/getMenuInfo",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
