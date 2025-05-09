// 封装购物车模块

import { defineStore } from "pinia"
import { ref,computed } from "vue"
import { useUserStore } from "./userStore"
import { insertCartAPI,findNewCartListAPI,delCartListAPI } from "@/apis/cart"


export const useCartStore = defineStore('cart',()=>{
  const userStore = useUserStore()
  // 判断用户是否登陆
  const isLogin = computed(()=>userStore.userInfo.token)
  // 1. 定义state
  const cartList = ref([])

  // 2. 定义action

  // 获取最新购物车列表action
  const updateNewList = async()=>{
    // 获取最新的购物车列表
    const res = await findNewCartListAPI()
    // 覆盖本地购物车列表
    cartList.value = res.result
  }

  
  // addCart - 添加购物车
  const addCart = async(goods)=>{
    const {skuId,count} = goods
    if(isLogin.value){
      // 登陆之后的加入购物车逻辑
      // 加入购物车
      await insertCartAPI({skuId,count})
      // // 获取最新的购物车列表
      // const res = await findNewCartListAPI()
      // // 覆盖本地购物车列表
      // cartList.value = res.result
      updateNewList()
    }else{
      // 本地购物车逻辑
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
  }

  // 删除购物车
  const delCart = async(skuId)=>{
    if(isLogin.value){
      // 登陆
      await delCartListAPI([skuId])
      // // 获取最新的购物车列表
      // const res = await findNewCartListAPI()
      // // 覆盖本地购物车列表
      // cartList.value = res.result
      updateNewList()
    }else{
      // 未登录，走本地
      // 思路：
      // 1. 找到要删除的商品在列表中的下标值 - splice
      // const idx = cartList.value.findIndex(item=>skuId === item.skuId)
      // cartList.value.splice(idx,1) 
      // 2. 使用数组的过滤方法 - filter
      const newList = cartList.value.filter(item=>skuId !== item.skuId)
      cartList.value = newList
    }
  }

  

  // 清空购物车action
  const clearCart = ()=>{
    cartList.value = []
  }  

  // 单选功能
  const singCheck = (skuId,selected)=>{
    // 通过skuId找到需要修改的商品 然后将selected字段修改为传过来的值
    cartList.value.find(item=>item.skuId === skuId).selected = selected
  }

  // 全选功能
  const allCheck = (selected)=>{
    // 将cartList的每一项的selected的值都设置为当前全选框的状态
    // 遍历cartList，修改每一项的selected属性
    cartList.value.forEach(item=>item.selected = selected)
  }
  

  // 计算属性
  // 1. 总数量 所有项的count之和
  const allCount = computed(()=>cartList.value.reduce((a,c)=>a + c.count,0))
  // 2. 总价 所有项的count*price之和
  const allPirce = computed(()=>cartList.value.reduce((a,c)=>a+c.count*c.price,0))
  // 3. 全选功能
  const isAll = computed(()=>cartList.value.length > 0? cartList.value.every(item=>item.selected):false)
  // 4. 选中的商品数量
  const selectedCount = computed(()=>cartList.value.filter(item=>item.selected).reduce((int,cur)=>int+cur.count,0))
  // 5. 选中的商品总价
  const selectedPrice = computed(()=>cartList.value.filter(item=>item.selected).reduce((int,cur)=>int+cur.count*cur.price,0))
  // 6. 选中的商品列表
  const selectedList = computed(()=>cartList.value.filter(item=>item.selected))

  // 3. retrun 出去所有的state和action
  return {
    cartList,
    addCart,
    delCart,
    allCount,
    allPirce,
    updateNewList,
    clearCart,
    singCheck,
    isAll,
    allCheck,
    selectedCount,
    selectedPrice,
    selectedList
  }
},{
  persist:true
})