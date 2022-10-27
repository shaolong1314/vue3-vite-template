/*
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-10-27 11:49:32
 * @Description:
 */
import request from "@/axios";
// 获取列表
export function login(data) {
  return request({
    url: "/backend/publicize/login",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
export function logout(data) {
  return request({
    url: "/login/logout",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
export function getInfo(data) {
  return request({
    url: "/backend/publicize/getUserInfo",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}

export function getUserMenu(data) {
  return request({
    url: "/backend/publicize/getMenuInfo",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
