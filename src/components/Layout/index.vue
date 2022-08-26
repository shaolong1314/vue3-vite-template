<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import AppMain from "./AppMain.vue";
import { computed, reactive } from "vue";
import routes from "~/router/routers";
import { useRoute } from "vue-router";
const state = reactive({
  showMenu: true,
  currentPath: "/index",
  count: {
    number: 1,
  },
});

const _routes = routes;

const route = useRoute();

const onRoutes = computed(() => {
  return route.path;
});
</script>

<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <el-aside class="aside">
        <div class="head">
          <div>
            <img src="https://s.weituibao.com/1582958061265/mlogo.png" alt="logo" />
            <span>vue3 admin</span>
          </div>
        </div>
        <div class="line" />
        <!-- <el-menu background-color="#222832" text-color="#fff" :router="true" :default-active="state.currentPath">
          <el-sub-menu :index="index" v-for="(item, index) in _routes">
            <template v-if=""></template>
            <template #title>
              <span>Dashboard</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/introduce">系统介绍</el-menu-item>
              <el-menu-item index="/dashboard">Dashboard</el-menu-item>
              <el-menu-item index="/add">添加商品</el-menu-item>
            </el-menu-item-group>
          </el-sub-menu>
        </el-menu> -->
        <el-menu class="sidebar-el-menu" :default-active="onRoutes" background-color="#222832" text-color="#fff" unique-opened router>
          <template v-for="item in _routes">
            <!-- 多个子路由 -->
            <template v-if="item.children && item.children.length > 1">
              <el-sub-menu :index="item.path" :key="item.path">
                <template #title>
                  <!-- <el-icon>
                    <component :is="item.icon"></component>
                  </el-icon> -->
                  <span>{{ item.meta && item.meta.title }}</span>
                </template>
                <template v-for="subItem in item.children">
                  <el-sub-menu v-if="subItem.children" :index="subItem.path" :key="subItem.path">
                    <template #title>{{ subItem.title }}</template>
                    <el-menu-item v-for="(threeItem, i) in subItem.children" :key="i" :index="threeItem.path">
                      {{ threeItem.title }}
                    </el-menu-item>
                  </el-sub-menu>
                  <el-menu-item v-else :index="subItem.path">
                    {{ subItem.meta && subItem.meta.title }}
                  </el-menu-item>
                </template>
              </el-sub-menu>
            </template>

            <!-- 只有一个子路由，则当顶级路由展示 -->
            <template v-else-if="item.children && item.children.length == 1">
              <el-menu-item :index="item.children[0].path" :key="item.children[0].path">
                <!-- <el-icon>
                  <component :is="item.icon"></component>
                </el-icon> -->
                <template #title>{{ item.children[0].meta.title }}</template>
              </el-menu-item>
            </template>

            <!-- 没有子路由 -->
            <template v-else>
              <el-menu-item :index="item.path" :key="item.path">
                <!-- <el-icon>
                  <component :is="item.icon"></component>
                </el-icon> -->
                <template #title>{{ item.meta && item.meta.title }}</template>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-container class="content">
        <Header />
        <div class="main">
          <AppMain />
        </div>
        <Footer />
      </el-container>
    </el-container>
    <el-container v-else class="container">
      <router-view />
    </el-container>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  background-color: #ffffff;
}
.container {
  height: 100vh;
}
.aside {
  width: 200px !important;
  background-color: #222832;
  overflow: hidden;
  overflow-y: auto;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
}
.aside::-webkit-scrollbar {
  display: none;
}
.head {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 50px;
}
.head > div {
  display: flex;
  align-items: center;
}

.head img {
  width: 50px;
  height: 50px;
  margin-right: 10px;
}
.head span {
  font-size: 20px;
  color: #ffffff;
}
.line {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.content {
  display: flex;
  flex-direction: column;
  max-height: 100vh;
  overflow: hidden;
}
.main {
  height: calc(100vh - 100px);
  overflow: auto;
  /* padding: 10px; */
  background-color: #f5f8fa;
}
</style>
<style>
body {
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}
.el-menu {
  border-right: none !important;
}
.el-sub-menu {
  border-top: 1px solid hsla(0, 0%, 100%, 0.05);
  border-bottom: 1px solid rgba(0, 0, 0, 0.2);
}
.el-sub-menu:first-child {
  border-top: none;
}
.el-sub-menu [class^="el-icon-"] {
  vertical-align: -1px !important;
}
a {
  color: #409eff;
  text-decoration: none;
}
.el-pagination {
  text-align: center;
  margin-top: 20px;
}
.el-popper__arrow {
  display: none;
}
</style>
