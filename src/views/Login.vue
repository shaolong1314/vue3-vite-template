<script setup>
import { computed, reactive, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { loadFull } from "tsparticles";

const loginForm = ref(null);
const loading = ref(false);
const ruleForm = reactive({
  username: "",
  password: ""
});
const store = useStore();
const router = useRouter();

const checked = ref(true);
const rules = {
  username: [{ required: "true", message: "账户不能为空", trigger: "blur" }],
  password: [{ required: "true", message: "密码不能为空", trigger: "blur" }]
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
        type: "username"
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

const options = reactive({
  background: {
    color: {
      value: "#2f3447" // 粒子颜色
    }
  },
  fpsLimit: 60,
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: "push" // 可用的click模式有: "push", "remove", "repulse", "bubble"。
      },
      onHover: {
        enable: true,
        mode: "grab" // 可用的hover模式有: "grab", "repulse", "bubble"。
      },
      resize: true
    },
    modes: {
      bubble: {
        distance: 400,
        duration: 2,
        opacity: 0.8,
        size: 40
      },
      push: {
        quantity: 4
      },
      repulse: {
        distance: 200,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: "#ffffff"
    },
    links: {
      color: "#ffffff", // '#dedede'。线条颜色。
      distance: 120, // 线条长度
      enable: true, // 是否有线条
      opacity: 0.4, // 线条透明度。
      width: 1 // 线条宽度。
    },
    collisions: {
      enable: false
    },
    move: {
      direction: "none",
      enable: true,
      outMode: "bounce",
      random: false,
      speed: 2, // 粒子运动速度。
      straight: false
    },
    number: {
      density: {
        enable: true,
        area: 500
      },
      value: 20 // 粒子数量。
    },
    opacity: {
      value: 0.4 // 粒子透明度。
    },
    shape: {
      type: "circle" // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
    },
    size: {
      random: true,
      value: 5
    }
  },
  detectRetina: true
});
const particlesInit = async (engine) => {
  await loadFull(engine);
};
const particlesLoaded = async (container) => {
  console.log("Particles container loaded", container);
};
</script>

<template>
  <div class="login-body">
    <Particles id="tsparticles" :options="options" :particlesInit="particlesInit" :particlesLoaded="particlesLoaded" style="width: 100vw; height: 100vh" />
    <div class="login-container">
      <div class="head">
        <div class="name">
          <div class="title">前端技术开发有限公司</div>
          <div class="sm-title">Vue3.0后台管理系统</div>
        </div>
      </div>
      <el-form label-position="top" :rules="rules" :model="ruleForm" ref="loginForm" class="login-form">
        <el-form-item label="账号" prop="username">
          <el-input type="text" v-model.trim="ruleForm.username" autocomplete="off" placeholder="admin"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model.trim="ruleForm.password" autocomplete="off" placeholder="123456"></el-input>
        </el-form-item>
      </el-form>
      <div class="login-btns marginTop15">
        <el-button style="width: 100%" type="primary" @click="submitForm" :loading="loading">立即登录</el-button>
        <el-checkbox v-model="checked" @change="!checked">下次自动登录</el-checkbox>
      </div>
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
  background-color: #2f3447;
  position: relative;
}
.login-container {
  position: absolute;
  width: 420px;
  height: 500px;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0px 0px 41px 0px rgba(0, 0, 0, 0.2);
  z-index: 9999;
}
.head {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 0 40px 0;
  .sm-title {
    text-align: center;
    font-size: 18px;
    font-weight: bold;
  }
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
  margin-bottom: 20px;
}
.head .tips {
  font-size: 12px;
  color: #999;
}
.login-form {
  width: 70%;
  margin: 0 auto;
}
.login-btns {
  width: 70%;
  margin: 25px auto 0;
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
