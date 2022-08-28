<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";

const loginForm = ref(null);
const loading = ref(false);
const ruleForm = reactive({
  username: "",
  password: "",
});
const store = useStore();
const router = useRouter();

const checked = ref(true);
const rules = {
  username: [{ required: "true", message: "账户不能为空", trigger: "blur" }],
  password: [{ required: "true", message: "密码不能为空", trigger: "blur" }],
};

const route = useRoute();
const redirect = computed(() => {
  return route.query && decodeURIComponent(route.query.redirect || "/");
});

const submitForm = () => {
  loginForm.value.validate((valid) => {
    if (valid) {
      const user = {
        name: ruleForm.username,
        password: ruleForm.password,
        type: "username",
      };
      loading.value = true;
      store
        .dispatch("Login", user)
        .then(() => {
          loading.value = false;
          router.replace({ path: redirect.value || "/" });
        })
        .catch((err) => {
          loading.value = false;
        });
    } else {
      return false;
    }
  });
};
const resetForm = () => {
  loginForm.value.resetFields();
};
</script>

<template>
  <div class="login-body">
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">Vue3.0 后台管理系统</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="color: #333">登录表示您已同意<a>《服务条款》</a></div>
          <el-button style="width: 100%" type="primary" @click="submitForm" :loading="loading">立即登录</el-button>
          <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.login-body {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  background-color: #fff;
  height: 100vh;
  /* background-image: linear-gradient(25deg, #077f7c, #3aa693, #5ecfaa, #7ffac2); */
}
.login-container {
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 41px 0px rgba(0, 0, 0, 0.2);
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 40px 0;
}
.head img {
  width: 100px;
  height: 100px;
  margin-right: 20px;
}
.head .title {
  font-size: 28px;
  color: var(--theme-color);
  font-weight: bold;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
</style>
<style>
.el-form--label-top .el-form-item__label {
  padding: 0;
}
.login-form .el-form-item {
  margin-bottom: 12px;
}
</style>
