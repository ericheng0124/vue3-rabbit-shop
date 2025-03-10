import httpInstance from '@/utils/http'

// 获取banner
export const getBannerAPI = ()=>{
  return httpInstance({
    url:'/home/banner'
  })
}