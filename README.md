# 小兔鲜商场项目

### 1.项目初始化

```cmd
npm init vue@latest
```

项目名称：vue-rabbit
确认安装 router，pinia，eslint 检查

待 vite 安装完成之后，使用代码工具软件打开项目目录

**`因为是vue3的项目，所以这里nodejs环境需要使用node-js 18版本以上的node-js`**

```cmd
nvm use 18
```

项目初始化配置安装，初始化依赖安装

```cmd
npm install
```

新建项目所需的文件夹
src -|- apis
|- composables
|- directives
|- styles
|- utils

配置 git

```cmd
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

#### 2.2 添加 json 格式的配置项

```json
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

如果使用的是最新的 vite 创建的项目，则可以忽略，vite 最新版的已经帮我们创建了，可以在 vite.config.js 下的 jsconfig.json 中查看配置详情

改配置项只做联想路径提示，实际做路径转换的位置是 vite.config.js 中。

```js
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

### 3.引入 ElementPlus

#### 3.1 安装 ElementPlus

```cmd
# NPM
$ npm install element-plus --save

# Yarn
$ yarn add element-plus

# pnpm
$ pnpm install element-plus
```

#### 3.2 配置按需导入

根据官方文档配置按需导入，需要安装对应插件

```cmd
npm install -D unplugin-vue-components unplugin-auto-import
```

安装完毕之后，需要对 vite.config.js 进行配置插件

```js
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

**_这里注意配置完之后需要重新启动一下项目，确保配置生效_**

#### 3.3 ElementPlus 主题定制

`如何项目的主题色与ElementPlus主题色存在冲突，可以通过定制主题让ElementPlus的主题色和项目保持一致。`

##### 3.3.1 安装 sass

```cmd
npm i sass -D
```

##### 3.3.2 设置定制化的样式文件

在 src/style/index.scss，内编辑项目的样式。
一下是官方文档说明：

```scss
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

```scss
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

这里自动导入需要深入到 ElementPlus 的组件中，按照官方配置文档来。 1. 配置 ElementPlus 采用 sass 样式配色系统 2. 自动导入定制化样式文件进行样式覆盖

对 vite.config.js 文件进行配置修改如下：

```js
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

### 4. axios 基础配置

#### 4.1 安装 axios

```cmd
npm install axios
```

#### 4.2 配置 axios 的基础封装

在`src/utils/`路径下创建 http.js 文件

1. 引入 axios
2. 创建 axios 实例对象：添加项目基础地址和超时时间
3. 配置请求拦截器和响应拦截器
4. 导出创建的 axios 实例对象

```js
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

### 5. 解决 eslint 命名规则错误提示

在 eslint.config.js 文件中添加修改命名规则检测

```js
require('@rushstack/eslint-patch/modern-module-resolution')

Mudule.exports = {
	root:ture,
	'extends':[
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'@vue/eslint-config-typescript',
	],
	parserOptions:{
		ecmaVersion:'latest',
	},
	rules:{
		'vue/multi-word-commponent-names':0,  // 不在强制要求组件命名
	},
}
```

### 6 router 路由设置

在 views 文件夹中新建 2 个页面组件 src/views/Layout/index.vue 和 src/views/Login/index.vue
创建基础模板

```js
<!-- 首页组件 -->
<template>
  <div>
    <h1>我是首页</h1>
  </div>
</template>

<!-- 登录页组件 -->
<template>
  <div>
    <h1>我是登陆页</h1>
  </div>
</template>
```

**找到 router 文件夹，修改 index.js 文件，创建 2 个一级路由**

```js
// createRouter: 创建路由实例
// createWebHistory: 创建history模式路由
// import.meta.env.BASE_URL: 项目的基础路径

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和components对应关系的位置
  routes: [
    {
      path:'/',
      component: Layout,
    },
    {
      path:'/login',
      component: Login,
    }
  ],
})

export default router

```

**配置二级路由**
在 views 目录下新建 2 个二级路由页面文件夹 Home 和 Category
分别在创建 2 个二级路由页面

```js
<!-- Home/index.vue -->
<template>
  <div>
    我是Home页
  </div>
</template>

<!-- Category/index.vue -->
<template>
  <div>
    我是分类页
  </div>
</template>
```

在 router/index.js 中配置二级路由

```js
// createRouter: 创建路由实例
// createWebHistory: 创建history模式路由
// import.meta.env.BASE_URL: 项目的基础路径
// children: 子路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和components对应关系的位置
  routes: [
    {
      path:'/',
      component: Layout,
      // children：子路由属性
      children:[
        {
          // path设置为空，表示默认子路由
          path:'',
          component: Home
        },
        {
          path:'/category',
          component: Category
        }
      ]
    },
    {
      path:'/login',
      component: Login,
    }
  ],
})

export default router

```

### 7 静态资源引入

**图片资源和样式资源**
资源说明

1. 实际工作中的图片资源通常由 UI 设计师提供，常见的图片格式有 png，svg 等都是由 UI 切图交给前端
2. 样式资源通常是指项目初始化的时候进行样式重置，常见的比如开源的 normalize.css 或者手写

资源操作

1. 图片资源-把 images 文件夹放到 assets 目录下
2. 样式资源-把 common.scss 文件放到 styles 目录下

将项目准备的静态资源按照对应文件类型分别拷贝至响应的目录下
拷贝完之后将样式文件，在项目入口文件处 main.js 中引入使用

```js
// 引入初始化样式
import '@/styles/common.scss'
```

再次重启项目让样式生效

### 8 安装 error lens

error lens 是一个实时提供错误警告信息的 VScode 插件，方便开发

### 9 SCSS文件自动导入

在项目中一些组件共享的色值会以 scss 变量的方式统一放到一个名为 var.scss 的文件中，正常组件中使用，需要先导入 scss 文件，再使用内部变量，比较繁琐，自动导入可以免去手动导入步骤，直接使用内部变量。

1.  新增一个 var.scss 文件，存入色值变量
2.  通过 vite.config.js 配置自动导入文件

```js
css: {
  preprocessorOptions: {
    scss: {
      // 自动导入定制化样式文件进行样式覆盖
      additionalData: `
        @use "@/styles/element/index.scss" as *;
        @use "@/styles/var.scss" as *;  // 自动导入scss文件
      `,
    },
  },
},
```

### 10 Layout组件结构快速搭建
src/Layout/components/LayoutNav.vue

```js
<script setup>

</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <template v-if="true">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
          <li>
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>


<style scoped lang="scss">
.app-topnav {
  background: #333;
  ul {
    display: flex;
    height: 53px;
    justify-content: flex-end;
    align-items: center;
    li {
      a {
        padding: 0 15px;
        color: #cdcdcd;
        line-height: 1;
        display: inline-block;

        i {
          font-size: 14px;
          margin-right: 2px;
        }

        &:hover {
          color: $xtxColor;
        }
      }

      ~li {
        a {
          border-left: 2px solid #666;
        }
      }
    }
  }
}
</style>
```

src/Layout/components/LayoutHeader.vue

```js
<script setup>

</script>

<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li> <RouterLink to="/">居家</RouterLink> </li>
        <li> <RouterLink to="/">美食</RouterLink> </li>
        <li> <RouterLink to="/">服饰</RouterLink> </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
      
    </div>
  </header>
</template>


<style scoped lang='scss'>
.app-header {
  background: #fff;

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url('@/assets/images/logo.png') no-repeat center 18px / contain;
    }
  }

  .app-header-nav {
    width: 820px;
    display: flex;
    padding-left: 40px;
    position: relative;
    z-index: 998;
  
    li {
      margin-right: 40px;
      width: 38px;
      text-align: center;
  
      a {
        font-size: 16px;
        line-height: 32px;
        height: 32px;
        display: inline-block;
  
        &:hover {
          color: $xtxColor;
          border-bottom: 1px solid $xtxColor;
        }
      }
  
      .active {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }
  }

  .search {
    width: 170px;
    height: 32px;
    position: relative;
    border-bottom: 1px solid #e7e7e7;
    line-height: 32px;

    .icon-search {
      font-size: 18px;
      margin-left: 5px;
    }

    input {
      width: 140px;
      padding-left: 5px;
      color: #666;
    }
  }

  .cart {
    width: 50px;

    .curr {
      height: 32px;
      line-height: 32px;
      text-align: center;
      position: relative;
      display: block;

      .icon-cart {
        font-size: 22px;
      }

      em {
        font-style: normal;
        position: absolute;
        right: 0;
        top: 0;
        padding: 1px 6px;
        line-height: 1;
        background: $helpColor;
        color: #fff;
        font-size: 12px;
        border-radius: 10px;
        font-family: Arial;
      }
    }
  }
}
</style>
```

src/Layout/components/LayoutFooter.vue

```js
<template>
  <footer class="app_footer">
    <!-- 联系我们 -->
    <div class="contact">
      <div class="container">
        <dl>
          <dt>客户服务</dt>
          <dd><i class="iconfont icon-kefu"></i> 在线客服</dd>
          <dd><i class="iconfont icon-question"></i> 问题反馈</dd>
        </dl>
        <dl>
          <dt>关注我们</dt>
          <dd><i class="iconfont icon-weixin"></i> 公众号</dd>
          <dd><i class="iconfont icon-weibo"></i> 微博</dd>
        </dl>
        <dl>
          <dt>下载APP</dt>
          <dd class="qrcode"><img src="@/assets/images/qrcode.jpg" /></dd>
          <dd class="download">
            <span>扫描二维码</span>
            <span>立马下载APP</span>
            <a href="javascript:;">下载页面</a>
          </dd>
        </dl>
        <dl>
          <dt>服务热线</dt>
          <dd class="hotline">400-0000-000 <small>周一至周日 8:00-18:00</small></dd>
        </dl>
      </div>
    </div>
    <!-- 其它 -->
    <div class="extra">
      <div class="container">
        <div class="slogan">
          <a href="javascript:;">
            <i class="iconfont icon-footer01"></i>
            <span>价格亲民</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer02"></i>
            <span>物流快捷</span>
          </a>
          <a href="javascript:;">
            <i class="iconfont icon-footer03"></i>
            <span>品质新鲜</span>
          </a>
        </div>
        <!-- 版权信息 -->
        <div class="copyright">
          <p>
            <a href="javascript:;">关于我们</a>
            <a href="javascript:;">帮助中心</a>
            <a href="javascript:;">售后服务</a>
            <a href="javascript:;">配送与验收</a>
            <a href="javascript:;">商务合作</a>
            <a href="javascript:;">搜索推荐</a>
            <a href="javascript:;">友情链接</a>
          </p>
          <p>CopyRight © 小兔鲜儿</p>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang='scss'>
.app_footer {
  overflow: hidden;
  background-color: #f5f5f5;
  padding-top: 20px;

  .contact {
    background: #fff;

    .container {
      padding: 60px 0 40px 25px;
      display: flex;
    }

    dl {
      height: 190px;
      text-align: center;
      padding: 0 72px;
      border-right: 1px solid #f2f2f2;
      color: #999;

      &:first-child {
        padding-left: 0;
      }

      &:last-child {
        border-right: none;
        padding-right: 0;
      }
    }

    dt {
      line-height: 1;
      font-size: 18px;
    }

    dd {
      margin: 36px 12px 0 0;
      float: left;
      width: 92px;
      height: 92px;
      padding-top: 10px;
      border: 1px solid #ededed;

      .iconfont {
        font-size: 36px;
        display: block;
        color: #666;
      }

      &:hover {
        .iconfont {
          color: $xtxColor;
        }
      }

      &:last-child {
        margin-right: 0;
      }
    }

    .qrcode {
      width: 92px;
      height: 92px;
      padding: 7px;
      border: 1px solid #ededed;
    }

    .download {
      padding-top: 5px;
      font-size: 14px;
      width: auto;
      height: auto;
      border: none;

      span {
        display: block;
      }

      a {
        display: block;
        line-height: 1;
        padding: 10px 25px;
        margin-top: 5px;
        color: #fff;
        border-radius: 2px;
        background-color: $xtxColor;
      }
    }

    .hotline {
      padding-top: 20px;
      font-size: 22px;
      color: #666;
      width: auto;
      height: auto;
      border: none;

      small {
        display: block;
        font-size: 15px;
        color: #999;
      }
    }
  }

  .extra {
    background-color: #333;
  }

  .slogan {
    height: 178px;
    line-height: 58px;
    padding: 60px 100px;
    border-bottom: 1px solid #434343;
    display: flex;
    justify-content: space-between;

    a {
      height: 58px;
      line-height: 58px;
      color: #fff;
      font-size: 28px;

      i {
        font-size: 50px;
        vertical-align: middle;
        margin-right: 10px;
        font-weight: 100;
      }

      span {
        vertical-align: middle;
        text-shadow: 0 0 1px #333;
      }
    }
  }

  .copyright {
    height: 170px;
    padding-top: 40px;
    text-align: center;
    color: #999;
    font-size: 15px;

    p {
      line-height: 1;
      margin-bottom: 20px;
    }

    a {
      color: #999;
      line-height: 1;
      padding: 0 10px;
      border-right: 1px solid #999;

      &:last-child {
        border-right: none;
      }
    }
  }
}
</style>
```

