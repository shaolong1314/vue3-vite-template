<script setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { logout } from "@/api/login";

const store = useStore();

const userInfo = computed(() => {
  return store.getters.userInfo;
});

const router = useRouter();

const route = useRoute();

const levelList = ref([]);

const getBreadcrumb = () => {
  // console.log("route", route);
  let matched = route.matched.filter((item) => item.meta && item.meta.title);
  const first = matched[0];

  if (first && first.name !== "Index") {
    matched = [{ path: "/index", name: "Index", meta: { title: "首页" } }].concat(matched);
  }
  levelList.value = matched;
};

watch(
  () => route.path,
  () => {
    getBreadcrumb();
  }
);

const handleLink = () => {
  router.replace("/index");
};
const onCommand = async (name) => {
  switch (name) {
    case "my":
      router.push("/my/info");
      break;
    case "exit":
      await store.dispatch("LogOut");
      router.replace("/login");
      break;
  }
};

onMounted(() => {
  getBreadcrumb();
});
</script>

<template>
  <div class="header">
    <div class="left">
      <el-breadcrumb class="app-breadcrumb" separator="/">
        <transition-group name="breadcrumb">
          <el-breadcrumb-item v-for="item in levelList" :key="item.path">
            <span v-if="item.name != 'Index'" class="no-redirect">{{ item.meta.title }}</span>
            <a v-else @click.prevent="handleLink(item)" style="color: var(--theme-color); font-weight: 700">{{ item.meta.title }}</a>
          </el-breadcrumb-item>
        </transition-group>
      </el-breadcrumb>
    </div>
    <div class="right">
      <!-- 工具栏 -->
      <ul class="app-topbar__tools">
        <li>
          <el-icon><BellFilled /></el-icon>
        </li>
      </ul>
      <!-- 用户信息 -->
      <div class="app-topbar__user">
        <el-dropdown trigger="click" hide-on-click @command="onCommand">
          <span class="el-dropdown-link">
            <span class="name">admin</span>
            <img class="avatar" :src="userInfo.avatar" v-if="userInfo.avatar" />
            <el-icon v-else><Avatar /></el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item command="my">
                <el-icon><User /></el-icon>
                <span>个人中心</span>
              </el-dropdown-item>
              <el-dropdown-item command="exit">
                <el-icon><SwitchButton /></el-icon>
                <span>退出</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "~/styles/transition.css";
</style>

<style scoped lang="scss">
.header {
  height: 100%;
  border-bottom: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  .right {
    display: flex;
    align-items: center;
    height: 100%;
    .app-topbar__tools,
    .app-topbar__user {
      height: 100%;
      display: flex;
      align-items: center;
    }
    .app-topbar__tools {
      margin-right: 20px;
      li {
        display: flex;
        justify-content: center;
        align-items: center;
        list-style: none;
        height: 45px;
        min-width: 45px;
        border-radius: 3px;
        cursor: pointer;
        margin-left: 10px;
      }
      li:hover {
        background-color: rgba(0, 0, 0, 0.1);
      }
    }
    .app-topbar__user {
      margin-right: 10px;
      cursor: pointer;
      .el-dropdown-link {
        display: flex;
        align-items: center;
        .avatar {
          height: 32px;
          width: 32px;
          border-radius: 32px;
        }
        .name {
          white-space: nowrap;
          margin-right: 15px;
          font-size: 18px;
        }
      }
      .el-icon-arrow-down {
        margin-left: 10px;
      }
    }
  }
}
</style>
