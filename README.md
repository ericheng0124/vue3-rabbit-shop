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

