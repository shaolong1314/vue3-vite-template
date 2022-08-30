<script setup>
import { onMounted, ref, watch } from "@vue/runtime-core";
import { useRoute } from "vue-router";
import { useStore } from "vuex";

const store = useStore();

const userInfo = computed(() => {
  return store.getters.userInfo;
});

const name = "admin";

const logout = () => {};

const route = useRoute();

const levelList = ref([]);

const getBreadcrumb = () => {
  // console.log("route", route);
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];

  if (first && first.name !== "Index") {
    matched = [{ path: "/index", meta: { title: "首页" } }].concat(matched);
  }
  levelList.value = matched;
};

watch(
  () => route.path,
  () => {
    getBreadcrumb();
  }
);

const handleLink = () => {};

onMounted(() => {
  getBreadcrumb();
});
</script>

<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="(item, index) in levelList" :key="item.path">
            <span v-if="item.redirect === 'noredirect' || index == levelList.length - 1" class="no-redirect">{{ item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="right">
      <el-popover placement="bottom" :width="320" trigger="click" popper-class="popper-user-box">
        <template #reference>
          <div class="author">
            <el-icon><Avatar /></el-icon>
            {{ userInfo && userInfo.name }}
            <el-icon><CaretBottom /></el-icon>
          </div>
        </template>
        <div class="nickname">
          <p>登录名：{{ userInfo && userInfo.name }}</p>
          <p>角色：{{ userInfo && userInfo.role && userInfo.role.name }}</p>
          <el-tag size="small" effect="dark" class="logout" @click="logout">退出</el-tag>
        </div>
      </el-popover>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/styles/transition.css";
</style>

<style scoped>
.header {
  height: 50px;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
.el-icon-back {
  border: 1px solid #e9e9e9;
  padding: 4px;
  border-radius: 50px;
  margin-right: 10px;
}
.right > div > .icon {
  font-size: 18px;
  margin-right: 6px;
}
.author {
  margin-left: 10px;
  cursor: pointer;
}
</style>
<style>
.popper-user-box {
  border-radius: 0 !important;
}
.popper-user-box .nickname {
  position: relative;
}
.popper-user-box .nickname .logout {
  position: absolute;
  right: 0;
  top: 0;
  cursor: pointer;
}
</style>
