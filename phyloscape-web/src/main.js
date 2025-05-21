import { createApp } from 'vue'
import 'default-passive-events'
import './style.css'
import ElementPlus from 'element-plus'
import './assets/plugins/plugServe.main.js'
import 'element-plus/dist/index.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from '@/router/router'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import uploader from 'vue-simple-uploader'
import i18n from '@/utils/lang'
import VMdEditor from '@kangc/v-md-editor';
import '@kangc/v-md-editor/lib/style/base-editor.css';
import vuepressTheme from '@kangc/v-md-editor/lib/theme/vuepress.js';
import '@kangc/v-md-editor/lib/theme/style/vuepress.css';
import VMdPreview from '@kangc/v-md-editor/lib/preview';
import '@kangc/v-md-editor/lib/style/preview.css';
// Prism
import Prism from 'prismjs';
// highlight code
import 'prismjs/components/prism-json';


VMdPreview.use(vuepressTheme, {
  Prism,
});

VMdEditor.use(vuepressTheme, {
  Prism,
  config: {
    toc: {
      includeLevel: [3, 4],
    },
  },
});

const app = createApp(App)
app.use(createPinia()).use(router).use(ElementPlus).use(uploader).use(i18n).use(VMdEditor).use(VMdPreview)
app.mount('#app')
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}