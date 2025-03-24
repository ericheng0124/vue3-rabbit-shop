import request from '@/utils/http'

// 登陆请求
export const loginAPI = ({account,password})=>{
  return request({
    url:'/login',
    method:'POST',
    data:{
      account,
      password
    }
  })
}