<script setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

// import routes from "~/router/routers";

const store = useStore();

const _routes = computed(() => {
  return store.state.permission.routers;
});

const route = useRoute();
const key = computed(() => {
  return route.fullPath;
});

const keepAliveArr = computed(() => {
  let arr = [];
  const setKeepLive = (routers) => {
    routers.forEach((route, index) => {
      if (route && route.meta && route.meta.keepAlive) {
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
      <Transition name="fade-transform" mode="out-in">
        <keep-alive :include="keepAliveArr">
          <component :is="Component" />
        </keep-alive>
      </Transition>
    </router-view>
  </div>
</template>

<style lang="scss" scoped>
@import "~/styles/transition.css";

.app-main {
  box-sizing: border-box;
  overflow-x: hidden;
  min-width: 1200px;
  width: 100%;
  color: #000000;
  padding: 10px;
}
</style>
