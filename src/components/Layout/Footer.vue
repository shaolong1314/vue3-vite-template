<!--
 * @Author: shaolong
 * @Date: 2022-08-24 16:14:16
 * @LastEditors: shaolong
 * @LastEditTime: 2022-10-27 14:11:57
 * @Description: layout底部模块
-->
<template>
  <div class="footer">
    <div class="left">Your Copyright.</div>
    <div class="right">
      <a target="_blank" href="https://cn.vuejs.org/">vue3-admin Version 3.2.37</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "VFooter"
};
</script>

<style scoped>
.footer {
  height: 100%;
  border-top: 1px solid #e9e9e9;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
}
</style>
