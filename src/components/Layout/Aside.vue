<script setup>
import { useStore } from "vuex";
import { useRoute } from "vue-router";
import { config } from "~/config";

const store = useStore();

const _routes = computed(() => {
  return store.state.permission.routers;
});

const route = useRoute();

const onRoutes = computed(() => {
  return route.path;
});
</script>

<template>
  <el-aside class="aside">
    <div class="head">
      <div>
        <!-- <img src="https://s.weituibao.com/1582958061265/mlogo.png" alt="logo" /> -->
        <span>{{ config.GLOBAL.title }}</span>
      </div>
    </div>
    <div class="line" />
    <el-scrollbar>
      <el-menu class="sidebar-el-menu" :default-active="onRoutes" background-color="#222832" text-color="#fff" unique-opened router>
        <template v-for="item in _routes">
          <!-- 多个子路由 -->
          <template v-if="item.children && item.children.length > 1">
            <el-sub-menu :index="item.path" :key="item.path" v-if="!item.hidden">
              <template #title>
                <el-icon>
                  <component :is="item.meta && item.meta.icon"></component>
                </el-icon>
                <span>{{ item.meta && item.meta.title }}</span>
              </template>
              <template v-for="subItem in item.children">
                <template v-if="!subItem.hidden">
                  <el-sub-menu v-if="subItem.children && subItem.children.length > 0" :index="item.path + '/' + subItem.path" :key="subItem.path">
                    <template #title>
                      <el-icon>
                        <component :is="subItem.meta && subItem.meta.icon"></component>
                      </el-icon>
                      <span>{{ subItem.meta && subItem.meta.title }}</span>
                    </template>
                  </el-sub-menu>
                  <el-menu-item v-else :index="item.path + '/' + subItem.path" :key="item.path + '/' + subItem.path">
                    <el-icon>
                      <component :is="subItem.meta && subItem.meta.icon"></component>
                    </el-icon>
                    <span>{{ subItem.meta && subItem.meta.title }}</span>
                  </el-menu-item>
                </template>
              </template>
            </el-sub-menu>
          </template>

          <!-- 只有一个子路由，当顶级路由展示 -->
          <template v-else-if="!item.hidden && item.children && item.children.length == 1">
            <el-menu-item :index="item.path + '/' + item.children[0].path" :key="item.path + '/' + item.children[0].path" v-if="!item.children[0].hidden">
              <el-icon>
                <component :is="item.children[0].meta && item.children[0].meta.icon"></component>
              </el-icon>
              <template #title>{{ item.children[0].meta && item.children[0].meta.title }}</template>
            </el-menu-item>
          </template>

          <!-- 没有子路由 -->
          <template v-else>
            <el-menu-item :index="item.path" :key="item.path" v-if="!item.hidden">
              <el-icon>
                <component :is="item.meta && item.meta.icon"></component>
              </el-icon>
              <template #title>{{ item.meta && item.meta.title }}</template>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<style scoped lang="scss">
.aside {
  width: 200px !important;
  background-color: #222832;
  overflow: hidden;
  -ms-overflow-style: none;
  overflow: -moz-scrollbars-none;
  .aside::-webkit-scrollbar {
    display: none;
  }
  .head {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 50px;
    div {
      display: flex;
      align-items: center;
    }
    img {
      width: 50px;
      height: 50px;
      margin-right: 10px;
    }
    span {
      font-size: 20px;
      color: #ffffff;
    }
  }
  .line {
    border-top: 1px solid hsla(0, 0%, 100%, 0.05);
    border-bottom: 1px solid rgba(0, 0, 0, 0.2);
  }
  .el-scrollbar {
    // height: 200vh;
    padding-bottom: 50px;
  }
  .el-menu {
    border-right: none !important;
    padding-bottom: 100px;
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
    .el-pagination {
      text-align: center;
      margin-top: 20px;
    }
    .el-popper__arrow {
      display: none;
    }
  }
}
</style>
