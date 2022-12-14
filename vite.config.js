import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import ElementPlus from "unplugin-element-plus/vite";
import path from "path";
import viteCompression from "vite-plugin-compression";
import eslintPlugin from "vite-plugin-eslint";

import { visualizer } from "rollup-plugin-visualizer";
import externalGlobals from "rollup-plugin-external-globals";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const _process = { ...process.env, ...loadEnv(mode, process.cwd()) };

  console.log("=================================================");
  console.log(`当前环境为${mode}，api为${_process.VITE_BASE_URL}`);
  console.log(`当前环境为${mode}，当前项目应部署在为${_process.VITE_BASE_DOMAIN}下`);
  console.log("=================================================");

  // 非开发环境采用自动导入
  const componentsResolvers = [];
  if (mode == "production") {
    componentsResolvers.push(
      // 自动导入组件
      // eslint-disable-next-line new-cap
      ElementPlusResolver({
        // 自动引入修改主题色添加这一行，使用预处理样式
        importStyle: "sass"
      })
    );
  }

  const config = {
    base: "/" + _process.VITE_BASE_DOMAIN, // 项目目录
    resolve: {
      alias: {
        "~/": `${path.resolve(__dirname, "src")}/`,
        "@/": `${path.resolve(__dirname, "src")}/`
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "~/styles/element-ui.scss" as *;`
        }
      }
    },
    plugins: [
      vue(),
      eslintPlugin({
        include: ["src/**/*.js", "src/**/*.vue"],
        exclude: ["./node_modules/**"],
        cache: false
      }),
      // eslint-disable-next-line new-cap
      AutoImport({
        // Auto import functions from Vue, e.g. ref, reactive, toRef...
        // 自动导入 Vue 相关函数，如：ref, reactive, toRef 等
        imports: ["vue"],

        resolvers: componentsResolvers
      }),
      // eslint-disable-next-line new-cap
      Components({
        resolvers: componentsResolvers
      }),
      // eslint-disable-next-line new-cap
      ElementPlus({
        useSource: true
      }),
      // eslint-disable-next-line new-cap
      mode == "development" && ElementPlusAllImport(),
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      }),
      visualizer()
    ],

    server: {
      proxy: {
        "/api": { target: _process.VITE_BASE_URL, changeOrigin: true, rewrite: (path) => path.replace(/^\/api/, "") }
      },
      hmr: true,
      port: 8088,
      open: false,
      host: "0.0.0.0"
    },

    build: {
      minify: "terser",
      terserOptions: {
        compress: {
          // warnings: false,
          drop_console: true, // 打包时删除console
          drop_debugger: true, // 打包时删除 debugger
          pure_funcs: ["console.log"]
        },
        output: {
          // 去掉注释内容
          comments: true
        }
      },
      rollupOptions: {
        // https://rollupjs.org/guide/en/#outputmanualchunks
        output: {
          manualChunks: {
            ElementPlusIcon: ["@element-plus/icons-vue"],
            Particles: ["vue3-particles", "tsparticles"],
            Mock: ["mockjs"]
          }
        },
        external: ["echarts", "axios", "nprogress"],
        plugins: [
          externalGlobals({
            echarts: "echarts",
            axios: "axios",
            nprogress: "NProgress"
          })
        ]
      }
    }
  };

  return config;
});

// 自定义插件
function ElementPlusAllImport() {
  console.log("开发环境");
  return {
    name: "elementPlus-all-import",
    transform(code, id) {
      // 判断是否在src/main.js文件上
      if (/\/src\/main.js$/.test(id)) {
        const name = "ElementPlus ";
        // 引入element组件和样式
        const prepend = `import ${name} from 'element-plus'; \n import 'element-plus/dist/index.css';`;

        // 使用use挂载
        code = code.replace(/(\.mount)/, `.use(${name})$1`);

        return prepend + code;
      }
      return code;
    }
  };
}
