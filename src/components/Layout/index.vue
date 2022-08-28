<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import AppMain from "./AppMain.vue";
import Aside from "./Aside.vue";
import { computed, reactive } from "vue";
const state = reactive({
  showMenu: true,
  currentPath: "/index",
  count: {
    number: 1,
  },
});
</script>

<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <Aside />
      <el-container class="content">
        <Header />
        <div class="main">
          <AppMain />
        </div>
        <Footer />
      </el-container>
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
