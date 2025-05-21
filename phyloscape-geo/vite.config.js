import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  base: '/geo/',
  build: {
    outDir: "dist",
  },
  plugins: [
    vue(),
  ],
  resolve: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  server: {
    proxy: {
      '/api': {
        target: "http://10.0.90.58:6789", // 需要代理的域名，目标域名，会替换掉匹配字段之前的路径
        ws: true, // 是否启用websockets
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/api/, '')
      },
      'img':{
        target: "http://10.0.90.58:5173/", // 需要代理的域名，目标域名，会替换掉匹配字段之前的路径
        ws: true, // 是否启用websockets
        changeOrigin: true, //是否跨域
        rewrite: (path) => path.replace(/^\/img/, '')
      },
      '/areas_v3':{
        target: "https://geo.datav.aliyun.com",
        changeOrigin: true,
        secure: false
      }
    }
  }
})