src/layout/index.vue

```js
<script setup>
import LayoutNav from './components/LayoutNav.vue'
import LayoutHeader from './components/LayoutHeader.vue'
import LayoutFooter from './components/LayoutFooter.vue'
</script>

<template>
  <div>
    <LayoutNav />
    <LayoutHeader /> 
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <LayoutFooter />
  </div>
</template>
```

### 11 字体图标渲染
引入阿里的字体图标库
在根目录下的index.html文件的<head>标签内引入阿里字体图标库即可
```
<link rel="stylesheet" href="//at.alicdn.com/t/font_2143783_iq6z4ey5vu.css">
```

### 12 Layout页面
#### 12.1 渲染一级导航列表
查看项目api文档，找到首页页面-获取分类（https://apifox.cn/apidoc/shared-fa9274ac-362e-4905-806b-6135df6aa90e/api-24945669）
在src/apis下新建layout.js文件
```
import httpInstance from "@/utils/http"

// 获取分类列表
export const getCategoryAPI = ()=>{
  return httpInstance({
    url:'/home/category/head'
  })
}

```

在layoutHeader组件中引入，并发起请求

```js
<script setup>
import {getCategoryAPI} from '@/apis/layout'
import { onMounted,ref } from 'vue'

const categoryList = ref([])

// 获取分类列表
const getCategory = async()=>{
  const res = await getCategoryAPI()
  console.log(res)
  categoryList.value = res.result
}

onMounted(()=>{
  getCategory()
})

</script>
```

#### 12.2 吸顶导航交互实现
新建src/Layout/components/LayoutFixed.vue
静态页面结构

```js
<template>
  <div class="app-header-sticky">
    <div class="container">
      <RouterLink class="logo" to="/" />
      <!-- 导航区域 -->
      <ul class="app-header-nav">
        <li class="home">
          <RouterLink to="/">首页</RouterLink>
        </li>
        <li>
          <RouterLink to="/">居家</RouterLink>
        </li>
        <li>
          <RouterLink to="/">美食</RouterLink>
        </li>
        <li>
          <RouterLink to="/">服饰</RouterLink>
        </li>
        <li>
          <RouterLink to="/">母婴</RouterLink>
        </li>
        <li>
          <RouterLink to="/">个护</RouterLink>
        </li>
        <li>
          <RouterLink to="/">严选</RouterLink>
        </li>
        <li>
          <RouterLink to="/">数码</RouterLink>
        </li>
        <li>
          <RouterLink to="/">运动</RouterLink>
        </li>
        <li>
          <RouterLink to="/">杂项</RouterLink>
        </li>
      </ul>

      <div class="right">
        <RouterLink to="/">品牌</RouterLink>
        <RouterLink to="/">专题</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.app-header-sticky {
  width: 100%;
  height: 80px;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 999;
  background-color: #fff;
  border-bottom: 1px solid #e4e4e4;
  // 此处为关键样式!!!
  // 状态一：往上平移自身高度 + 完全透明
  transform: translateY(-100%);
  opacity: 0;

  // 状态二：移除平移 + 完全不透明
  &.show {
    transition: all 0.3s linear;
    transform: none;
    opacity: 1;
  }

  .container {
    display: flex;
    align-items: center;
  }

  .logo {
    width: 200px;
    height: 80px;
    background: url("@/assets/images/logo.png") no-repeat right 2px;
    background-size: 160px auto;
  }

  .right {
    width: 220px;
    display: flex;
    text-align: center;
    padding-left: 40px;
    border-left: 2px solid $xtxColor;

    a {
      width: 38px;
      margin-right: 40px;
      font-size: 16px;
      line-height: 1;

      &:hover {
        color: $xtxColor;
      }
    }
  }
}

.app-header-nav {
  width: 820px;
  display: flex;
  padding-left: 40px;
  position: relative;
  z-index: 998;

  li {
    margin-right: 40px;
    width: 38px;
    text-align: center;

    a {
      font-size: 16px;
      line-height: 32px;
      height: 32px;
      display: inline-block;

      &:hover {
        color: $xtxColor;
        border-bottom: 1px solid $xtxColor;
      }
    }

    .active {
      color: $xtxColor;
      border-bottom: 1px solid $xtxColor;
    }
  }
}
</style>
```

根据静态结构可以看到是通过在跟标签<div class="app-header-sticky show">内添加一个show的class类完成控制显示和隐藏的
这里使用vueUse插件完成获取滚轴在y轴上的高度来控制
首先安装vueUse插件

```cmd
npm i @vueuse/core
```

之后使用`useScroll()`函数获取y轴数值，给对应容器标签添加一个动态类条件为当y值大于78px的时候触发

```js
<script setup>
// vueUse
import { useScroll } from '@vueuse/core'
const { y } = useScroll(window)
</script>

<template>
  <div class="app-header-sticky" :class="{ show: y > 78 }">
  // .... 内容不变
<template />
```

#### 12.3 使用pinia优化重复请求

因为LayoutHeader组件和LayoutFixed组件中会重复发起获取category列表的请求。

所以这里使用pinia优化重复请求的问题，对列表数据进行统一管理，在需要使用的组件中下发使用即可。

在src/stores目录下新建category.js模块。

```js
import { ref, computed } from "vue"
import { defineStore } from "pinia"
import { getCategoryAPI } from "@/apis/layout"

export const useCategoryStore = defineStore("category", () => {
  // 导航列表逻辑
  // state导航数据列表
  const categoryList = ref([])
  // action获取分类
  const getCategory = async () => {
    const res = await getCategoryAPI()
    categoryList.value = res.result
  }
  return { categoryList, getCategory }
})
```

