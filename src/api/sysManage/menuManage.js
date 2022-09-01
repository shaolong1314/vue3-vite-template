import request from "@/axios";

// 获取菜单列表
export function getMenusList(data) {
  return request({
    url: "/backend/menu/finds",
    method: "post",
    data
  });
}

// 根据角色获取菜单列表
export function getListByRole(data) {
  return request({
    url: "/backend/publicize/getMenuInfo",
    method: "post",
    data
  });
}

// 获取菜单详情
export function getMenusDetails(data) {
  return request({
    url: "/backend/menu/detail",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
