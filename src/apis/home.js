import httpInstance from '@/utils/http'

// 获取banner
export const getBannerAPI = (params = {})=>{
  // distributionSite 参数默认为1 商品为2
  const {distributionSite='1'} = params
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite
    }
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