### 13 Home页面
#### 13.1整体结构拆分
![image](https://cdn.nlark.com/yuque/0/2023/png/274425/1675417667651-eb841c73-5b36-48a5-a8ee-118dbeaaeb0d.png#averageHue=%23fcf8f8&clientId=u19c1ce9d-cad7-4&from=paste&height=458&id=u7e2d2595&name=image.png&originHeight=916&originWidth=1368&originalType=binary&ratio=1&rotation=0&showTitle=false&size=37531&status=done&style=none&taskId=uf8f39479-333b-4074-b888-53dc829c807&title=&width=684)

按照图示结构需要创建5个子组件，遵循就近原则，在Home目录下新建components目录，分别创建5个子组件
- HomeCategory.vue
- HomeBanner.vue
- HomeNew.vue
- HomeHot.vue
- HomeProduct.vue

在Home组件中按照图示结构引入创建的5个子组件
```js
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeHot from './components/HomeHot.vue'
import HomeNew from './components/HomeNew.vue'
import HomeProduct from './components/HomeProduct.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
</template>
```

#### 13.2 分类子组件实现
```js
<script setup>
import { useCategoryStore } from '@/stores/category'

const categoryStore = useCategoryStore()
</script>

<template>
  <div class="home-category">
    <ul class="menu">
      <li v-for="item in categoryStore.categoryList" :key="item.id">
        <RouterLink to="/">{{item.name}}</RouterLink>
        <!-- 取数据子结构的前2项 -->
        <RouterLink v-for="i in item.children.slice(0,2)" :key="i.id" to="/">{{i.name}}</RouterLink>
        <!-- 弹层layer位置 -->
        <div class="layer">
          <h4>分类推荐 <small>根据您的购买或浏览记录推荐</small></h4>
          <ul>
            <li v-for="i in item.goods" :key="i.id">
              <RouterLink to="/">
                <img alt="" :src="i.picture"/>
                <div class="info">
                  <p class="name ellipsis-2">
                    {{i.name}}
                  </p>
                  <p class="desc ellipsis">{{i.desc}}</p>
                  <p class="price"><i>¥</i>{{i.price}}</p>
                </div>
              </RouterLink>
            </li>
          </ul>
        </div>
      </li>
    </ul>
  </div>
</template>


<style scoped lang='scss'>
.home-category {
  width: 250px;
  height: 500px;
  background: rgba(0, 0, 0, 0.8);
  position: relative;
  z-index: 99;

  .menu {
    li {
      padding-left: 40px;
      height: 55px;
      line-height: 55px;

      &:hover {
        background: $xtxColor;
      }

      a {
        margin-right: 4px;
        color: #fff;

        &:first-child {
          font-size: 16px;
        }
      }

      .layer {
        width: 990px;
        height: 500px;
        background: rgba(255, 255, 255, 0.8);
        position: absolute;
        left: 250px;
        top: 0;
        display: none;
        padding: 0 15px;

        h4 {
          font-size: 20px;
          font-weight: normal;
          line-height: 80px;

          small {
            font-size: 16px;
            color: #666;
          }
        }

        ul {
          display: flex;
          flex-wrap: wrap;

          li {
            width: 310px;
            height: 120px;
            margin-right: 15px;
            margin-bottom: 15px;
            border: 1px solid #eee;
            border-radius: 4px;
            background: #fff;

            &:nth-child(3n) {
              margin-right: 0;
            }

            a {
              display: flex;
              width: 100%;
              height: 100%;
              align-items: center;
              padding: 10px;

              &:hover {
                background: #e3f9f4;
              }

              img {
                width: 95px;
                height: 95px;
              }

              .info {
                padding-left: 10px;
                line-height: 24px;
                overflow: hidden;

                .name {
                  font-size: 16px;
                  color: #666;
                }

                .desc {
                  color: #999;
                }

                .price {
                  font-size: 22px;
                  color: $priceColor;

                  i {
                    font-size: 16px;
                  }
                }
              }
            }
          }
        }
      }

      // 关键样式  hover状态下的layer盒子变成block
      &:hover {
        .layer {
          display: block;
        }
      }
    }
  }
}
</style>
```


#### 13.3 Banner子组件实现
静态结构，使用ElementPlus的 Carousel 走马灯 组件
src/views/Home/components/HomeBanner.vue
```js
<script setup>


</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px" :interval="3000">
      <el-carousel-item v-for="item in 4" :key="item">
        <img
          src="http://yjy-xiaotuxian-dev.oss-cn-beijing.aliyuncs.com/picture/2021-04-15/6d202d8e-bb47-4f92-9523-f32ab65754f4.jpg"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<style scoped lang="scss">
.home-banner {
  width: 990px;
  height: 500px;
  position: absolute;
  left: 250px;
  top: 0;
  z-index: 98;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>

```

根据接口文档，新建一个home请求模块
src/apis/home.js
```js
import httpInstance from '@/utils/http'

// 获取banner
export const getBannerAPI = ()=>{
  return httpInstance({
    url:'/home/banner'
  })
}
```

在静态页面内渲染数据
```js
<script setup>
import { getBannerAPI } from '@/apis/home'
import { ref,onMounted } from 'vue'

const bannerList = ref([])

const getBannerList = async()=>{
  const res = await getBannerAPI()
  bannerList.value = res.result
}

onMounted(()=>{
  getBannerList()
})

</script>

<template>
  <div class="home-banner">
    <el-carousel height="500px" :interval="3000">
      <el-carousel-item v-for="item in bannerList" :key="item.id">
        <img
          :src="item.imgUrl"
          alt=""
        />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

```

#### 13.4 面板组件封装
准备静态结构在src/views/Home/components目录下新建HomePanel.vue组件
```js
<script setup>
defineProps({
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  }
})
</script>


<template>
  <div class="home-panel">
    <div class="container">
      <div class="head">
         <!-- 主标题和副标题 -->
        <h3>
          新鲜好物<small>新鲜出炉 品质靠谱</small>
        </h3>
      </div>
      <!-- 主体内容区域 -->
      <div> 主体内容 </div>
    </div>
  </div>
</template>

<style scoped lang='scss'>
.home-panel {
  background-color: #fff;

  .head {
    padding: 40px 0;
    display: flex;
    align-items: flex-end;

    h3 {
      flex: 1;
      font-size: 32px;
      font-weight: normal;
      margin-left: 6px;
      height: 35px;
      line-height: 35px;

      small {
        font-size: 16px;
        color: #999;
        margin-left: 20px;
      }
    }
  }
}
</style>
```
做完静态结构之后可以在Home组件中引入测试一下看看效果
```js
<script setup>
import HomeCategory from './components/HomeCategory.vue'
import HomeBanner from './components/HomeBanner.vue'
import HomeHot from './components/HomeHot.vue'
import HomeNew from './components/HomeNew.vue'
import HomeProduct from './components/HomeProduct.vue'
import HomePanel from './components/HomePanel.vue'
</script>

<template>
  <div class="container">
    <HomeCategory />
    <HomeBanner />
  </div>
  <HomeNew />
  <HomeHot />
  <HomeProduct />
  <!-- 测试面板组件 -->
  <HomePanel title="新鲜好物" subTitle="新鲜好物，好多商品">
    <div>我是新鲜好物的插槽</div>
  </HomePanel>
  <HomePanel title="人气推荐" subTitle="人气推荐，好多商品">
    <div>我是人气推荐的插槽</div>
  </HomePanel>
</template>
```

#### 13.5 新鲜好物模块实现
根据项目效果图可以发现，新鲜好物和人气推荐模块，在结构上非常相似，只是内容不同，这里可以通过组件封装实现复用结构的效果。
**`核心思路：把可复用的结构只写一次，把可能发生变化的部分抽象成组件参数（props/插槽）`**
**实现步骤**
1. 不做任何抽象，准备静态结构
2. 抽象可变部分
- 主标题和副标题是纯文本，可以抽象成prop传入
- 主题内容是复杂模板，抽象成插槽传入



1.准备静态模板src/views/Home/components/HomeNew.vue

```js
<script setup>

</script>

<template>
  <div></div>
  <!-- 下面是插槽主体内容模版
  <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  -->
</template>


<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 406px;

  li {
    width: 306px;
    height: 406px;

    background: #f0f9f4;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
      text-overflow: ellipsis;
      overflow: hidden;
      white-space: nowrap;
    }

    .price {
      color: $priceColor;
    }
  }
}
</style>
```

2.封装接口
src/apis/home.js

```js
// ... 上面数据不变

// 获取新鲜好物请求
export const getNewAPI = ()=>{
  return httpInstance({
    url:'/home/new'
  })
}
```

3.组件内渲染数据
```js
<script setup>
import HomePanel from './HomePanel.vue'
import {getNewAPI} from '@/apis/home'
import { ref,onMounted } from 'vue'


// 获取数据
const newList = ref([])

const getNewList = async ()=>{
  const res = await getNewAPI()
  newList.value = res.result
}

onMounted(()=>{
  getNewList()
})

</script>

<template>
  <HomePanel title="新鲜好物" subTitle="新鲜出炉，品质靠谱">
    <ul class="goods-list">
    <li v-for="item in newList" :key="item.id">
      <RouterLink to="/">
        <img :src="item.picture" alt="" />
        <p class="name">{{ item.name }}</p>
        <p class="price">&yen;{{ item.price }}</p>
      </RouterLink>
    </li>
  </ul>
  </HomePanel>
</template>

//...以下代码不变

```


#### 13.6 人气推荐模块实现

封装接口src/apis/home.js
```js
// ...以上代码不变

// 获取人气推荐请求
export const getHotAPI = ()=>{
  return httpInstance({
    url:'/home/hot'
  })
}
```

静态结构及数据渲染src/views/Home/components/HomeHot.vue
```js
<script setup>
import HomePanel from './HomePanel.vue'
import { getHotAPI } from '@/apis/home'
import { ref } from 'vue'
const hotList = ref([])
const getHotList = async () => {
  const res = await getHotAPI()
  hotList.value = res.result
}

onMounted(()=>{
  getHotList()
})

</script>

<template>
  <HomePanel title="人气推荐" sub-title="人气爆款 不容错过">
      <ul class="goods-list">
        <li v-for="item in hotList" :key="item.id">
          <RouterLink to="/">
            <img :src="item.picture" alt="" />
            <p class="name">{{ item.title }}</p>
            <p class="desc">{{ item.alt }}</p>
          </RouterLink>
        </li>
      </ul>
  </HomePanel>
</template>

<style scoped lang='scss'>
.goods-list {
  display: flex;
  justify-content: space-between;
  height: 426px;

  li {
    width: 306px;
    height: 406px;
    transition: all .5s;

    &:hover {
      transform: translate3d(0, -3px, 0);
      box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
    }

    img {
      width: 306px;
      height: 306px;
    }

    p {
      font-size: 22px;
      padding-top: 12px;
      text-align: center;
    }

    .desc {
      color: #999;
      font-size: 18px;
    }
  }
}
</style>
```


#### 13.7 图片懒加载指令
电商网站的首页通常会很长，用户不一定能访问到页面靠下面的图片，这类图片通过懒加载优化手段可以做到只有进入视口区域才发送图片请求

实现步骤
 1. 注册全局自定义指令
 2. 判断是否进入视口区域
 3. 如果图片进入到视口区域发送网络请求


指令用法
```js
<img v-img-lazy="item.picture" />
```
在图片img标签身上绑定指令，该图片只有在正式进入到视口区域时才会发送图片网络请求

在全局注册自定义指令
src/main.js
```js

// .... 以上内容不变

// 注册全局自定义指令
app.directive('img-lazy',{
  mounted(el,binding){
    // el: 指令所绑定的元素，可以用来直接操作 DOM
    // binding: binding.value 是传给指令的值(指令等于号后面绑定的表达式的值，这里就是图片url），binding.arg 是传给指令的参数
    console.log(el,binding.value)
  }
})

```

#### 13.8 懒加载优化
1. 将全局注册的懒加载指令封装出来，main.js入口文件只做注册使用，将逻辑封装为插件
2. 在入口文件注册使用封装的插件
3. 避免懒加载的滚轴监听重复监听，在useIntersectionObserver方法中解构出来stop方法，在第一次执行成功之后就停止监听
src/directives/index.js
```js
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
              stop() // 停止监听
            }
          },
        )
      }
    })
  }
}
```

src/main.js
```js
// 引入懒加载插件并注册
import { lazyPlugin } from "@/directives/index"

app.use(lazyPlugin)
```


#### 13.9 产品列表实现

准备静态结构
```js
<script setup>
import HomePanel from './HomePanel.vue'


</script>

<template>
  <div class="home-product">
    <!-- <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="goods in cate.goods" :key="goods.id">
            <RouterLink to="/" class="goods-item">
              <img v-img-lazy="goods.picture" alt="" />
              <p class="name ellipsis">{{ goods.name }}</p>
              <p class="desc ellipsis">{{ goods.desc }}</p>
              <p class="price">&yen;{{ goods.price }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
    </HomePanel> -->
  </div>
</template>

<style scoped lang='scss'>
.home-product {
  background: #fff;
  margin-top: 20px;
  .sub {
    margin-bottom: 2px;

    a {
      padding: 2px 12px;
      font-size: 16px;
      border-radius: 4px;

      &:hover {
        background: $xtxColor;
        color: #fff;
      }

      &:last-child {
        margin-right: 80px;
      }
    }
  }

  .box {
    display: flex;

    .cover {
      width: 240px;
      height: 610px;
      margin-right: 10px;
      position: relative;

      img {
        width: 100%;
        height: 100%;
      }

      .label {
        width: 188px;
        height: 66px;
        display: flex;
        font-size: 18px;
        color: #fff;
        line-height: 66px;
        font-weight: normal;
        position: absolute;
        left: 0;
        top: 50%;
        transform: translate3d(0, -50%, 0);

        span {
          text-align: center;

          &:first-child {
            width: 76px;
            background: rgba(0, 0, 0, 0.9);
          }

          &:last-child {
            flex: 1;
            background: rgba(0, 0, 0, 0.7);
          }
        }
      }
    }

    .goods-list {
      width: 990px;
      display: flex;
      flex-wrap: wrap;

      li {
        width: 240px;
        height: 300px;
        margin-right: 10px;
        margin-bottom: 10px;

        &:nth-last-child(-n + 4) {
          margin-bottom: 0;
        }

        &:nth-child(4n) {
          margin-right: 0;
        }
      }
    }

    .goods-item {
      display: block;
      width: 220px;
      padding: 20px 30px;
      text-align: center;
      transition: all .5s;

      &:hover {
        transform: translate3d(0, -3px, 0);
        box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
      }

      img {
        width: 160px;
        height: 160px;
      }

      p {
        padding-top: 10px;
      }

      .name {
        font-size: 16px;
      }

      .desc {
        color: #999;
        height: 29px;
      }

      .price {
        color: $priceColor;
        font-size: 20px;
      }
    }
  }
}
</style>
```

封装接口
```js
// ... 以上代码不变

// 获取所有商品模块
export const getGoodsAPI = ()=>{
  return httpInstance({
    url:'/home/goods'
  })
}
```

动态渲染数据到静态页面
```js
<script setup>
import HomePanel from './HomePanel.vue'
import { onMounted, ref } from 'vue'
import { getGoodsAPI } from '@/apis/home'

const goodsProduct = ref([])

const getGoodsList = async ()=>{
  const res = await getGoodsAPI()
  goodsProduct.value = res.result
}

onMounted(()=>{
  getGoodsList()
})

</script>

// ... 以下代码不变
```

#### 13.10 封装GoodsItem组件
根据项目发现产品图块结构多次使用，这里封装为一个组件,使用props传参方式抽象
src/views/Home/components/GoodsItem
```js
<script setup>
defineProps({
  goods: {
    type: Object,
    default: () => {},
  },
});
</script>

<template>
  <RouterLink to="/" class="goods-item">
    <img v-img-lazy="goods.picture" alt="" />
    <p class="name ellipsis">{{ goods.name }}</p>
    <p class="desc ellipsis">{{ goods.desc }}</p>
    <p class="price">&yen;{{ goods.price }}</p>
  </RouterLink>
</template>

<style lang="scss" scoped>
.goods-item {
  display: block;
  width: 220px;
  padding: 20px 30px;
  text-align: center;
  transition: all 0.5s;

  &:hover {
    transform: translate3d(0, -3px, 0);
    box-shadow: 0 3px 8px rgb(0 0 0 / 20%);
  }

  img {
    width: 160px;
    height: 160px;
  }

  p {
    padding-top: 10px;
  }

  .name {
    font-size: 16px;
  }

  .desc {
    color: #999;
    height: 29px;
  }

  .price {
    color: $priceColor;
    font-size: 20px;
  }
}
</style>

```

在HomeProduct中传入props实现
```js
<script setup>
// ... 以上代码不变

import GoodsItem from './GoodsItem.vue'

</script>

<template>
  <div class="home-product">
    <HomePanel :title="cate.name" v-for="cate in goodsProduct" :key="cate.id">
      <div class="box">
        <RouterLink class="cover" to="/">
          <img v-img-lazy="cate.picture" />
          <strong class="label">
            <span>{{ cate.name }}馆</span>
            <span>{{ cate.saleInfo }}</span>
          </strong>
        </RouterLink>
        <ul class="goods-list">
          <li v-for="goods in cate.goods" :key="goods.id">
            <GoodsItem :goods="goods"/>
          </li>
        </ul>
      </div>
    </HomePanel>
  </div>
</template>

// ...以下代码不变
```

### 14 一级分类路由配置
```js
// createRouter: 创建路由实例
// createWebHistory: 创建history模式路由
// import.meta.env.BASE_URL: 项目的基础路径
// children: 子路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和components对应关系的位置
  routes: [
    {
      path:'/',
      component: Layout,
      children:[
        {
          // path设置为空，表示默认子路由
          path:'',
          component: Home
        },
        {
          path:'/category/:id',  // 绑定一级路由标识
          component: Category
        }
      ]
    },
    {
      path:'/login',
      component: Login,
    }
  ],
})

export default router

```

修改导航页LayoutHeader和LayoutFixed

```js
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <!-- 将id作为标识传入 -->
          <RouterLink :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
      
    </div>
  </header>
</template>
```

#### 14.1 一级分类面包屑导航渲染

src/views/Category/index.vue
```js
<script setup>

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>居家</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.top-category {
  h3 {
    font-size: 28px;
    color: #666;
    font-weight: normal;
    text-align: center;
    line-height: 100px;
  }

  .sub-list {
    margin-top: 20px;
    background-color: #fff;

    ul {
      display: flex;
      padding: 0 32px;
      flex-wrap: wrap;

      li {
        width: 168px;
        height: 160px;


        a {
          text-align: center;
          display: block;
          font-size: 16px;

          img {
            width: 100px;
            height: 100px;
          }

          p {
            line-height: 40px;
          }

          &:hover {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .ref-goods {
    background-color: #fff;
    margin-top: 20px;
    position: relative;

    .head {
      .xtx-more {
        position: absolute;
        top: 20px;
        right: 20px;
      }

      .tag {
        text-align: center;
        color: #999;
        font-size: 20px;
        position: relative;
        top: -20px;
      }
    }

    .body {
      display: flex;
      justify-content: space-around;
      padding: 0 40px 30px;
    }
  }

  .bread-container {
    padding: 25px 0;
  }
}
</style>
```

封装接口
src/apis/category.js
```js
import request from "@/utils/http"

export const getCategoryAPI = (id)=>{
  return request({
    url:'/category',
    params:{
      id
    }
  })
}
```

渲染数据
```js
<script setup>
import {getCategoryAPI} from '@/apis/category'
import {ref, onMounted} from 'vue'
import { useRoute } from 'vue-router'
// 获取数据
const categoryData = ref({})

const route = useRoute()

const getCategory = async()=>{
  const res = await getCategoryAPI(route.params.id)
  categoryData.value = res.result
}

onMounted(()=>{
  getCategory()
})

</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

// ... 以下代码不变
```

#### 14.2 激活状态显示

src/views/Layou/components/LayoutHeader.vue
给他RouteLink标签添加active-class属性，并设置对应的选中之后的样式
```js
<template>
  <header class='app-header'>
    <div class="container">
      <h1 class="logo">
        <RouterLink to="/">小兔鲜</RouterLink>
      </h1>
      <ul class="app-header-nav">
        <li class="home" v-for="item in categoryStore.categoryList" :key="item.id">
          <RouterLink active-class="active" :to="`/category/${item.id}`">{{item.name}}</RouterLink>
        </li>
      </ul>
      <div class="search">
        <i class="iconfont icon-search"></i>
        <input type="text" placeholder="搜一搜">
      </div>
      <!-- 头部购物车 -->
      
    </div>
  </header>
</template>
```

#### 14.3 一级分类轮播图实现

这里复用Home内的HomeBanner子组件实例实现
修改请求增加参数 distributionSite 参数默认为1 商品为2
src/apis/home.js
```js
// 获取banner
export const getBannerAPI = (params = {})=>{
  // distributionSite 参数默认为1 商品为2
  const {distributionSite='1'} = params
  return httpInstance({
    url:'/home/banner',
    params:{
      distributionSite
    }
  })
}

// ... 一下代码不变
```


src/views/Category/index.vue
```js
<script setup>
import { getBannerAPI } from "@/apis/home"
import { ref, onMounted } from "vue"
import { getCategoryAPI } from "@/apis/category"

// 获取数据
const categoryData = ref({})

const route = useRoute()

const getCategory = async () => {
  const res = await getCategoryAPI(route.params.id)
  categoryData.value = res.result
}

onMounted(() => {
  getCategory()
})

const bannerList = ref([])

const getBannerList = async () => {
  const res = await getBannerAPI({ distributionSite: "2" })
  bannerList.value = res.result
}

onMounted(() => {
  getBannerList()
})
</script>

<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px" :interval="3000">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">

// 。。。以上代码不变

.home-banner {
  width: 1240px;
  height: 500px;
  margin: 0 auto;

  img {
    width: 100%;
    height: 500px;
  }
}
</style>


```


#### 14.4 分类列表渲染

src/views/Category/index.vue
```js
<template>
  <div class="top-category">
    <div class="container m-top-20">
      <!-- 面包屑 -->
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 轮播图 -->
      <div class="home-banner">
        <el-carousel height="500px" :interval="3000">
          <el-carousel-item v-for="item in bannerList" :key="item.id">
            <img :src="item.imgUrl" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <!-- 分类列表渲染 -->
      <div class="sub-list">
        <h3>全部分类</h3>
        <ul>
          <li v-for="i in categoryData.children" :key="i.id">
            <RouterLink to="/">
              <img :src="i.picture" />
              <p>{{ i.name }}</p>
            </RouterLink>
          </li>
        </ul>
      </div>
      <div
        class="ref-goods"
        v-for="item in categoryData.children"
        :key="item.id"
      >
        <div class="head">
          <h3>- {{ item.name }}-</h3>
        </div>
        <div class="body">
          <GoodsItem v-for="good in item.goods" :goods="good" :key="good.id" />
        </div>
      </div>
    </div>
  </div>
</template>
```

#### 14.5 解决路由缓存问题

路由产生的原因是，在只有路由参数发生变化时，会复用组件实例。例如在params请求时，携带的关键字
复用实例会导致生命周期onMounted不执行，新的请求不执行，新数据不会获取，不会更新

解决办法有2种
1. 加Key，简单粗暴，不在意新能问题可以选择-原理：让组件实例不复用，强制销毁重建。
本项目实现如下：
在组件路由出口位子src/views/Layout/index.vue
给route-view添加key，以当前完整路由路径为key值，给route-view组件绑定
```js
// ... 以上代码不变

<template>
  <LayoutFixed />
  <LayoutNav />
  <LayoutHeader />
  <!-- 二级路由出口 -->
  <!-- 添加key 破坏组件复用机制 强制销毁重建 -->
  <RouterView :key="$route.fullPath"/>
  <LayoutFooter />
</template>

```
最常见的用例是与`v-for`结合：
```js
<ul>
  <li v-for'item in items' :key='item.id'>...</li>
</ul>
```
也可以用于强制替换一个元素/组件而不是复用它
- 在适当时侯触发组件的生命周期钩子
- 触发过渡

2. 使用onBeforeRouteUpdate钩子函数，精细化控制，在意性能问题可以选择。-原理：监听路由变化，变化之后执行数据更新操作。

onBeforeRouteUpdate钩子函数可以在每次路由更新之前执行，在回调中执行需要数据更新的业务逻辑即可
本项目实现如下：
在src/views/Category/index.vue
```js
<script setup>
import { getCategoryAPI } from "@/apis/category"
import { getBannerAPI } from "@/apis/home"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import GoodsItem from "@/views/Home/components/GoodsItem.vue"
import { onBeforeRouteUpdate } from "vue-router"
// 获取数据
const categoryData = ref({})

const route = useRoute()

// 这里修改参数当没有值时为route.params.id
const getCategory = async (id = route.params.id) => {
  const res = await getCategoryAPI(id)
  categoryData.value = res.result
};

onMounted(() => {
  getCategory()
})

// 目标：路由参数变化的时候，可以把分类数据接口重新发送
onBeforeRouteUpdate((to) => {
  // console.log("路由变化了")
  console.log(to) // to是目标路由对象
  // 存在问题：使用最新的路由参数请求最新的分类数据
  getCategory(to.params.id)
})

const bannerList = ref([])

const getBannerList = async () => {
  const res = await getBannerAPI({ distributionSite: "2" })
  bannerList.value = res.result
};

onMounted(() => {
  getBannerList()
})
</script>
```

#### 14.6 使用逻辑函数拆分业务

将category页面的banner和分类category按逻辑拆分为2个模块，将需要用的数据return出去
在src/views/Category/composables/useBanner.js和useCategory.js

将之前index.js中的相关逻辑分别拆分到2个子模块中
useBanner.js
```js
// 封装banner轮播图相关的业务代码
import { ref, onMounted } from "vue"
import { getBannerAPI } from "@/apis/home"

export const useBanner = () => {
  const bannerList = ref([])

  const getBannerList = async () => {
    const res = await getBannerAPI({ distributionSite: "2" })
    bannerList.value = res.result
  }

  onMounted(() => {
    getBannerList()
  })

  return {
    bannerList
  }
}
```

useCategory.js
```js
// 封装分类数据业务数据相关代码
import { getCategoryAPI } from "@/apis/category"
import { ref, onMounted } from "vue"
import { useRoute } from "vue-router"
import { onBeforeRouteUpdate } from "vue-router"

export const useCategory = () => {
  const categoryData = ref({})

  const route = useRoute()

  const getCategory = async (id = route.params.id) => {
    const res = await getCategoryAPI(id)
    categoryData.value = res.result
  }

  onMounted(() => {
    getCategory()
  })

  // 目标：路由参数变化的时候，可以把分类数据接口重新发送
  onBeforeRouteUpdate((to) => {
    // console.log("路由变化了")
    console.log(to) // to是目标路由对象
    // 存在问题：使用最新的路由参数请求最新的分类数据
    getCategory(to.params.id)
  })
  return {
    categoryData
  }
}

```

index.js
```js
<script setup>
import GoodsItem from "@/views/Home/components/GoodsItem.vue"
import { useBanner } from "./composables/useBanner"
import {useCategory} from './composables/useCategory'

// 获取轮播图数据
const { bannerList } = useBanner()

// 获取分类数据
const { categoryData }=useCategory()

</script>

// ... 以下代码不变
```

### 15 二级分类

基础静态结构
src/views/SubCategory/index.vue
```js
<script setup>


</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">居家
        </el-breadcrumb-item>
        <el-breadcrumb-item>居家生活用品</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
         <!-- 商品列表-->
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
```

路由配置
src/router/index.js
```js
// createRouter: 创建路由实例
// createWebHistory: 创建history模式路由
// import.meta.env.BASE_URL: 项目的基础路径
// children: 子路由

import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/views/Layout/index.vue'
import Login from '@/views/Login/index.vue'
import Home from '@/views/Home/index.vue'
import Category from '@/views/Category/index.vue'
import SubCategory from '@/views/SubCategory/index.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // path和components对应关系的位置
  routes: [
    {
      path:'/',
      component: Layout,
      children:[
        {
          // path设置为空，表示默认子路由
          path:'',
          component: Home
        },
        {
          path:'/category/:id',
          component: Category
        },
        {
          path:'/category/sub/:id',
          component: SubCategory
        }
      ]
    },
    {
      path:'/login',
      component: Login,
    }
  ],
})

export default router

```

修改跳转逻辑

src/views/Category/index.js
```js
<!-- 分类列表渲染 -->
<div class="sub-list">
  <h3>全部分类</h3>
  <ul>
    <li v-for="i in categoryData.children" :key="i.id">
      {/* 配置路由路径 */}
      <RouterLink :to="`/category/sub/${i.id}`">
        <img :src="i.picture" />
        <p>{{ i.name }}</p>
      </RouterLink>
    </li>
  </ul>
</div>
```

#### 15.1 面包屑导航
1. 请求接口准备
src/apis/category.js
```js
// 获取二级分类列表
export const getCategoryFilterAPI = (id) => {
  return request({
    url:'/category/sub/filter',
    params:{
      id
    }
  })
}
```

2. 获取数据渲染模板
src/views/SubCategory/index.vue
```js
<script setup>
import { getCategoryFilterAPI } from '@/apis/category'
import {ref,onMounted} from 'vue'
import {useRoute} from 'vue-router'
// 获取面包屑导航数据
const categoryData = ref([])

const route = useRoute()

const getCategoryData = async ()=>{
  const res = await getCategoryFilterAPI(route.params.id)
  categoryData.value = res.result
}

onMounted(()=>{
  getCategoryData()
})

</script>


<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
         <!-- 商品列表-->
      </div>
    </div>
  </div>

</template>



<style lang="scss" scoped>
.bread-container {
  padding: 25px 0;
  color: #666;
}

.sub-container {
  padding: 20px 10px;
  background-color: #fff;

  .body {
    display: flex;
    flex-wrap: wrap;
    padding: 0 10px;
  }

  .goods-item {
    display: block;
    width: 220px;
    margin-right: 20px;
    padding: 20px 30px;
    text-align: center;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }

  .pagination-container {
    margin-top: 20px;
    display: flex;
    justify-content: center;
  }


}
</style>
```

#### 15.2 基础商品列表实现
src/apis/category.js
```js
/**
 * @description: 获取导航数据
 * @data { 
     categoryId: 1005000 ,
     page: 1,
     pageSize: 20,
     sortField: 'publishTime' | 'orderNum' | 'evaluateNum'
   } 
 * @return {*}
 */
export const getSubCategoryAPI = (data) => {
  return request({
    url:'/category/goods/temporary',
    method:'POST',
    data
  })
}
```

src/views/Subcategory/index.vue
```js
<script setup>
  
// 获取基础列表数据渲染
const goodList = ref([])
const reqData = ref({
  categoryId: route.params.id,
  page: 1,
  pageSize: 20,
  sortField: 'publishTime'
})
  
const getGoodList = async () => {
  const res = await getSubCategoryAPI(reqData.value)
  console.log(res)
  goodList.value = res.result.items
}
  
onMounted(() => getGoodList())
  
</script>

<template>
  <div class="container ">
    <!-- 面包屑 -->
    <div class="bread-container">
      <el-breadcrumb separator=">">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: `/category/${categoryData.parentId}` }">{{ categoryData.parentName }}
        </el-breadcrumb-item>
        <el-breadcrumb-item>{{ categoryData.name }}</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="sub-container">
      <el-tabs>
        <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
        <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
        <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
      </el-tabs>
      <div class="body">
        <!-- 商品列表-->
        <GoodsItem v-for="goods in goodList" :key="goods.id" :goods="goods"/>
      </div>
    </div>
  </div>

</template>


```

#### 15.3 列表筛选实现
思路：tab组件切换时修改reqData中的sortField字段，重新拉取接口列表
```js
<script setup>
// tab切换回调
const tabChange = () => {
  console.log('tab切换了', reqData.value.sortField)
  reqData.value.page = 1
  getGoodList()
}
</script>

<template>
  <el-tabs v-model="reqData.sortField" @tab-change="tabChange">
    <el-tab-pane label="最新商品" name="publishTime"></el-tab-pane>
    <el-tab-pane label="最高人气" name="orderNum"></el-tab-pane>
    <el-tab-pane label="评论最多" name="evaluateNum"></el-tab-pane>
  </el-tabs>
</template>
```

#### 15.4 列表无限加载
实现方案，监视滚动条是否触底，触底了，就将reqData.page++,再次发送请求，将请求结果拼接到之前的结果后面，在渲染页面，当无新的数据之后停监听。
这里使用ElementPlus 的 Infinite Scroll（v-infinite-scroll属性）实现无限滚动功能。

```js
// 加载更多
const disabled = ref(false)

const load = async()=>{
  // console.log('加载了')
  // 获取下一页的数据
  reqData.value.page++
  const res = await getSubCategoryAPI(reqData.value)
  goodList.value = [...goodList.value,...res.result.items]
  // 加载完毕，停止更新
  if(res.result.items.length === 0){
    disabled.value = true
  }
}

<div class="body" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
  <!-- 商品列表-->
  <GoodsItem v-for="goods in goodList" :key="goods.id" :goods="goods"/>
</div>
```

#### 15.5 定制路由滚动行为
当访问二级分类，商品页面滑动至底部之后，在切换分类，滚动条还是保持在底部，这里需要给路由配置滚动行为
src/router/index.js
```js
routes:[...],
// 路由滚动行为定制
scrollBehavior(){
  return {
    behavior:'smooth', // 平滑变更
    top:0 // 置顶
  }
},
```

### 16详情页

#### 16.1 整体认识和路由配置
点击商品进入到详情页

详情页静态结构
src/views/Detail/index.vue

```js
<script setup>


</script>

<template>
  <div class="xtx-goods-page">
    <div class="container">
      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">母婴
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/' }">跑步鞋
          </el-breadcrumb-item>
          <el-breadcrumb-item>抓绒保暖，毛毛虫子儿童运动鞋</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->

              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> 100+ </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>200+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>300+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>400+</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> 抓绒保暖，毛毛虫儿童鞋 </p>
              <p class="g-desc">好穿 </p>
              <p class="g-price">
                <span>200</span>
                <span> 100</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->

              <!-- 数据组件 -->

              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn">
                  加入购物车
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in 3" :key="item.value">
                      <span class="dt">白色</span>
                      <span class="dd">纯棉</span>
                    </li>
                  </ul>
                  <!-- 图片 -->

                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>
```

路由添加二级导航
src/router/index.js
```js
// 在二级分类添加一个子路由
{
  path: 'detail/:id',
  component: Detail
}
```


#### 16.2 详情页基础数据渲染

src/apis/detail.js

按照接口文档，编写接口如下：

```js
import request from '@/utils/http'

// 获取商品详情
export const getDetail = (id)=>{
  return request({
    url:'/goods',
    params:{
      id
    }
  })
}
```

详情页基础静态结构及基本数据渲染

```js
<script setup>
import {getDetail} from '@/apis/detail'
import { useRoute } from "vue-router"
import { ref,onMounted } from 'vue'

const goods = ref({})

const route = useRoute()

const getGoods = async()=>{
  const res = await getDetail(route.params.id)
  goods.value = res.result
  console.log(res)
}

onMounted(()=>getGoods())


</script>

<template>
  <div class="xtx-goods-page">
    <!-- <div class="container"> -->
    <!-- 2. v-if 解决办法 -->
    <div class="container" v-if="goods.details">

      <div class="bread-container">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <!-- 
            错误原因：goods 一开始是{}空对象 {}.categories[1] -> undefined -> undefined[1] 会报错
            解决办法：
            1. 可选连的语法 ?.
            2. v-if手动控制渲染时机，保证只有数据存在才渲染。
          -->
          <!-- 1.可选链方法
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories?.[1].id}` }">{{goods.categories?.[1].name}}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories?.[0].id}` }">{{ goods.categories?.[0].name }}
          </el-breadcrumb-item> 
          -->
          <el-breadcrumb-item :to="{ path: `/category/${goods.categories[1].id}` }">{{goods.categories[1].name}}
          </el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: `/category/sub/${goods.categories[0].id}` }">{{ goods.categories[0].name }}
          </el-breadcrumb-item>
          <el-breadcrumb-item>抓绒保暖，毛毛虫子儿童运动鞋</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <!-- 商品信息 -->
      <div class="info-container">
        <div>
          <div class="goods-info">
            <div class="media">
              <!-- 图片预览区 -->

              <!-- 统计数量 -->
              <ul class="goods-sales">
                <li>
                  <p>销量人气</p>
                  <p> {{goods.salesCount}}+ </p>
                  <p><i class="iconfont icon-task-filling"></i>销量人气</p>
                </li>
                <li>
                  <p>商品评价</p>
                  <p>{{goods.commentCount}}+</p>
                  <p><i class="iconfont icon-comment-filling"></i>查看评价</p>
                </li>
                <li>
                  <p>收藏人气</p>
                  <p>{{goods.collectCount}}+</p>
                  <p><i class="iconfont icon-favorite-filling"></i>收藏商品</p>
                </li>
                <li>
                  <p>品牌信息</p>
                  <p>{{goods.brand.name}}</p>
                  <p><i class="iconfont icon-dynamic-filling"></i>品牌主页</p>
                </li>
              </ul>
            </div>
            <div class="spec">
              <!-- 商品信息区 -->
              <p class="g-name"> {{goods.name}} </p>
              <p class="g-desc">{{goods.desc}} </p>
              <p class="g-price">
                <span>{{ goods.oldPrice }}</span>
                <span>{{ goods.price }}</span>
              </p>
              <div class="g-service">
                <dl>
                  <dt>促销</dt>
                  <dd>12月好物放送，App领券购买直降120元</dd>
                </dl>
                <dl>
                  <dt>服务</dt>
                  <dd>
                    <span>无忧退货</span>
                    <span>快速退款</span>
                    <span>免费包邮</span>
                    <a href="javascript:;">了解详情</a>
                  </dd>
                </dl>
              </div>
              <!-- sku组件 -->

              <!-- 数据组件 -->

              <!-- 按钮组件 -->
              <div>
                <el-button size="large" class="btn">
                  加入购物车
                </el-button>
              </div>

            </div>
          </div>
          <div class="goods-footer">
            <div class="goods-article">
              <!-- 商品详情 -->
              <div class="goods-tabs">
                <nav>
                  <a>商品详情</a>
                </nav>
                <div class="goods-detail">
                  <!-- 属性 -->
                  <ul class="attrs">
                    <li v-for="item in goods.details.properties" :key="item.value">
                      <span class="dt">{{item.name}}</span>
                      <span class="dd">{{ item.value }}</span>
                    </li>
                  </ul>
                  <!-- 图片 -->
                  <img v-for="img in goods.details.pictures" :src="img" alt="" :key="img">
                </div>
              </div>
            </div>
            <!-- 24热榜+专题推荐 -->
            <div class="goods-aside">

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>


