import axios from 'axios'
import {
  closeLoading,
} from "@/utils/utils.js";
import { ElMessage } from 'element-plus'
// import {useRouter} from "vue-router";
// const router = useRouter();

import router from '@/router/router.js'
const service = axios.create({
  baseURL: '/PhyloScape/api',
  // baseURL:'/api',
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取token
    const token = localStorage.getItem('token') || ''
    // 设置参数格式
    if (!config.headers['Content-Type']) {
      config.headers = {
        'Content-Type': 'application/json'
        // application/x-www-form-urlencoded
      }
    }
    // 添加token到headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    // 鉴权参数设置
    if (config.method === 'get') {
      // get请求下 参数在params中，其他请求在data中
      config.params = config.params || {}
      // const json = JSON.parse(JSON.stringify(config.params))
    } else if(config.method === 'delete'){
      config.data = config.data || {}
    }  else if(config.method === 'put'){
      config.data = config.data || {}
    } else {
      config.data = config.data || {}
      // 一些处理操作
    }
    return config
  },
  (err) => {
    return Promise.reject(err)
  }
)
// 请求拦截器
service.interceptors.response.use(response => {
  const res = response.data
  if(res.code != "0"){
    closeLoading()
    ElMessage({
      message: res.msg,
      type: "error",
    });
  }
  return res
  
}, error => {
  // 请求失败、错误处理回调
  const originalRequest = error.config
  // 接口超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
    ElMessage.error('网络请求超时,请检查网络或刷新浏览器')
  } else if(error.response.status === 401){
    ElMessage.error(error.response.statusText)
    localStorage.removeItem('username')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    window.setTimeout(()=>{
      router.push("/accounts/login");
    },3000)
    
  } else {
    ElMessage.error('网络请求错误')
  }
  return Promise.reject(error)
})
export default service
