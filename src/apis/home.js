import httpInstance from '@/utils/http'

// 获取banner
export const getBannerAPI = ()=>{
  return httpInstance({
    url:'/home/banner'
  })
}


// 获取新鲜好物请求
export const getNewAPI = ()=>{
  return httpInstance({
    url:'/home/new'
  })
}

// 获取人气推荐请求
export const getHotAPI = ()=>{
  return httpInstance({
    url:'/home/hot'
  })
}

// 获取所有商品模块
export const getGoodsAPI = ()=>{
  return httpInstance({
    url:'/home/goods'
  })
}