<style scoped lang='scss'>
.xtx-goods-page {
  .goods-info {
    min-height: 600px;
    background: #fff;
    display: flex;

    .media {
      width: 580px;
      height: 600px;
      padding: 30px 50px;
    }

    .spec {
      flex: 1;
      padding: 30px 30px 30px 0;
    }
  }

  .goods-footer {
    display: flex;
    margin-top: 20px;

    .goods-article {
      width: 940px;
      margin-right: 20px;
    }

    .goods-aside {
      width: 280px;
      min-height: 1000px;
    }
  }

  .goods-tabs {
    min-height: 600px;
    background: #fff;
  }

  .goods-warn {
    min-height: 600px;
    background: #fff;
    margin-top: 20px;
  }

  .number-box {
    display: flex;
    align-items: center;

    .label {
      width: 60px;
      color: #999;
      padding-left: 10px;
    }
  }

  .g-name {
    font-size: 22px;
  }

  .g-desc {
    color: #999;
    margin-top: 10px;
  }

  .g-price {
    margin-top: 10px;

    span {
      &::before {
        content: "¥";
        font-size: 14px;
      }

      &:first-child {
        color: $priceColor;
        margin-right: 10px;
        font-size: 22px;
      }

      &:last-child {
        color: #999;
        text-decoration: line-through;
        font-size: 16px;
      }
    }
  }

  .g-service {
    background: #f5f5f5;
    width: 500px;
    padding: 20px 10px 0 10px;
    margin-top: 10px;

    dl {
      padding-bottom: 20px;
      display: flex;
      align-items: center;

      dt {
        width: 50px;
        color: #999;
      }

      dd {
        color: #666;

        &:last-child {
          span {
            margin-right: 10px;

            &::before {
              content: "•";
              color: $xtxColor;
              margin-right: 2px;
            }
          }

          a {
            color: $xtxColor;
          }
        }
      }
    }
  }

  .goods-sales {
    display: flex;
    width: 400px;
    align-items: center;
    text-align: center;
    height: 140px;

    li {
      flex: 1;
      position: relative;

      ~li::after {
        position: absolute;
        top: 10px;
        left: 0;
        height: 60px;
        border-left: 1px solid #e4e4e4;
        content: "";
      }

      p {
        &:first-child {
          color: #999;
        }

        &:nth-child(2) {
          color: $priceColor;
          margin-top: 10px;
        }

        &:last-child {
          color: #666;
          margin-top: 10px;

          i {
            color: $xtxColor;
            font-size: 14px;
            margin-right: 2px;
          }

          &:hover {
            color: $xtxColor;
            cursor: pointer;
          }
        }
      }
    }
  }
}

