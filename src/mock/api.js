/*
 * @Author: shaolong
 * @Date: 2022-10-26 16:04:34
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 17:54:43
 * @Description: mock数据
 */
import Mock from "mockjs";
const api = {
  login: "/api/backend/publicize/login",
  loginOut: "/api/login/logout",
  getInfo: "/api/backend/publicize/getUserInfo",
  getMenusList: "/api/backend/publicize/getMenuInfo",
  getRolesList: "/api/backend/role/finds"
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
      menu_id: 1,
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
          icon: "Grid",
          children: [],
          menu_id: 2
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
          icon: "Menu",
          children: [],
          menu_id: 3
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
          icon: "User",
          children: [],
          menu_id: 4
        }
      ]
    },
    {
      name: "DictManage",
      component: "",
      hidden: false,
      title: "字典管理",
      keepAlive: false,
      type: 1,
      url: "dict",
      icon: "Setting",
      menu_id: 5,
      children: [
        {
          name: "DictClassify",
          component: "dict/Classify",
          hidden: false,
          keepAlive: false,
          title: "字典分类",
          parentName: "字典管理",
          parentId: 5,
          type: 2,
          url: "classify",
          icon: "Grid",
          children: [],
          menu_id: 6
        },
        {
          name: "DictList",
          component: "dict/Index",
          hidden: false,
          keepAlive: false,
          title: "字典列表",
          parentName: "字典管理",
          parentId: 5,
          type: 2,
          url: "list",
          icon: "Menu",
          children: [],
          menu_id: 7
        }
      ]
    }
  ]
});
Mock.mock(api.getRolesList, {
  code: 200,
  msg: "操作成功",
  total: 2,
  data: [
    {
      name: "超级管理员",
      remark: "",
      create_time: "2022-10-10 10:10:10"
    },
    {
      name: "开发人员",
      remark: "",
      create_time: "2022-10-10 10:10:10"
    }
  ]
});
