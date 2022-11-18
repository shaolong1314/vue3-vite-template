/*
 * @Author: shaolong
 * @Date: 2022-08-24 14:05:54
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-17 14:58:07
 * @Description:
 */
import { createRouter, createWebHistory } from "vue-router";
import routes from "./routers";

const router = createRouter({
  history: createWebHistory("/" + import.meta.env.VITE_BASE_DOMAIN),
  routes,
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 };
  }
});

export default router;
