/**
 * Note: 路由配置项
 *
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如首页
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，规则：跟文件名字保持一致；缓存路由必须设置
 * meta : {
    noCache: true                 // 如果设置为true，则不会被 <keep-alive> 缓存(默认 false)
    title: 'title'                // 设置该路由在侧边栏和面包屑中展示的名字
    icon: 'svg-name'              // 设置该路由的图标，对应路径src/assets/icons/svg
    breadcrumb: false             // 如果设置为false，则不会在breadcrumb面包屑中显示
    hidden: true                  // true为不显示侧边栏
    keepAlive: true               // 是否开启缓存
  }
 */

import Layout from "../components/Layout/index.vue";
const routes = [
  // 首页
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "/index",
        name: "Index",
        component: () => import(/* webpackChunkName: "index" */ "../views/Index.vue"),
        meta: {
          noCache: true,
          title: "首页",
          icon: "",
          breadcrumb: true,
          hidden: false,
        },
      },
    ],
  },
  {
    path: "/sysManage",
    component: Layout,
    meta: {
      noCache: true,
      title: "系统管理",
      icon: "",
      breadcrumb: true,
      hidden: false,
    },
    children: [
      {
        path: "/user",
        name: "UserManage",
        component: () => import(/* webpackChunkName: "sysManage" */ "../views/sysManage/UserManage.vue"),
        meta: {
          noCache: true,
          title: "用户管理",
          icon: "",
          breadcrumb: true,
          hidden: false,
          keepAlive: false,
        },
      },
      {
        path: "/menu",
        name: "MenuManage",
        component: () => import(/* webpackChunkName: "sysManage" */ "../views/sysManage/MenuManage.vue"),
        meta: {
          noCache: true,
          title: "菜单管理",
          icon: "",
          breadcrumb: true,
          hidden: false,
          keepAlive: true,
        },
      },
      {
        path: "/role",
        name: "RoleManage",
        component: () => import(/* webpackChunkName: "sysManage" */ "../views/sysManage/RoleManage.vue"),
        meta: {
          noCache: true,
          title: "角色管理",
          icon: "",
          breadcrumb: true,
          hidden: false,
          keepAlive: false,
        },
      },
    ],
  },
];

export default routes;
