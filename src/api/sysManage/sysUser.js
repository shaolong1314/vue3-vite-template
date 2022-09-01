import request from "@/axios";

// 获取列表
export function getAdminUserList(data) {
  return request({
    url: "/backend/manager/finds",
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    data
  });
}
