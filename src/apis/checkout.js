import request from '@/utils/http'

// 订单相关接口
// 获取订单详情信息
export const getCheckInfoAPI = ()=>{
  return request({
    url:'/member/order/pre'
  })
}

//  创建订单
export const createOrderAPI = (data)=>{
  return request({
    url:'/member/order',
    method:'POST',
    data
  })
}



