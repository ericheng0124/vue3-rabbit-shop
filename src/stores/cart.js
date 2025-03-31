// 封装购物车模块

import { defineStore } from "pinia"
import { ref } from "vue"

export const useCartStore = defineStore('cart',()=>{
  // 1. 定义state
  const cartList = ref([])
  // 2. 定义action - addCart
  const addCart = (goods)=>{
    // 添加购物车操作编写逻辑
    // 已添加过：count + 1 ，未添加过：push
    // 思路：通过匹配传递过来的skuId是否能在cartList中找到，找到了表示添加过反之则未添加过
    const item = cartList.value.find((item)=>goods.skuId === item.skuId)
    if(item){
      // 找到了
      item.count++
    }else{
      cartList.value.push(goods)
    }
  }
  // 3. retrun 出去所有的state和action
  return {
    cartList,
    addCart
  }
})