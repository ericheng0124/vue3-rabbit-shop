# 小兔鲜商场项目



### 1.项目初始化
```
npm init vue@latest
```
项目名称：vue-rabbit
确认安装router，pinia，eslint检查

待vite安装完成之后，使用代码工具软件打开项目目录

**`因为是vue3的项目，所以这里nodejs环境需要使用node-js 18版本以上的node-js`**
```
nvm use 18
```
项目初始化配置安装，初始化依赖安装
```
npm install
```
新建项目所需的文件夹
src -|- apis
       |- composables
       |- directives
       |- styles
       |- utils


配置git
```
git init 	// 初始化项目目录
git add .    // 将初始化的文件夹内容添加到暂存区
git commit -m 'init commit' 	// 初始化提交到版本区
git branch -M main		// 生成分支main
git remote add origin https://github.com/ericheng0124/vue3-rabbit-shop.git 仓库的远程连接地址	// 添加远端仓库地址
git push -u origin main		// 推送本地main分支到远端仓库
git checkout -b dev		// 创建并切换到分支dev
git push origin dev		// 将本地dev推送到远端dev
```



### 2.项目起步-配置别名路径联想提示

#### 2.1 新建配置文件
在项目根路径下新增 `jsconfig.json` 文件



#### 2.2 添加json格式的配置项
```
{
  "compilerOptions":{
    "baseUrl":"./",
    "paths":{
      "@/*":[
        "src/*"
      ]
    }
  }
}
```
如果使用的是最新的vite创建的项目，则可以忽略，vite最新版的已经帮我们创建了，可以在vite.config.js下的jsconfig.json中查看配置详情

改配置项只做联想路径提示，实际做路径转换的位置是vite.config.js中。
```
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    // 实际的路径转换 @ -> src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})
```



### 3.引入ElementPlus

#### 3.1 安装ElementPlus
```
# NPM
$ npm install element-plus --save

# Yarn
$ yarn add element-plus

# pnpm
$ pnpm install element-plus
```

#### 3.2 配置按需导入
根据官方文档配置按需导入，需要安装对应插件
```
npm install -D unplugin-vue-components unplugin-auto-import
```
安装完毕之后，需要对vite.config.js进行配置插件
```
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 1.引入插件配置ElementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // 2.配置ElementPlus按需引入的插件
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    // 实际的路径转换 @ -> src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
})

```
***这里注意配置完之后需要重新启动一下项目，确保配置生效***




#### 3.3 ElementPlus主题定制

`如何项目的主题色与ElementPlus主题色存在冲突，可以通过定制主题让ElementPlus的主题色和项目保持一致。`

##### 3.3.1 安装sass
```
npm i sass -D
```

##### 3.3.2 设置定制化的样式文件
在src/style/index.scss，内编辑项目的样式。
一下是官方文档说明：
```
// styles/element/index.scss
/* 只需要重写你需要的即可 */
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      'base': green,
    ),
  ),
);

// 如果只是按需导入，则可以忽略以下内容。
// 如果你想导入所有样式:
// @use "element-plus/theme-chalk/src/index.scss" as *;
```
该项目的配置文件如下：
```
/* 只需要重写你需要的即可 */
@forward 'element-plus/theme-chalk/src/common/var.scss' with (
  $colors: (
    'primary': (
      // 主色
      'base': #27ba9b,
    ),
    'success': (
      // 成功色
      'base': #1dc779,
    ),
    'warning': (
      // 警告色
      'base': #ffb302,
    ),
    'danger': (
      // 危险色
      'base': #e26237,
    ),
    'error': (
      // 错误色
      'base': #cf4444,
    ),
  )
)
```
##### 3.3.3 配置自动导入
这里自动导入需要深入到ElementPlus的组件中，按照官方配置文档来。
    1. 配置ElementPlus采用sass样式配色系统
    2. 自动导入定制化样式文件进行样式覆盖

对vite.config.js文件进行配置修改如下：
```
import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// 配置ElementPlus按需导入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    // ElementPlus按需引入的插件配置
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      // resolvers: [ElementPlusResolver()],
      resolvers:[
        // 自定义主题：1. 配置ElementPlus采用sass样式配色系统
        ElementPlusResolver({
          importStyle:'sass'
        })
      ]
    }),
  ],
  resolve: {
    // 实际的路径转换 @ -> src
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  // 自定义主题：2. 配置ElementPlus自动导入
  css: {
    preprocessorOptions: {
      scss: {
        // 自动导入定制化样式文件进行样式覆盖
        additionalData: `
          @use "@/styles/element/index.scss" as *;
        `,
      }
    }
  }
})

```

### 4. axios基础配置

#### 4.1 安装axios
```
npm install axios
```

#### 4.2 配置axios的基础封装

在`src/utils/`路径下创建http.js文件

  1. 引入axios
  2. 创建axios实例对象：添加项目基础地址和超时时间
  3. 配置请求拦截器和响应拦截器
  4. 导出创建的axios实例对象
```
// axios基础的封装
import axios from "axios"

const httpInstance = axios.create({
  // 项目基础地址
  baseURL: "http://pcapi-xiaotuxian-front-devtest.itheima.net",
  // 请求超时时间
  timeout: 5000,
})

// 拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// axios响应式拦截器
httpInstance.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么
  return response.data
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  return Promise.reject(error)
})

export default httpInstance
```