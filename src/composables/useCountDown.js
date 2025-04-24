// 封装倒计时函数
import { computed, onMounted, onUnmounted, ref } from "vue"
import dayjs from 'dayjs'


export const useCountDown = ()=>{
  const timer = null
  // 1. 响应式数据
  const time = ref(0)
  // 根式化时间为xx分xx秒
  const formatTime = computed(()=>dayjs.unix(time.value).format('mm分:ss秒'))

  // 2. 开始倒计时的函数
  const start = (currentTime)=>{
    // 编写开始倒计时的逻辑
    // 核心逻辑编写：每隔1s就减1
    time.value = currentTime
    timer = setInterval(()=>{
      time.value--
      if(time.value <= 0){
        clearInterval(timer)
      }
    },1000)
  }
  // 组件销毁时清除定时器
  onUnmounted(()=>{
    timer && clearInterval(timer)
  })
  return {
    formatTime,
    start
  }
}
