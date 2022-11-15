<!--
 * @Author: shaolong
 * @Date: 2022-08-29 09:29:49
 * @LastEditors: shaolong
 * @LastEditTime: 2022-11-15 14:43:44
 * @Description: 
-->
<script setup>
import { computed } from "vue";
import { useStore } from "vuex";

const store = useStore();

const _routes = computed(() => {
  return store.state.permission.routers;
});

const keepAliveArr = computed(() => {
  const arr = [];
  const setKeepLive = (routers) => {
    routers.forEach((route, index) => {
      if (route && route.keepAlive) {
        arr.push(route.name);
      }
      if (route.children && route.children.length > 0) {
        setKeepLive(route.children);
      }
    });
  };
  setKeepLive(_routes.value);
  return arr;
});
</script>

<template>
  <div class="app-main">
    <router-view v-slot="{ Component }">
      <Transition name="routerSlide">
        <keep-alive :include="keepAliveArr">
          <component :is="Component" />
        </keep-alive>
      </Transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
.app-main {
  box-sizing: border-box;
  min-width: 1200px;
  width: 100%;
  height: 100%;
  color: #000000;
  position: relative;
}
@import "~/styles/transition.css";
</style>
