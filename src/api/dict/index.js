/*
 * @Author: shaolong
 * @Date: 2022-11-16 09:51:55
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-16 09:54:03
 * @Description: 字典api
 */
import request from "@/axios";
// 获取字典分类列表
export function getDictClassifyList(data) {
  return request({
    url: "/backend/getDictClassifyList",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
// 获取字典列表
export function getDictList(data) {
  return request({
    url: "/backend/getDictList",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
