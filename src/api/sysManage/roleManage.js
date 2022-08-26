import request from "@/axios";

// 获取角色列表
export function getRolesList(data) {
  return request({
    url: "/backend/role/finds",
    method: "post",
    data,
  });
}

// 新增角色
export function saveRoles(data) {
  return request({
    url: "/backend/role/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
export function editRoles(data) {
  return request({
    url: "/backend/role/edit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

export function savePower(data) {
  return request({
    url: "/backend/role/auth",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 获取角色详情
export function getRolesDetails(params) {
  return request({
    url: "/roles/getRole",
    method: "get",
    params,
  });
}

// 删除角色
export function delRoles(data) {
  return request({
    url: "/backend/role/delete",
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}
