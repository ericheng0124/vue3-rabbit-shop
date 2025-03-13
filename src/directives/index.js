// 懒加载插件
import { useIntersectionObserver } from "@vueuse/core"

export const lazyPlugin = {
  install (app){
    // 懒加载指令逻辑
    app.directive("img-lazy", {
      mounted(el, binding) {
        // el: 指令所绑定的元素，可以用来直接操作 DOM
        // binding: binding.value 是传给指令的值(指令等于号后面绑定的表达式的值，这里就是图片url），binding.arg 是传给指令的参数
        console.log(el, binding.value)
    
        const {stop} = useIntersectionObserver(
          el,
          ([{isIntersecting}]) => {
            console.log(isIntersecting)
            if(isIntersecting){
              // 如果图片进入视口区域，将图片的src属性设置为指令的值
              el.src = binding.value
              stop()
            }
          },
        )
      }
    })
  }
}