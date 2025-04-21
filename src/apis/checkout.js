import request from '@/utils/http'

// 订单相关接口

export const getCheckInfoAPI = ()=>{
  return request({
    url:'/member/order/pre'
  })
}