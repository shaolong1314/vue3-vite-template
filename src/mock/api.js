/*
 * @Author: shaolong
 * @Date: 2022-10-26 16:04:34
 * @LastEditors: shaolong
 * @LastEditTime: 2022-10-27 17:09:43
 * @Description: mock数据
 */
import Mock from "mockjs";
const api = {
  login: "/api/backend/publicize/login",
  loginOut: "/api/login/logout",
  getInfo: "/api/backend/publicize/getUserInfo",
  getMenusList: "/api/backend/publicize/getMenuInfo"
};

Mock.mock("/api/backend/publicize/login", {
  code: 200,
  msg: "操作成功",
  data: {
    token: "kjkjalsdiiuioayeuryqowierqiwerqowiery"
  }
});

Mock.mock(api.loginOut, {
  code: 200,
  msg: "操作成功"
});
Mock.mock(api.getInfo, {
  code: 200,
  msg: "操作成功",
  data: {
    username: "admin",
    role: "admin",
    roleMenu: []
  }
});
Mock.mock(api.getMenusList, {
  code: 200,
  msg: "操作成功",
  data: [
    {
      name: "SysManage",
      component: "",
      hidden: false,
      title: "系统管理",
      keepAlive: false,
      type: 1,
      url: "sysManage",
      icon: "Setting",
      children: [
        {
          name: "RoleManage",
          component: "sysManage/RoleManage",
          hidden: false,
          keepAlive: false,
          title: "角色管理",
          parentName: "系统管理",
          parentId: 1,
          type: 2,
          url: "roleManage",
          icon: "Grid"
        },
        {
          name: "MenuManage",
          component: "sysManage/MenuManage",
          hidden: false,
          keepAlive: false,
          title: "菜单管理",
          parentName: "系统管理",
          parentId: 1,
          type: 2,
          url: "menuManage",
          icon: "Menu"
        },
        {
          name: "SysUser",
          component: "sysManage/SysUser",
          hidden: false,
          keepAlive: true,
          title: "用户管理",
          parentName: "系统管理",
          parentId: 1,
          type: 2,
          url: "sysUser",
          icon: "User"
        },
        {
          name: "OrganManage",
          component: "sysManage/OrganManage",
          hidden: false,
          keepAlive: false,
          title: "机构管理",
          parentName: "系统管理",
          parentId: 1,
          type: 2,
          url: "organManage",
          icon: "Histogram"
        }
      ]
    }
  ]
});
