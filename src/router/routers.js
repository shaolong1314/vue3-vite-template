/*
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 17:30:55
 * @Description:
 */
/**
 * Note: 路由配置项
 *
 * alwaysShow: true               // 当你一个路由下面的 children 声明的路由大于1个时，自动会变成嵌套的模式--如组件页面
 *                                // 只有一个时，会将那个子路由当做根路由显示在侧边栏--如首页
 * redirect: noRedirect           // 当设置 noRedirect 的时候该路由在面包屑导航中不可被点击
 * name:'router-name'             // 设定路由的名字，规则：跟文件名字保持一致；缓存路由必须设置
   breadcrumb: false             // 如果设置为false，则不会在breadcrumb面包屑中显示
   hidden: true                  // true为不显示侧边栏
   keepAlive: true               // 是否开启缓存
   meta: {
      title: 'title'                // 设置该路由在侧边栏和面包屑中展示的名字
      icon: 'svg-name'              // 设置该路由的图标，对应路径src/assets/icons/svg
   }
  
 */

import Layout from "@/components/Layout/index.vue";
import Login from "@/views/Login.vue";
import Home from "@/views/home/index.vue";
const routes = [
  // 首页
  {
    path: "",
    component: Layout,
    redirect: "index",
    children: [
      {
        path: "index",
        name: "Index",
        // component: () => import("../views/Index.vue"),
        component: Home,
        breadcrumb: true,
        hidden: false,
        meta: {
          title: "首页",
          icon: "HomeFilled"
        }
      }
    ]
  },
  {
    path: "/login",
    component: Login,
    breadcrumb: false,
    hidden: true,
    meta: {
      title: "登录页",
      icon: ""
    }
  },

  {
    path: "/:catchAll(.*)",
    component: () => import("../views/error/404.vue"),
    hidden: true
  }
];

export default routes;
