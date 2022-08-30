<script setup>
import { ref } from "vue";

const number = ref(0);
setTimeout(() => {
  number.value = 10;
}, 1000);
</script>
<template>
  <div class="page-menu">
    <el-card>
      <div>商品分类: {{ number }}</div>
    </el-card>
  </div>
</template>
<style lang="scss" scoped></style>
