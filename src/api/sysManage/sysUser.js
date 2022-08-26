import request from "@/axios";

// 获取列表
export function getAdminUserList(data) {
  return request({
    url: "/backend/manager/finds",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 新增用户
export function saveAdminUsers(data) {
  return request({
    url: "/backend/manager/create",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 更新用户
export function updateAdminUsers(data) {
  return request({
    url: "/backend/manager/edit",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    data,
  });
}

// 重置密码
export function resetPwd(data) {
  return request({
    url: "/backend/manager/setPassword",
    method: "post",
    data,
  });
}

// 删除用户
export function delUser(data) {
  return request({
    url: "/backend/manager/delete",
    method: "post",
    data,
  });
}
