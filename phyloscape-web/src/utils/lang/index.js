import { createI18n } from 'vue-i18n'
import en from './en' //英文
import zh from './zh' //中文
 
const i18n = createI18n({
  legacy: false, // 使用CompotitionAPI必须添加这条.
  locale: localStorage.getItem('lang') || 'en', // set locale设置默认值
  fallbackLocale: 'en', // set fallback locale
  messages: {
    en,
    zh, // set locale messages
  },
})
 
export default i18n