.goods-tabs {
  min-height: 600px;
  background: #fff;

  nav {
    height: 70px;
    line-height: 70px;
    display: flex;
    border-bottom: 1px solid #f5f5f5;

    a {
      padding: 0 40px;
      font-size: 18px;
      position: relative;

      >span {
        color: $priceColor;
        font-size: 16px;
        margin-left: 10px;
      }
    }
  }
}

.goods-detail {
  padding: 40px;

  .attrs {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 30px;

    li {
      display: flex;
      margin-bottom: 10px;
      width: 50%;

      .dt {
        width: 100px;
        color: #999;
      }

      .dd {
        flex: 1;
        color: #666;
      }
    }
  }

  >img {
    width: 100%;
  }
}

.btn {
  margin-top: 20px;

}

.bread-container {
  padding: 25px 0;
}
</style>
```


#### 16.3 详情页-热榜-基础组件封装和基础数据获取及渲染

- 16.3.1 基础组件封装-静态结构
src/views/Detail/components/DetailHot.vue

```js
<script setup>

</script>


<template>
  <div class="goods-hot">
    <h3>周日榜单</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in 3" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">一双男鞋</p>
      <p class="desc ellipsis">一双好穿的男鞋</p>
      <p class="price">&yen;200.00</p>
    </RouterLink>
  </div>
</template>


<style scoped lang="scss">
.goods-hot {
  h3 {
    height: 70px;
    background: $helpColor;
    color: #fff;
    font-size: 18px;
    line-height: 70px;
    padding-left: 25px;
    margin-bottom: 10px;
    font-weight: normal;
  }

  .goods-item {
    display: block;
    padding: 20px 30px;
    text-align: center;
    background: #fff;

    img {
      width: 160px;
      height: 160px;
    }

    p {
      padding-top: 10px;
    }

    .name {
      font-size: 16px;
    }

    .desc {
      color: #999;
      height: 29px;
    }

    .price {
      color: $priceColor;
      font-size: 20px;
    }
  }
}
</style>
```

在父组件src/views/Detail/index.vue 中引入热榜组件
```js
<!-- 24热榜+专题推荐 -->
<div class="goods-aside">
  <!-- 24小时 -->
  <DetailHot />
  <!-- 周 -->
  <DetailHot />
</div>
```



- 16.3.2 接口封装
src/apis/detail.js
```js
/**
 * 获取热榜商品
 * @param {Number} id - 商品id
 * @param {Number} type - 1代表24小时热销榜 2代表周热销榜
 * @param {Number} limit - 获取个数
 */
export const getHotGoodsAPI = ({ id, type, limit = 3 }) => {
  return request({
    url:'/goods/hot',
    params:{
      id, 
      type, 
      limit
    }
  })
}
```

- 16.3.3 获取数据并渲染模板

src/views/Detail/components/DetailHot.vue
```js
<script setup>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
// 以24小时热榜为例获取数据渲染模板
// 1. 封装接口
// 2. 调用接口渲染模板
import { getHotGoodsAPI } from '@/apis/detail'

const route = useRoute()

const hotList = ref([])

const getHotList = async()=>{
  const res = await getHotGoodsAPI(
    {
      id:route.params.id,
      type:1
    }
  )
  hotList.value = res.result
}

onMounted(()=>{
  getHotList()
})

</script>


<template>
  <div class="goods-hot">
    <h3>周日榜单</h3>
    <!-- 商品区块 -->
    <RouterLink to="/" class="goods-item" v-for="item in hotList" :key="item.id">
      <img :src="item.picture" alt="" />
      <p class="name ellipsis">{{ item.name }}</p>
      <p class="desc ellipsis">{{ item.desc }}</p>
      <p class="price">&yen;{{ item.price }}</p>
    </RouterLink>
  </div>
</template>

```


#### 16.4 详情页-热榜-适配title和列表内容

```js
// 为满足不同title和内容的适配，这里设计一个props值来区别

