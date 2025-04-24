// axios基础的封装
import axios from "axios"
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/userStore"
import router from "@/router"

const httpInstance = axios.create({
  // 项目基础地址
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  // 请求超时时间
  timeout: 50000,
})

// 拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 1.从pinia中获取token数据
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  // 2.按照后端要求拼接token数据到请求头中
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// axios响应式拦截器
httpInstance.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, e => {
  const userStore = useUserStore()
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 统一错误提示
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })
  // 401 token失效处理
  if(e.response.status === 401){
    // 1. 清除本地用户信息
    userStore.clearUserInfo()
    // 2. 跳转到登录页
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance