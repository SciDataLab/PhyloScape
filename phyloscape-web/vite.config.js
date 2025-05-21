import {
  defineConfig
} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from "path"
import AutoImport from 'unplugin-auto-import/vite'
let Version = new Date().getTime() // 示例：使用当前时间戳作为版本号
export default defineConfig({
  base:'/PhyloScape/',
  // base:'demo',
  build: {
    outDir: "dist",
    rollupOptions: {
      output: {
        // 在chunk和asset文件名中插入[hash]或[chunkhash]以获得基于内容的哈希
        // entryFileNames: '[name].[hash].js',
        // chunkFileNames: 'chunks/[name].[hash].js',
        // assetFileNames: 'assets/[name].[hash][extname]',
        // 或者如果你想使用固定的版本号而非哈希：
        entryFileNames: `[name].v${Version}.js`,
        chunkFileNames: `chunks/[name].v${Version}.js`,
        assetFileNames: `assets/[name].v${Version}[extname]`,
      },
    },
  },
  optimizeDeps: {
    include: ['@kangc/v-md-editor/lib/theme/vuepress.js'],
  },
  plugins: [
    vue(),
    AutoImport({
      imports:[
        'vue-i18n',
      ],
      dts:'./auto-imports.d.ts',
      eslintrc:{
        enabled:false,//配置更新时临时设为true
      }
    }),
  ],
  resolve: {
    // 配置别名
    alias: {
      "@": path.resolve(__dirname, "src"),
      'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
    }
  },
  server: {
    proxy: {
      "/PhyloScape/api": {
        target: "http://10.0.90.58:6789",
        ws: true,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/PhyloScape\/api/, '')
      },
      "/imgs":{
        target: "http://10.0.90.58:6789",
        ws: true,
        changeOrigin: true,
      },
      "/img":{
        target: "http://10.0.90.58:5173",
        ws: true,
        changeOrigin: true,
      },
      '/map':{
        target:"http://127.0.0.1:5173/",
        rewrite: (path) => path.replace(/^\/map/, '')
      },
      // '/areas_v3':{
      //   target: "https://geo.datav.aliyun.com",
      //   changeOrigin: true,
      //   secure: false
      // }
    }
  }
})
