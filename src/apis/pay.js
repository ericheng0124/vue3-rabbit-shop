import request from '@/utils/http'

// 订单相关接口
export const getOrderAPI = (id)=>{
  return request({
    url:`/member/order/${id}`
  })
}

