import { createApp } from 'vue'
import './assets/plugins/plugServe.main.js'
import './assets/plugins/turf.min.js'
import './style.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from '@/router/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import uploader from 'vue-simple-uploader'

const app = createApp(App)
app.use(createPinia()).use(router).use(ElementPlus).use(uploader)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}