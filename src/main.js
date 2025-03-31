import { createApp } from "vue"
import { createPinia } from "pinia"

import App from "./App.vue"
import router from "./router"

// 引入初始化样式
import "@/styles/common.scss"

// 引入懒加载插件并注册
import { lazyPlugin } from "@/directives/index"
// 引入全局组件
import { componentPlugin } from "./components/index"

import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

const app = createApp(App)

app.use(pinia)
app.use(router);
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount("#app")