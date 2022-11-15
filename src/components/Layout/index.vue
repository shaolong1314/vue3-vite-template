<!--
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 16:39:39
 * @Description: 
-->
<script setup>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
import AppMain from "./AppMain.vue";
import Aside from "./Aside.vue";
import { reactive } from "vue";
import { config } from "@/config";

const state = reactive({
  showMenu: true
});
</script>

<template>
  <div class="layout">
    <el-container v-if="state.showMenu" class="container">
      <Aside />
      <el-container class="content">
        <Header class="content-header" />
        <AppMain class="content-main" />
        <Footer class="content-footer" v-if="config.GLOBAL.isShowFooter" />
      </el-container>
    </el-container>
  </div>
</template>

<style scoped lang="scss">
.layout {
  height: 100vh;
  background-color: #f7f7f7;
  .container {
    height: 100%;
    .content {
      display: flex;
      flex-direction: column;
      height: 100%;
      overflow: hidden;
      .content-header,
      .content-footer {
        height: 50px;
        flex-shrink: 0;
        background-color: #fff;
      }
      .content-main {
        flex: 1;
        height: 0;
        overflow: hidden;
        // padding: 10px;
      }
    }
  }
}
</style>