const props = defineProps({
  hotType:{
    type:Number
  }
})

// 适配title  type=1 为24小时榜  type=2 为周榜
const TYPEMAP = {
  1:'24小时热榜',
  2:'周热榜'
}

const title = computed(()=>TYPEMAP[props.hotType])

const getHotList = async()=>{
  const res = await getHotGoodsAPI(
    {
      id:route.params.id,
      type:props.hotType
    }
  )
  hotList.value = res.result
}

<h3>{{title}}</h3>

```

在父组件传入对应的type标记值

```js
<!-- 24热榜+专题推荐 -->
<div class="goods-aside">
  <!-- 24小时 -->
  <DetailHot :hotType="1"/>
  <!-- 周 -->
  <DetailHot :hotType="2"/>
</div>
```


#### 16.5 图片预览组件-小图切换大图显示

**思路：维护一个数组图片列表，鼠标滑入小图记录当前小图下标值，通过下标值在数组中取对应图片，显示到大图位置**

新建图片预览组件，因为是公共组件，多个位子都会用到所以放大components目录下。
src/components/ImageView/index.vue

基础静态模板
```js
<script setup>
// 图片列表
const imageList = [
  "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
  "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
  "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
  "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
  "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
]
</script>


<template>
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[0]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" :style="{ left: `0px`, top: `0px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[0]})`,
        backgroundPositionX: `0px`,
        backgroundPositionY: `0px`,
      },
    ]" v-show="false"></div>
  </div>
</template>

<style scoped lang="scss">
.goods-image {
  width: 480px;
  height: 400px;
  position: relative;
  display: flex;

  .middle {
    width: 400px;
    height: 400px;
    background: #f5f5f5;
  }

  .large {
    position: absolute;
    top: 0;
    left: 412px;
    width: 400px;
    height: 400px;
    z-index: 500;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    background-repeat: no-repeat;
    // 背景图:盒子的大小 = 2:1  将来控制背景图的移动来实现放大的效果查看 background-position
    background-size: 800px 800px;
    background-color: #f8f8f8;
  }

  .layer {
    width: 200px;
    height: 200px;
    background: rgba(0, 0, 0, 0.2);
    // 绝对定位 然后跟随咱们鼠标控制left和top属性就可以让滑块移动起来
    left: 0;
    top: 0;
    position: absolute;
  }

  .small {
    width: 80px;

    li {
      width: 68px;
      height: 68px;
      margin-left: 12px;
      margin-bottom: 15px;
      cursor: pointer;

      &:hover,
      &.active {
        border: 2px solid $xtxColor;
      }
    }
  }
}
</style>
```

将组件引入到详情页对应位子

src/views/Detail/index.vue
```js
import ImageView from '@/components/ImageView/index.vue'

<div class="media">
  <!-- 图片预览区 -->
  <ImageView />
```

根据基础静态模板可以看出，大图`:src="imageList[0]"`默认绑定的图片列表的第1个，这个我们可以将图片列表下标绑定给该属性，然后通过小图的鼠标mouseenter切换实现大图切换。
所以先生成一个值用来存储图片列表下标
```js
// 1.小图切换大图显示
const activeIndex = ref(0)

// 鼠标滑入事件函数
const enterHandler = (i)=>{
  activeIndex.value = i
}

<div class="middle" ref="target">
  {/* 绑定下标值 */}
  <img :src="imageList[activeIndex]" alt="" />
  <!-- 蒙层小滑块 -->
  <div class="layer" :style="{ left: `0px`, top: `0px` }"></div>
</div>
<!-- 小图列表 -->
<ul class="small">
  {/* 绑定鼠标事件，绑定相应滑入样式 */}
  <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="activeIndex === i ? 'active':''">
    <img :src="img" alt="" />
  </li>
</ul>

```


#### 16.6 图片预览组件-放大镜效果

功能拆解：
1. 左侧滑块跟随鼠标移动
    思路：
      获取到当前的鼠标在盒子内的相对位置（使用vueuse的useMouseInElement），控制滑块跟随鼠标移动（left/top）
        - 有效移动范围内的计算逻辑
            横向：100(蒙层小盒子宽度一半的值) < elementX < 300(大盒子宽度-蒙层小盒子宽度一半的值) , left = elementX - 小滑块宽度一半
            纵向：100(蒙层小盒子宽度一半的值) < elementY < 300(大盒子宽度-蒙层小盒子宽度一半的值) , top = elementY - 小滑块高度一半
        - 边界距离控制
            横向：elementX > 300 left = 200 elementX < 100 left =0
            纵向：elementY > 300 top = 200 elementY < 100 top = 0
2. 右侧大图放大效果实现
    效果：为实现大图效果，大图的宽高是小图的2倍
    思路：大图的用方向和滑块的移动方向相反，且数值为2倍
3. 鼠标移入控制滑块和大图显示隐藏

```js
<script setup>
import { ref,watch } from "vue"
import { useMouseInElement } from "@vueuse/core"

{/* 将图片列表使用props传参的方式由父组件传递过来 */}
const props = defineProps({
  imageList:{
    type:Array,
    default:()=>[]
  }
})

// 图片列表
// const imageList = [
//   "https://yanxuan-item.nosdn.127.net/d917c92e663c5ed0bb577c7ded73e4ec.png",
//   "https://yanxuan-item.nosdn.127.net/e801b9572f0b0c02a52952b01adab967.jpg",
//   "https://yanxuan-item.nosdn.127.net/b52c447ad472d51adbdde1a83f550ac2.jpg",
//   "https://yanxuan-item.nosdn.127.net/f93243224dc37674dfca5874fe089c60.jpg",
//   "https://yanxuan-item.nosdn.127.net/f881cfe7de9a576aaeea6ee0d1d24823.jpg"
// ]



// 1.小图切换大图显示
const activeIndex = ref(0)

const enterHandler = (i)=>{
  activeIndex.value = i
}

// 2.获取鼠标相对位置
const target = ref(null)

const {elementX,elementY,isOutside} = useMouseInElement(target)

// 3. 控制滑块跟随鼠标移动（监听elementX/Y变化，一旦变化 重新设置left/top)
// 滑块的2个做标
const left = ref(0)
const top = ref(0)


// 初始化大图2个做标
const positionX= ref(0)
const positionY= ref(0)

watch([elementX,elementY,isOutside],()=>{
  // 这里优化一下性能，如果没有进入到区域就不执行下列代码
  if(isOutside.value) return
  // console.log('后续逻辑执行了')
  // 有效范围内控制滑块距离
  // 横向
  if(elementX.value > 100 && elementX.value < 300){
    left.value = elementX.value - 100
  }
  // 纵向
  if(elementY.value > 100 && elementY.value < 300){
    top.value = elementY.value - 100
  }
  // 边界处理
  if(elementX.value > 300){
    left.value = 200
  }
  if(elementX.value < 100){
    left.value = 0
  }
  if(elementY.value > 300){
    top.value = 200
  }
  if(elementY.value < 100){
    top.value = 0
  }
  // 4. 控制大图显示
  positionX.value = -left.value * 2
  positionY.value = -top.value * 2
})


</script>

<template>
  <!-- {{ elementX}},{{elementY}},{{isOutside }} -->
  <div class="goods-image">
    <!-- 左侧大图-->
    <div class="middle" ref="target">
      <img :src="imageList[activeIndex]" alt="" />
      <!-- 蒙层小滑块 -->
      <div class="layer" v-show="!isOutside" :style="{ left: `${left}px`, top: `${top}px` }"></div>
    </div>
    <!-- 小图列表 -->
    <ul class="small">
      <li v-for="(img, i) in imageList" :key="i" @mouseenter="enterHandler(i)" :class="activeIndex === i ? 'active':''">
        <img :src="img" alt="" />
      </li>
    </ul>
    <!-- 放大镜大图 -->
    <div class="large" :style="[
      {
        backgroundImage: `url(${imageList[activeIndex]})`,
        backgroundPositionX: `${positionX}px`,
        backgroundPositionY: `${positionY}px`,
      },
    ]" v-show="!isOutside"></div>
  </div>
</template>

```


#### 16.7 sku组件
**sku的概念**
`存货单位（stock keeping unit -> 库存单元）是一个会计学名词，定义为库存管理中的最小可用单元，例如纺织品中的一个SKU通常表示规格、颜色、款式，而在连锁门店中有时称单品为一个SKU`

该组件在次项目中主要是在选择商品规格（颜色，尺码等）

**sku组件的作用：产出当前用户选择的商品规格，为加入购物车操作提供数据信息**

导入sku组件，并将相关数据使用porps方法由父组件传入
因为是通用组件，所以在src/components/XtxSku/index.vue

```js
<template>
  <div class="goods-sku">
    <dl v-for="item in goods.specs" :key="item.id">
      <dt>{{ item.name }}</dt>
      <dd>
        <template v-for="val in item.values" :key="val.name">
          <img :class="{ selected: val.selected, disabled: val.disabled }" @click="clickSpecs(item, val)"
            v-if="val.picture" :src="val.picture" />
          <span :class="{ selected: val.selected, disabled: val.disabled }" @click="clickSpecs(item, val)" v-else>{{
              val.name
          }}</span>
        </template>
      </dd>
    </dl>
  </div>
</template>
<script>
import { watchEffect } from 'vue'
import getPowerSet from './power-set'
const spliter = '★'
// 根据skus数据得到路径字典对象
const getPathMap = (skus) => {
  const pathMap = {}
  if (skus && skus.length > 0) {
    skus.forEach(sku => {
      // 1. 过滤出有库存有效的sku
      if (sku.inventory) {
        // 2. 得到sku属性值数组
        const specs = sku.specs.map(spec => spec.valueName)
        // 3. 得到sku属性值数组的子集
        const powerSet = getPowerSet(specs)
        // 4. 设置给路径字典对象
        powerSet.forEach(set => {
          const key = set.join(spliter)
          // 如果没有就先初始化一个空数组
          if (!pathMap[key]) {
            pathMap[key] = []
          }
          pathMap[key].push(sku.id)
        })
      }
    })
  }
  return pathMap
}

// 初始化禁用状态
function initDisabledStatus (specs, pathMap) {
  if (specs && specs.length > 0) {
    specs.forEach(spec => {
      spec.values.forEach(val => {
        // 设置禁用状态
        val.disabled = !pathMap[val.name]
      })
    })
  }
}

// 得到当前选中规格集合
const getSelectedArr = (specs) => {
  const selectedArr = []
  specs.forEach((spec, index) => {
    const selectedVal = spec.values.find(val => val.selected)
    if (selectedVal) {
      selectedArr[index] = selectedVal.name
    } else {
      selectedArr[index] = undefined
    }
  })
  return selectedArr
}

// 更新按钮的禁用状态
const updateDisabledStatus = (specs, pathMap) => {
  // 遍历每一种规格
  specs.forEach((item, i) => {
    // 拿到当前选择的项目
    const selectedArr = getSelectedArr(specs)
    // 遍历每一个按钮
    item.values.forEach(val => {
      if (!val.selected) {
        selectedArr[i] = val.name
        // 去掉undefined之后组合成key
        const key = selectedArr.filter(value => value).join(spliter)
        val.disabled = !pathMap[key]
      }
    })
  })
}


export default {
  name: 'XtxGoodSku',
  props: {
    // specs:所有的规格信息  skus:所有的sku组合
    goods: {
      type: Object,
      default: () => ({ specs: [], skus: [] })
    }
  },
  emits: ['change'],
  setup (props, { emit }) {
    let pathMap = {}
    watchEffect(() => {
      // 得到所有字典集合
      pathMap = getPathMap(props.goods.skus)
      // 组件初始化的时候更新禁用状态
      initDisabledStatus(props.goods.specs, pathMap)
    })

    const clickSpecs = (item, val) => {
      if (val.disabled) return false
      // 选中与取消选中逻辑
      if (val.selected) {
        val.selected = false
      } else {
        item.values.forEach(bv => { bv.selected = false })
        val.selected = true
      }
      // 点击之后再次更新选中状态
      updateDisabledStatus(props.goods.specs, pathMap)
      // 把选择的sku信息传出去给父组件
      // 触发change事件将sku数据传递出去
      const selectedArr = getSelectedArr(props.goods.specs).filter(value => value)
      // 如果选中得规格数量和传入得规格总数相等则传出完整信息(都选择了)
      // 否则传出空对象
      if (selectedArr.length === props.goods.specs.length) {
        // 从路径字典中得到skuId
        const skuId = pathMap[selectedArr.join(spliter)][0]
        const sku = props.goods.skus.find(sku => sku.id === skuId)
        // 传递数据给父组件
        emit('change', {
          skuId: sku.id,
          price: sku.price,
          oldPrice: sku.oldPrice,
          inventory: sku.inventory,
          specsText: sku.specs.reduce((p, n) => `${p} ${n.name}：${n.valueName}`, '').trim()
        })
      } else {
        emit('change', {})
      }
    }
    return { clickSpecs }
  }
}
</script>

