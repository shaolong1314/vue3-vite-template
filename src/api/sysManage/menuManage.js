import request from "@/axios";

// 获取菜单列表
export function getMenusList(params) {
  return request({
    url: "/backend/menu/finds",
    method: "post",
    data,
  });
}

// 根据角色获取菜单列表
export function getListByRole(params) {
  return request({
    url: "/backend/publicize/getMenuInfo",
    method: "post",
    data,
  });
}

// 新增菜单
export function saveMenus(data) {
  return request({
    url: "/backend/menu/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
// 编辑菜单
export function editMenus(data) {
  return request({
    url: "/backend/menu/edit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 获取菜单详情
export function getMenusDetails(data) {
  return request({
    url: "/backend/menu/detail",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 删除菜单
export function delMenus(data) {
  return request({
    url: "/menus/delete",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
