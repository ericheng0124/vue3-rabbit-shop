# 小兔鲜商场项目

### 1.项目初始化

```
npm init vue@latest
```

项目名称：vue-rabbit
确认安装 router，pinia，eslint 检查

待 vite 安装完成之后，使用代码工具软件打开项目目录

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

配置 git

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

#### 2.2 添加 json 格式的配置项

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

如果使用的是最新的 vite 创建的项目，则可以忽略，vite 最新版的已经帮我们创建了，可以在 vite.config.js 下的 jsconfig.json 中查看配置详情

改配置项只做联想路径提示，实际做路径转换的位置是 vite.config.js 中。

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

### 3.引入 ElementPlus

#### 3.1 安装 ElementPlus

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

安装完毕之后，需要对 vite.config.js 进行配置插件

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

**_这里注意配置完之后需要重新启动一下项目，确保配置生效_**

#### 3.3 ElementPlus 主题定制

`如何项目的主题色与ElementPlus主题色存在冲突，可以通过定制主题让ElementPlus的主题色和项目保持一致。`

##### 3.3.1 安装 sass

```
npm i sass -D
```

##### 3.3.2 设置定制化的样式文件

在 src/style/index.scss，内编辑项目的样式。
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

这里自动导入需要深入到 ElementPlus 的组件中，按照官方配置文档来。 1. 配置 ElementPlus 采用 sass 样式配色系统 2. 自动导入定制化样式文件进行样式覆盖

对 vite.config.js 文件进行配置修改如下：

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

### 4. axios 基础配置

#### 4.1 安装 axios

```
npm install axios
```

#### 4.2 配置 axios 的基础封装

在`src/utils/`路径下创建 http.js 文件

1. 引入 axios
2. 创建 axios 实例对象：添加项目基础地址和超时时间
3. 配置请求拦截器和响应拦截器
4. 导出创建的 axios 实例对象

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

### 5. 解决 eslint 命名规则错误提示

在 eslint.config.js 文件中添加修改命名规则检测

```
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

```
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

```
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

```
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

```
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

```
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

```
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
src/Layout/components/layoutNav.vue
```
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

src/Layout/components/layoutHeader.vue
```
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

src/Layout/components/layoutFooter.vue
```
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
```
<script setup>
import layoutNav from './components/layoutNav.vue'
import layoutHeader from './components/layoutHeader.vue'
import layoutFooter from './components/layoutFooter.vue'

</script>

<template>
  <div>
    <layout-nav />
    <layout-header />
    <!-- 二级路由出口 -->
    <router-view></router-view>
    <layout-footer />
  </div>
</template>
```