<style scoped lang="scss">
@mixin sku-state-mixin {
  border: 1px solid #e4e4e4;
  margin-right: 10px;
  cursor: pointer;

  &.selected {
    border-color: $xtxColor;
  }

  &.disabled {
    opacity: 0.6;
    border-style: dashed;
    cursor: not-allowed;
  }
}

.goods-sku {
  padding-left: 10px;
  padding-top: 20px;

  dl {
    display: flex;
    padding-bottom: 20px;
    align-items: center;

    dt {
      width: 50px;
      color: #999;
    }

    dd {
      flex: 1;
      color: #666;

      >img {
        width: 50px;
        height: 50px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }

      >span {
        display: inline-block;
        height: 30px;
        line-height: 28px;
        padding: 0 20px;
        margin-bottom: 4px;
        @include sku-state-mixin;
      }
    }
  }
}
</style>
```
在XtxSku目录下新建相关的power-set.js
```js

export default function bwPowerSet (originalSet) {
  const subSets = []

  // We will have 2^n possible combinations (where n is a length of original set).
  // It is because for every element of original set we will decide whether to include
  // it or not (2 options for each set element).
  const numberOfCombinations = 2 ** originalSet.length

  // Each number in binary representation in a range from 0 to 2^n does exactly what we need:
  // it shows by its bits (0 or 1) whether to include related element from the set or not.
  // For example, for the set {1, 2, 3} the binary number of 0b010 would mean that we need to
  // include only "2" to the current set.
  for (let combinationIndex = 0; combinationIndex < numberOfCombinations; combinationIndex += 1) {
    const subSet = []

    for (let setElementIndex = 0; setElementIndex < originalSet.length; setElementIndex += 1) {
      // Decide whether we need to include current element into the subset or not.
      if (combinationIndex & (1 << setElementIndex)) {
        subSet.push(originalSet[setElementIndex])
      }
    }

    // Add current subset to the list of all subsets.
    subSets.push(subSet)
  }

  return subSets
}
```

在父组件src/views/Detail/index.vue中导入并使用,并将获取到的数据根据上下文以props对象方式传入`:goods="goods"`，并新建一个change方法用以接受sku组件的修改变化。


```js

<script setup>
import XtxSku from '@/components/XtxSku/index.vue'

// .... 以上内容不变

// sku规格被操作时触发
const skuChange = (sku)=>{
  console.log(sku)
}

</script>

<template>
// .... 以上内容不变

<!-- sku组件 -->
<XtxSku  :goods="goods" @change="skuChange"/>

// .... 一下内容不变
</template>
```

#### 16.8 全局注册通用组件
为了节省每次在使用通用组件时需要导入之后才能引用，这里将所有的通用组件统一处理，之后采用全局注册方式，这样在项目内任意位子就可以直接使用注册的组件了，就不需要麻烦的导入。

在src/components/目录下新建index.js统一注册文件

```js
// 把components中的所有组件都进行全局化注册
// 通过插件的方式
import ImageView from './ImageView/index.vue'
import Sku from './XtxSku/index.vue'

export const componentPlugin = {
  install(app){
    // app.component('组件名称',组件配置对象)
    app.component('XtxImageView',ImageView)
    app.component('XtxSku',Sku)
  }
}
```

再在项目入口文件main.js中引入，并使用
```js
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

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.use(lazyPlugin)
app.use(componentPlugin)
app.mount("#app")
```

这样项目中使用到这2个通用组件的位子就不要引入了直接使用就行了
```js
// 例如sku组件，就需要再Detail组件中导入sku组件了，直接在对应需要使用的位子直接使用就行了，使用的名称必须和注册时编辑的名称一致
<XtxSku  :goods="goods" @change="skuChange"/>

```


### 17 登录页

#### 17.1 路由配置及静态页面搭建
1. src/router/index.js中配置路由地址

```js
{
  path:'/login',
  component: Login,
}
```

2. 静态页面搭建

src/views/Login/index.vue

```js
<script setup>

</script>


<template>
  <div>
    <header class="login-header">
      <div class="container m-top-20">
        <h1 class="logo">
          <RouterLink to="/">小兔鲜</RouterLink>
        </h1>
        <RouterLink class="entry" to="/">
          进入网站首页
          <i class="iconfont icon-angle-right"></i>
          <i class="iconfont icon-angle-right"></i>
        </RouterLink>
      </div>
    </header>
    <section class="login-section">
      <div class="wrapper">
        <nav>
          <a href="javascript:;">账户登录</a>
        </nav>
        <div class="account-box">
          <div class="form">
            <el-form label-position="right" label-width="60px"
              status-icon>
              <el-form-item  label="账户">
                <el-input/>
              </el-form-item>
              <el-form-item label="密码">
                <el-input/>
              </el-form-item>
              <el-form-item label-width="22px">
                <el-checkbox  size="large">
                  我已同意隐私条款和服务条款
                </el-checkbox>
              </el-form-item>
              <el-button size="large" class="subBtn">点击登录</el-button>
            </el-form>
          </div>
        </div>
      </div>
    </section>

    <footer class="login-footer">
      <div class="container">
        <p>
          <a href="javascript:;">关于我们</a>
          <a href="javascript:;">帮助中心</a>
          <a href="javascript:;">售后服务</a>
          <a href="javascript:;">配送与验收</a>
          <a href="javascript:;">商务合作</a>
          <a href="javascript:;">搜索推荐</a>
          <a href="javascript:;">友情链接</a>
        </p>
        <p>CopyRight &copy; 小兔鲜儿</p>
      </div>
    </footer>
  </div>
</template>

<style scoped lang='scss'>
.login-header {
  background: #fff;
  border-bottom: 1px solid #e4e4e4;

  .container {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
  }

  .logo {
    width: 200px;

    a {
      display: block;
      height: 132px;
      width: 100%;
      text-indent: -9999px;
      background: url("@/assets/images/logo.png") no-repeat center 18px / contain;
    }
  }

  .sub {
    flex: 1;
    font-size: 24px;
    font-weight: normal;
    margin-bottom: 38px;
    margin-left: 20px;
    color: #666;
  }

  .entry {
    width: 120px;
    margin-bottom: 38px;
    font-size: 16px;

    i {
      font-size: 14px;
      color: $xtxColor;
      letter-spacing: -5px;
    }
  }
}

.login-section {
  background: url('@/assets/images/login-bg.png') no-repeat center / cover;
  height: 488px;
  position: relative;

  .wrapper {
    width: 380px;
    background: #fff;
    position: absolute;
    left: 50%;
    top: 54px;
    transform: translate3d(100px, 0, 0);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);

    nav {
      font-size: 14px;
      height: 55px;
      margin-bottom: 20px;
      border-bottom: 1px solid #f5f5f5;
      display: flex;
      padding: 0 40px;
      text-align: right;
      align-items: center;

      a {
        flex: 1;
        line-height: 1;
        display: inline-block;
        font-size: 18px;
        position: relative;
        text-align: center;
      }
    }
  }
}

.login-footer {
  padding: 30px 0 50px;
  background: #fff;

  p {
    text-align: center;
    color: #999;
    padding-top: 20px;

    a {
      line-height: 1;
      padding: 0 10px;
      color: #999;
      display: inline-block;

      ~a {
        border-left: 1px solid #ccc;
      }
    }
  }
}

.account-box {
  .toggle {
    padding: 15px 40px;
    text-align: right;

    a {
      color: $xtxColor;

      i {
        font-size: 14px;
      }
    }
  }

  .form {
    padding: 0 20px 20px 20px;

    &-item {
      margin-bottom: 28px;

      .input {
        position: relative;
        height: 36px;

        >i {
          width: 34px;
          height: 34px;
          background: #cfcdcd;
          color: #fff;
          position: absolute;
          left: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 18px;
        }

        input {
          padding-left: 44px;
          border: 1px solid #cfcdcd;
          height: 36px;
          line-height: 36px;
          width: 100%;

          &.error {
            border-color: $priceColor;
          }

          &.active,
          &:focus {
            border-color: $xtxColor;
          }
        }

        .code {
          position: absolute;
          right: 1px;
          top: 1px;
          text-align: center;
          line-height: 34px;
          font-size: 14px;
          background: #f5f5f5;
          color: #666;
          width: 90px;
          height: 34px;
          cursor: pointer;
        }
      }

      >.error {
        position: absolute;
        font-size: 12px;
        line-height: 28px;
        color: $priceColor;

        i {
          font-size: 14px;
          margin-right: 2px;
        }
      }
    }

    .agree {
      a {
        color: #069;
      }
    }

    .btn {
      display: block;
      width: 100%;
      height: 40px;
      color: #fff;
      text-align: center;
      line-height: 40px;
      background: $xtxColor;

      &.disabled {
        background: #cfcdcd;
      }
    }
  }

  .action {
    padding: 20px 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    .url {
      a {
        color: #999;
        margin-left: 10px;
      }
    }
  }
}

.subBtn {
  background: $xtxColor;
  width: 100%;
  color: #fff;
}
</style>
```

在浏览器中直接修改地址，添加/login访问查看一下是否正常显示

下一步需要修改一下Layout页面的LayoutNav.vue组件中负责登陆控制的位子
可以看到改位置是一个多模板结构，通过v-if 和 v-else控制登陆和非登录状态
这里将静态结构的`v-if="true"`改为`false`。并给非登录状态下的请先登录按钮添加一个点击事件跳转到登陆页`@click="$router.push('/login')"`

```js
<template v-if="false">
  <li><a href="javascript:;"><i class="iconfont icon-user"></i>周杰伦</a></li>
  <li>
    <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
      <template #reference>
        <a href="javascript:;">退出登录</a>
      </template>
    </el-popconfirm>
  </li>
  <li><a href="javascript:;">我的订单</a></li>
  <li><a href="javascript:;">会员中心</a></li>
</template>
<template v-else>
  <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
  <li><a href="javascript:;">帮助中心</a></li>
  <li><a href="javascript:;">关于我们</a></li>
</template>
```


#### 17.2 登录页的表单数据验证

表单效验步骤：
1. 按照接口字段准备表单对象并绑定

2. 按照产品要求准备规则对象并绑定

3. 指定表单域的效验字段名

4. 把表单对象进行双向绑定

验证规则：
用户名：不能为空，字段名为 account
密码：不能为空且6-14个字符，字段名为 password
同意协议：必选，字段名为 agree


根据Element-Plus文档可知Form表单校验功能分别对应
el-form（绑定表单对象和规则参数）
el-form-item（绑定使用规则字段）
el-input（双向绑定表单数据）

```js
<script setup>


// 表单校验（账号名 + 密码）
import { ref } from 'vue'

// 1. 准备表单对象
const formData = ref({
  account:'', // 用户名
  password:'' // 密码
})

const rules = {
  account:[
    {required:true,message:'用户名不能为空',trigger:'blur'}
  ],
  password:[
    {required:true,message:'密码不能为空',trigger:'blur'},
    {min:6,max:14,message:'密码长度为6-14个字符',trigger:'blur'}
  ]
}

</script>

<template>
// ... 以上内容不变

<el-form :model="formData" :rules="rules" label-position="right" label-width="60px" status-icon>
  <el-form-item  label="账户" prop="account">
    <el-input v-model="formData.account"/>
  </el-form-item>
  <el-form-item label="密码" prop="password">
    <el-input v-model="formData.password"/>
  </el-form-item>
  <el-form-item label-width="22px">
    <el-checkbox  size="large">
      我已同意隐私条款和服务条款
    </el-checkbox>
  </el-form-item>
  <el-button size="large" class="subBtn">点击登录</el-button>
</el-form>

// ... 以下内容不变
</template>
```

自定义效验规则

ElementPlus表单组件内置了出事的效验配置，应对简单的效验规则通过配置即可，如果想要定制一些特殊的效验需求，可以使用自定义效验规则，如格式如下：
```js
{
  validator:(rule,value,callback)=>{
    // rule：自定义效验逻辑
    // value：当前输入的数据
    // callback：效验处理函数 效验通过时调用
  }
}
```
同意框的校验要求：
如果勾选了协议框，通过效验，如果没有勾选，不通过效验


```js
// 1. 准备表单对象
const formData = ref({
  account:'', // 用户名
  password:'', // 密码
  agree:false
})

const rules = {
  account:[
    {required:true,message:'用户名不能为空',trigger:'blur'}
  ],
  password:[
    {required:true,message:'密码不能为空',trigger:'blur'},
    {min:6,max:14,message:'密码长度为6-14个字符',trigger:'blur'}
  ],
  agree:[
    // 2.自定义表单效验
    {
      validator:(rule,value,callback)=>{
        // console.log(rule,value)
        // 自定义校验逻辑
        // 勾选表示用过，不勾选表示不通过
        if(value){
          callback()
        }else{
          callback(new Error('请勾选协议'))
        }
      }
    }
  ]
}
```

如果直接点击登录按钮不输入任何数据，这样就不会出发验证，这里我们通过表单的统一效验实现
```js
// 3. 获取form实例做统一效验
const formRef = ref(null)

