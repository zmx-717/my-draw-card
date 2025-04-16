import axios from 'axios'

// 创建 axios 实例
const service = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API, // 使用环境变量
  timeout: 5000 // 请求超时时间
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    // 可以在这里添加 token 等
    return config
  },
  error => {
    // 对请求错误做些什么
    console.error(error)
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  response => {
    // 对响应数据做些什么
    return response.data
  },
  error => {
    // 对响应错误做些什么
    console.error(error)
    return Promise.reject(error)
  }
)

export default service