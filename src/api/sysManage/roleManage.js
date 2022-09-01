import request from "@/axios";

// 获取角色列表
export function getRolesList(data) {
  return request({
    url: "/backend/role/finds",
    method: "post",
    data
  });
}

// 获取角色详情
export function getRolesDetails(params) {
  return request({
    url: "/roles/getRole",
    method: "get",
    params
  });
}