const login = ()=>{
  // 调用实例方法
  formRef.value.validate((valid)=>{
    // valid：所有表单都通过效验，才为true
    // console.log(valid)
    // 以参数作为判断条件
    if(valid){
      // do login
      
    }
  })
}

```

#### 17.3 登陆处理
src/apis/user.js
1. 新建api接口
```js
import request from '@/utils/http'

// 登陆请求
export const loginAPI = ({account,password})=>{
  return request({
    url:'/login',
    method:'POST',
    data:{
      account,
      password
    }
  })
}
```

2. 引入并调用接口获取数据

```js
import {loginAPI} from '@/apis/user'

const login = ()=>{
  const {account,password} = formData.value
  // 调用实例方法
  formRef.value.validate(async(valid)=>{
    // valid：所有表单都通过效验，才为true
    // console.log(valid)
    // 以参数作为判断条件
    if(valid){
      // do login
      const res = await loginAPI({account,password})
      // console.log(res)
    }
  })
}
```

3. 提示用户，跳转路由到首页

```js
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'

const router = useRouter()

const login = ()=>{
  const {account,password} = formData.value
  // 调用实例方法
  formRef.value.validate(async(valid)=>{
    // valid：所有表单都通过效验，才为true
    // console.log(valid)
    // 以参数作为判断条件
    if(valid){
      // do login
      const res = await loginAPI({account,password})
      // console.log(res)
      // 提示用户
      ElMessage({
        type:'success',
        message:'登陆成功'
      })
      // 跳转首页
      router.replace('/')
    }
  })
}
```

4. 登陆失败的提示，需要做统一处理，这里我们在请求的相应拦截器位置做统一处理
src/utils/http.js

```js
// 先导入相应的样式和ElMessage组件
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'

// axios响应式拦截器
httpInstance.interceptors.response.use(response => {
  // 2xx 范围内的状态码都会触发该函数。
  // 对响应数据做点什么 
  return response.data
}, error => {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 统一错误提示
  // 这里不知道错误返回信息的结构可以先打印一下error
  ElMessage({
    type:'warning',
    message:error.response.data.message
  })
  
  return Promise.reject(error)
})
```

#### 17.4 登陆-Pinia管理用户数据

因为用户数据在多个业务场景中都需要用到，所以这里我们将共享数据采用Pinia集中管理更方便

**使用Pinia管理数据**

`遵循理念：和数据相关的所有操作（state，action）都放到Pinia中，组件只负责出发aciton函数`


在stores中新建user模块

src/stores/user.js

```js
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/apis/user"

export const useUserStore = defineStore('user',()=>{
  // 1. 定义管理用户数据的state
  const userInfo = ref({})
  // 2. 定义获取接口数据的action函数
  const getUserInfo = async({account,password})=>{
    const res = await loginAPI({account,password})
    userInfo.value = res.result
  }
  // 3. 以对象格式将state和action return
  return {
    userInfo,
    getUserInfo
  }
})
```

在登陆页中引入并调用action存入相应用户信息

```js
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()

```

```js
// 登陆方法
const login = ()=>{
  const {account,password} = formData.value
  // 调用实例方法
  formRef.value.validate(async(valid)=>{
    // valid：所有表单都通过效验，才为true
    // console.log(valid)
    // 以参数作为判断条件
    if(valid){
      // do login
      // const res = await loginAPI({account,password})
      await userStore.getUserInfo({account,password})
      // console.log(res)
      // 提示用户
      ElMessage({
        type:'success',
        message:'登陆成功'
      })
      // 跳转首页
      router.replace('/')
    }
  })
}
```

#### 17.5 持久化用户数据

1. 用户数据中有一个关键的数据叫Token（用来标识用户是否登陆），而Token持续一段时间才会过期。
2. Pinia的存储是基于内存的，刷新就丢失，为了保持登陆状态就要做到刷新而不丢失，需要配合持久化进行存储。

目的：保持token不丢失，保持登陆状态。

最终效果：操作state时会自动把用户数据在本地的localStorage也存一份，刷新的时候会从localStorage中先取如果取到了就使用里面的数据，如果取不到在初始化为空解决刷新问题。

这里为了方便使用Pinia插件`pinia-plugin-persistedstate`适用于Pinia的持久化存储插件。


- 安装插件
```cmd
pnpm add pinia-plugin-persistedstate
```

- 将插件添加到你的 pinia 实例中
在入口文件src/main.js中
```js
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// 生成实例
const pinia = createPinia()
// 实例使用
pinia.use(piniaPluginPersistedstate)
// 绑定使用实例
app.use(pinia)
```

- 用法（参考官方文档 https://prazdevs.github.io/pinia-plugin-persistedstate/zh/guide/）

在声明您的store时，请将新persist选项设置为 true。
src/stores/user.js
```js
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/apis/user"

export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
    }
    // 3. 以对象格式将state和action return
    return {
      userInfo,
      getUserInfo,
    }
  },
  {
    persist: true,
  }
)
```

#### 17.6 登陆和非登录状态下的模板适配

src/views/Layout/components/LayoutNav.vue
```js
<script setup>
import { useUserStore } from '@/stores/user'

const userStore = useUserStore()


</script>

<template>
  <nav class="app-topnav">
    <div class="container">
      <ul>
        <!-- 多模板渲染 区分登陆状态和非登陆状态 -->
        <!-- 适配思路：登陆时显示第一块  非登录时显示第二块  是否有token -->
        <template v-if="userStore.userInfo.token">
          <li><a href="javascript:;"><i class="iconfont icon-user"></i>{{userStore.userInfo.nickname}}</a></li>
          <li>
            <el-popconfirm title="确认退出吗?" confirm-button-text="确认" cancel-button-text="取消">
              <template #reference>
                <a href="javascript:;">退出登录</a>
              </template>
            </el-popconfirm>
          </li>
          <li><a href="javascript:;">我的订单</a></li>
          <li><a href="javascript:;">会员中心</a></li>
        </template>
        <template v-else>
          <li><a href="javascript:;" @click="$router.push('/login')">请先登录</a></li>
          <li><a href="javascript:;">帮助中心</a></li>
          <li><a href="javascript:;">关于我们</a></li>
        </template>
      </ul>
    </div>
  </nav>
</template>
```

#### 17.7 请求拦截器携带token
`为什么要在请求拦截器中携带token`
Token作为用户标识，在很多个接口中都需要携带Token才可以正确获取数据，所以需要在接口调用时携带Token，另外，为了统一控制采取请求拦截器携带的方案。

`如何配置`

Axios请求拦截器可以在接口真是发起之前对请求参数做一些事情，通常Token数据会在此时注入到请求header中，格式按照后端要求的格式进行拼接处理。
样例：
```js
instance.interceptors.request.use(config=>{
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  if(token){
    config.header.Authorization = `Bearer ${token}`
  }
  return config
},error=>Promise.reject(error))
```

本项目中实现
src/utils/http.js
```js
import { useUserStore } from "@/stores/user"

// 拦截器
// axios请求拦截器
httpInstance.interceptors.request.use(config => {
  // 在发送请求之前做些什么
  // 1.从pinia中获取token数据
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  // 2.按照后端要求拼接token数据到请求头中
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
}, error => {
  // 对请求错误做些什么
  return Promise.reject(error)
})
```


#### 17.8 退出登陆功能实现

实现步骤：
1. 点击退出登陆，弹出确认框
      - 这里使用elementPlus的el-popconfirm 气泡确认框组件

2. 点击确定按钮实现退出登陆逻辑
    退出登陆逻辑包括：
      - 1. 清除当前用户信息
      - 2. 跳转到登陆页面


新建清除用户信息的action事件，在确认登陆时调用触发清除用户信息
src/stores.user.js
```js
import { defineStore } from "pinia"
import { ref } from "vue"
import { loginAPI } from "@/apis/user"

export const useUserStore = defineStore(
  "user",
  () => {
    // 1. 定义管理用户数据的state
    const userInfo = ref({})
    // 2. 定义获取接口数据的action函数
    const getUserInfo = async ({ account, password }) => {
      const res = await loginAPI({ account, password })
      userInfo.value = res.result
    }
    // 退出时清除用户信息
    const clearUserInfo = ()=>{
      userInfo.value = {}
    }
    // 3. 以对象格式将state和action return
    return {
      userInfo,
      getUserInfo,
      clearUserInfo
    }
  },
  {
    persist: true,
  }
)

```



src/views/Layout/components/LayoutNav.vue

```js

<script setup>
import { useUserStore } from '@/stores/user'

import { useRouter } from 'vue-router'

const userStore = useUserStore()

const router = useRouter()

const confirm = ()=>{
  // console.log('点击了确认')
  // 退出登陆业务逻辑实现
  // 1. 清除当前用户信息 触发action
  userStore.clearUserInfo()
  // 2. 跳转到登陆页面
  router.push('/login')
}


</script>

<template>
  // ...以上代码不变
  // 根据elementplus文档 可知 el-popfirm组件有一个confirm事件用于触发点击确认
  <el-popconfirm title="确认退出吗?" @confirm="confirm" confirm-button-text="确认" cancel-button-text="取消">
    <template #reference>
      <a href="javascript:;">退出登录</a>
    </template>
  </el-popconfirm>
  // ...以下代码不变
</template>
```


#### 17.9 登陆-token失效401拦截

**token的有效性可以保持一段时间，如果用户一段时间内不做任何操作，token就会失效，使用失效的token再去请求一些皆苦，接口就会报401错误码，需要我们做额外处理**

`为了能确认用户到底是在访问哪个接口时出现的401错误，所以我们在拦截器的位子做401错误处理，这里具体是在响应拦截器中做`

`检测到401之后，意味着token失效了，老的token失效就是非登录状态，需要跳回到登陆页`

解决方案：
- 在Axios响应拦截器中统一处理

1. 在失败的回调中拦截401错误

2. 清除掉过期的用户信息，再跳转到登录页。

src/utils/http.js

```js
// axios基础的封装
import axios from "axios"
import 'element-plus/theme-chalk/el-message.css'
import { ElMessage } from 'element-plus'
import { useUserStore } from "@/stores/user"
import router from "@/router"

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
  // 1.从pinia中获取token数据
  const userStore = useUserStore()
  const token = userStore.userInfo.token
  // 2.按照后端要求拼接token数据到请求头中
  if(token){
    config.headers.Authorization = `Bearer ${token}`
  }
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
}, e => {
  const userStore = useUserStore()
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  // 统一错误提示
  ElMessage({
    type:'warning',
    message:e.response.data.message
  })
  // 401 token失效处理
  if(e.response.status === 401){
    // 1. 清除本地用户信息
    userStore.clearUserInfo()
    // 2. 跳转到登录页
    router.push('/login')
  }
  return Promise.reject(e)
})

export default httpInstance
```

#### 18 购物车模块

购物车业务逻辑梳理拆解

购物车操作（加/删/单选/全选...）-> 是否登陆判断 
未登陆：本地购物车操作（所有操作不走接口直接操作Pinia中的本地购物车列表）

已登录：接口购物车操作（所有操作都走接口，操作完毕获取购物车列表更新本地购物车列表）

1. 整个购物车的实现分为两个大分支，本地购物车操作和接口购物车操作。
2. 由于购物车数据的特殊性，采用oinia管理购物车列表数据并添加持久化缓存。

#### 18.1 本地购物车 - 加入购物车实现

步骤：

封装cartStore(state + action) --> 组件点击了添加按钮 --> 判断是否选择了规格 --> 选择了 --> 调用action添加（传递商品参数）--> 添加过：原count+1
                                                                     --> 未选择 --> 提示用户选择规格             --> 未添加：直接push


src/views/Detail/index.vue

```js
<script setup>
import { useCartStore } from '@/stores/cart'

const cartStore = useCartStore()

// count:购物车商品数量
const count = ref(1)

// 修改数量的方法
const countChange = (count)=>{
  console.log(count)
}

// 添加购物车
const addCart = ()=>{
  if(skuObj.skuId){
    // 规格已全部选择 触发action
    cartStore.addCart({
      id:goods.value.id, // 商品ID
      name:goods.value.name, // 商品名称
      picture:goods.value.mainPictures[0], // 图片
      price:goods.value.price, // 最新价格
      count:count.value, // 商品数量
      skuId:skuObj.skuId, // skuId
      attrsText:skuObj.specsText, // 商品规格文本
      select:true // 商品是否选中
    })
  }else{
    // 规格未选择全 提示用户
    ElMessage.warning('请选择规格！')
  }
}
</script>

<template>
  // ...以上数据不变
  <!-- 数据组件 -->
  <el-input-number v-model="count" @change="countChange" :min="0" />
  // ...以下数据不变
</template>

```


src/stores/cart.js

```js
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
```

