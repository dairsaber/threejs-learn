import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import vueJsx from "@vitejs/plugin-vue-jsx"
import vueSetupExtend from "vite-plugin-vue-setup-extend"
import glslify from "vite3-plugin-glslify"
import * as path from "path"
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8888,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  plugins: [
    vue(),
    vueJsx(),
    // 添加支持setup语法糖扩展 标签中可以加入name属性
    vueSetupExtend(),
    glslify(),
  ],
})
