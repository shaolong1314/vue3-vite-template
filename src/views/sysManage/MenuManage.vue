<script setup>
import { ref } from "vue";
import { getRolesList } from "../../api/sysManage/roleManage";

const number = ref(0);
setTimeout(() => {
  number.value = 10;
}, 1000);
</script>
<template>
  <div class="page-menu">
    <el-card>
      <div>菜单管理: {{ number }}</div>
      123356
    </el-card>
  </div>
</template>

<style lang="scss" scoped></style>
