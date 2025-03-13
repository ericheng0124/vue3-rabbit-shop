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