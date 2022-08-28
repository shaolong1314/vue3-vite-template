import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: {
      "~/": `${path.resolve(__dirname, "src")}/`,
      "@/": `${path.resolve(__dirname, "src")}/`,
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "~/styles/element-ui.scss" as *;`,
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      // Auto import functions from Vue, e.g. ref, reactive, toRef...
      // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
      imports: ["vue"],

      resolvers: [
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式，不添加将会导致使用ElMessage、ElNotification等组件时默认的主题色会覆盖自定义的主题色
          importStyle: "sass",
        }),
      ],
    }),
    Components({
      resolvers: [
        // 自动导入组件
        ElementPlusResolver({
          // 自动引入修改主题色添加这一行，使用预处理样式
          importStyle: "sass",
        }),
      ],
    }),
    ElementPlus({
      useSource: true,
    }),
  ],

  server: {
    proxy: {
      "/api": { target: "https://scbn.test.dev.mhjy.net.cn/", changeOrigin: true, rewrite: (path) => path.replace(/^\/api/, "") },
    },
    hmr: true,
    port: 8080,
    open: true,
  },

  build: {
    rollupOptions: {
      // https://rollupjs.org/guide/en/#outputmanualchunks
      output: {
        manualChunks: {
          index: ["../views/Index.vue"],
          login: ["../views/Login.vue"],
          error: ["../views/error/404.vue", "../views/error/401.vue"],
        },
      },
    },
  },
});
