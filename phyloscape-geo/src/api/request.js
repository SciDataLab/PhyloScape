import axios from 'axios'
import { ElMessage } from 'element-plus'
const service = axios.create({
  baseURL: '/geo/api',
})
// 请求拦截器
service.interceptors.request.use(
  (config) => {
    // 获取token
    const token = "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOjUxLCJpYXQiOjE2NjczODU0MjQsIm5iZiI6MTY2NzM4NTQyNCwianRpIjoiNzQ0NWI4MGItNmRmZi00NjQ0LThiOTUtZTdhMTJkYzgzZTA2IiwiZXhwIjoxNjY3NDU3NDI0LCJ0eXBlIjoiYWNjZXNzIiwiZnJlc2giOmZhbHNlfQ.pGmo7MBGwvGAXF_j9EBZNuLJVWmwJ2U5EMrCnpTewzI"
    // 设置参数格式
    if (!config.headers['Content-Type']) {
      config.headers = {
        'Content-Type': 'application/json'
        // application/x-www-form-urlencoded
      }
    }
    // 添加token到headers
    if (token) {
      config.headers.Authorization = token
    }
    // 鉴权参数设置
    if (config.method === 'get') {
      // get请求下 参数在params中，其他请求在data中
      config.params = config.params || {}
      // const json = JSON.parse(JSON.stringify(config.params))
    } else if(config.method === 'delete'){
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
  return res
  // if (res.code !== 200) {
  //   Message({
  //     message: res.msg || 'Error',
  //     type: 'error',
  //     duration: 2000,
  //     showClose: true
  //   })
  //   return Promise.reject(new Error(res.error || 'Error'))
  // } else {
  //   return res
  // }
}, error => {
  // 请求失败、错误处理回调
  const originalRequest = error.config

  // 接口超时
  if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1 && !originalRequest._retry) {
    ElMessage('网络请求超时,请检查网络或刷新浏览器')
    // 不是 自己处理的error错误的才超时请求2次
  } else {
    ElMessage('网络请求错误')
    // Message({
    //   message: '网络请求错误',
    //   type: 'error',
    //   duration: 2000
    // })
  }

  return Promise.reject(error)
})
export default service
