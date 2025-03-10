import httpInstance from "@/utils/http"

// 获取分类列表
export const getCategoryAPI = ()=>{
  return httpInstance({
    url:'/home/category/head'
  })
}