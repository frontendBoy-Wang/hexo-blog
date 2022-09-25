
title: 一个基于vite构建的vue3开箱即用的项目模版
categories:
  - vue
cover: ../img/5.png
feature: true
date: 2022-09-25 17:30:02
tags: vue3 
---

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d065e998673420ba80c983558519f19~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp?)
# 前言
> vue3如今已经成为默认版本了，相信大多数公司已经全面拥抱vue3了。
> 而Vite作为新一代的新型前端构建工具，使用它能够显著提升前端开发体验。


# 什么是Vite
这里借用官方的介绍：
> - 一个开发服务器，它基于 [原生 ES 模块](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules) 提供了 [丰富的内建功能](https://cn.vitejs.dev/guide/features.html)，如速度快到惊人的 [模块热更新（HMR）](https://cn.vitejs.dev/guide/features.html#hot-module-replacement)。
> - 一套构建指令，它使用 [Rollup](https://rollupjs.org/) 打包你的代码，并且它是预配置的，可输出用于生产环境的高度优化过的静态资源。


# Vite的优势

- 开箱即用
- 具备插件API和JS API 
- 高度的可扩展性
- 热更新
- 高效，快速

## 搭建第一个 Vite 项目
> **兼容性注意**
> Vite 需要 [Node.js](https://nodejs.org/en/) 版本 >= 12.0.0。然而，有些模板需要依赖更高的 Node 版本才能正常运行，当你的包管理器发出警告时，请注意升级你的 Node 版本。

**NPM:**
---
```js
npm create vite@latest
npm create @vitejs/app 
npm init vite@latest
npm init @vitejs/app 
```
---
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1645973789497-773229b1-cb17-4c42-b75f-4692517b8a22.png#clientId=u73ff4d65-cacd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=132&id=ub650f221&margin=%5Bobject%20Object%5D&name=image.png&originHeight=264&originWidth=819&originalType=binary&ratio=1&rotation=0&showTitle=false&size=20310&status=done&style=none&taskId=u4086988a-865b-4c80-aaf3-6172703862e&title=&width=409.5)
**Yarn:**
---
```js
 yarn create vite
```
---
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1645974001883-b0e25194-1830-4fb1-8c3c-d20740e518d5.png#clientId=u73ff4d65-cacd-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=321&id=u6448ce59&margin=%5Bobject%20Object%5D&name=image.png&originHeight=641&originWidth=780&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68214&status=done&style=none&taskId=u3b12e236-1096-4c78-b6c8-78cf29a6706&title=&width=390)

创建Vite项目的命令有很多，大同小异，但是我推荐使用 yarn的方式，谁用谁知道，命令简洁，速度更快，当然也有其它的方式，可以看一下官网的推荐方式，这个选择自己喜欢的就好了

---
```js
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app -- --template vue
```
---
初始化好之后的目录：
---
```js
│  ├─public # 静态资源目录
│  │      favicon.ico 
│  │
│  ├─src
│  │  │  App.vue # 入口vue文件
│  │  │  main.ts # 入口文件
│  │  ├─assets # 资源文件目录
│  │  │      logo.png
│  │  │
│  │  └─components # 组件文件目录
│  │         HelloWorld.vue
│  │
│  │ .gitignore
│  │ index.html # Vite项目的入口文件 
│  │ package.json
│  │ README.md
│  │ tsconfig.json # tsconfig配置文件
│  │ vite.config.ts # vite配置文件

```
---
执行：`npm i`或者`yarn`安装依赖，再执行 `npm run dev` 或者 `yarn dev` 打开浏览器输入[http://localhost:3000](http://localhost:3000/)
即可看到
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1645979209791-12e57ad1-b262-4e19-924b-db63b331df18.png#clientId=u73ff4d65-cacd-4&crop=0&crop=0&crop=1&crop=0.8586&from=paste&height=457&id=u7c0ed23d&margin=%5Bobject%20Object%5D&name=image.png&originHeight=913&originWidth=1915&originalType=binary&ratio=1&rotation=0&showTitle=false&size=68728&status=done&style=none&taskId=u0fc99f69-12fb-4384-83ed-6d9eb1da740&title=&width=958)
 这样一个vue3+vite+ts的项目初始化就完成了

运行项目不会默认打开浏览器,需要在package.json里面 ,在vite 后面加上--open
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646040236001-262ea4fb-6ea8-4e62-93be-e690938e1a55.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=89&id=u80797ce2&margin=%5Bobject%20Object%5D&name=image.png&originHeight=177&originWidth=607&originalType=binary&ratio=1&rotation=0&showTitle=false&size=16157&status=done&style=none&taskId=u9f4e2c47-a275-4542-af85-8f4b16a4fe9&title=&width=303.5)

# 安装vue全家桶
## Pinia状态管理
![](https://cdn.nlark.com/yuque/0/2022/svg/1388480/1646050603266-aafbfd7c-c86f-48ab-92fd-3433c89c2fe3.svg#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=197&id=u0a9c7e90&margin=%5Bobject%20Object%5D&originHeight=477&originWidth=319&originalType=url&ratio=1&rotation=0&showTitle=false&status=done&style=none&taskId=u525f19be-1792-4781-8816-cedaeeaa2c6&title=&width=132)
> 由于 vuex 4 对 typescript 的支持让人感到难过，所以状态管理弃用了 vuex 而采取了 pinia. pinia 的作者是 Vue 核心团队成员
> 尤大好像说 pinia 可能会代替 vuex，所以请放心使用。


Pinia 与 Vuex 的区别：

- id 是必要的，它将所使用 store 连接到 devtools。
- 创建方式：new Vuex.Store(...)(vuex3)，createStore(...)(vuex4)。
- 对比于 vuex3 ，state 现在是一个函数返回对象。
- 没有 mutations，不用担心，state 的变化依然记录在 devtools 中。

安装 pinia
---
```js
yarn add pinia
# or with npm
npm install pinia
```
---
main.ts
---
```js
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'

const app = createApp(App)
app.use(createPinia())
createApp(App).mount('#app')

```
---
新建store文件夹，新建index.ts
---
```js
import {defineStore} from 'pinia'

export const useStore = defineStore('storeId', {
    state: () => {
        return {
            counter: 0,
            name: 'Eduardo',
            isAdmin: true,
        }
    },
})

```
---
组件内使用
---
```js
<script setup lang="ts">
import HelloWorld from './components/Hello'
import {useStore} from "@/store/store";
import {index} from "@/types";

const store:index = useStore()
console.log(useStore().$state)


</script>

<template>
  <div>{{ store.name }}</div>
  <HelloWorld/>
</template>

```
---
### getters 用法介绍
Pinia 中的 getter 与 Vuex 中的 getter 、组件中的计算属性具有相同的功能
### ![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646050841734-28d52b34-fedc-4dcc-a20e-456393feb031.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=407&id=u144d3c28&margin=%5Bobject%20Object%5D&name=image.png&originHeight=724&originWidth=663&originalType=binary&ratio=1&rotation=0&showTitle=false&size=66692&status=done&style=none&taskId=u7f7dd504-dfd2-40f2-bd64-b1a075ca404&title=&width=372.5)![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646051046103-77fccc59-23d8-4ec6-b165-b466aff2e155.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=409&id=u64e83288&margin=%5Bobject%20Object%5D&name=image.png&originHeight=818&originWidth=1029&originalType=binary&ratio=1&rotation=0&showTitle=false&size=103832&status=done&style=none&taskId=u872aa329-65fe-4267-9eaa-ab142be8ea8&title=&width=514.5)
### actions
> 这里与 Vuex 有极大的不同，Pinia 仅提供了一种方法来定义如何更改状态的规则，放弃 mutations 只依靠 Actions，这是一项重大的改变。

Pinia 让 Actions 更加的灵活：

- 可以通过组件或其他 action 调用
- 可以从其他 store 的 action 中调用
- 直接在 store 实例上调用
- 支持同步或异步
- 有任意数量的参数
- 可以包含有关如何更改状态的逻辑（也就是 vuex 的 mutations 的作用）
- 可以 $patch 方法直接更改状态属性

## VueRouter
yarn add vue-router@4
在 src 文件下新增 router 文件夹 => router.ts 文件,内容如下:
---
```js
import {createRouter, createWebHistory, RouteRecordRaw} from 'vue-router'

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'Login',
        component: () => import('@/pages/login/Login.vue'), // 注意这里要带上 文件后缀.vue
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router

```
---
修改入口文件 mian.ts :
---
```js
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from "@/router/router";

const app = createApp(App)
app.use(createPinia()).use(router)

app.mount('#app')

```
---

到这里路由的基础配置已经完成了,更多配置信息可以查看 vue-router 官方文档:

> vue-router: [https://next.router.vuejs.org/zh/guide/](https://next.router.vuejs.org/zh/guide/)
vue-router4.x 支持 typescript，配置路由的类型是 RouteRecordRaw，这里 meta 可以让我们有更多的发挥空间，这里提供一些参考

- title:string; 页面标题，通常必选。
- icon?:string; 图标，一般配合菜单使用。
- auth?:boolean; 是否需要登录权限。
- ignoreAuth?:boolean; 是否忽略权限。
- roles?:RoleEnum[]; 可以访问的角色
- keepAlive?:boolean; 是否开启页面缓存
- hideMenu?:boolean; 有些路由我们并不想在菜单中显示，比如某些编辑页面。
- order?:number; 菜单排序。
- frameUrl?:string; 嵌套外链。

## Element-ui plus
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646050580381-c70514d1-86a7-4ecc-96b4-af829dddc653.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&id=u32206047&margin=%5Bobject%20Object%5D&name=image.png&originHeight=1653&originWidth=2778&originalType=url&ratio=1&rotation=0&showTitle=false&size=245417&status=done&style=none&taskId=u2820df2f-cc32-4109-a4e3-41f0773ee0f&title=)
> Element Plus 目前还处于快速开发迭代中。目前使用2.0.1版可以结合vite-plugin-style-import插件按需加载样式。 unplugin-vue-components 按需自动导入组件 使用 Element Plus组件时可以直接使用

---
```js
# 选择一个你喜欢的包管理器

# NPM
$ npm install element-plus --save

# Yarn
$ yarn add element-plus

# pnpm
$ pnpm install element-plus

```
---
main.ts
---
```js
import {createApp} from 'vue'
import App from './App.vue'
import {createPinia} from 'pinia'
import router from './router/router'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'

const app = createApp(App)
app
    .use(createPinia())
    .use(router)
    .use(ElementPlus, {size: 'small', zIndex: 3000})

app.mount('#app')

```
---


## Axios封装
---
```js
# 安装 axios 
yarn add axios 
# 安装 nprogress 用于请求 loading 
# 也可以根据项目需求自定义其它 loading yarn add nprogress 
# 类型声明，或者添加一个包含 `declare module 'nprogress' yarn add @types/nprogress --dev
```
---
实际使用中可以根据项目修改，比如RESTful api中可以自行添加put和delete请求,ResType也可以根据后端的通用返回值动态的去修改
新增 http文件夹，http下新增 Http.ts 文件以及 api 文件夹:
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646042475231-d6b41308-93b2-4120-ac3c-a2af72508a01.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=446&id=u6030d0f4&margin=%5Bobject%20Object%5D&name=image.png&originHeight=891&originWidth=283&originalType=binary&ratio=1&rotation=0&showTitle=false&size=43763&status=done&style=none&taskId=u075e99cb-7732-48ab-b0c2-60c9e95db85&title=&width=141.5)

http.ts
---
```js
import axios, {AxiosError, AxiosRequestConfig, AxiosResponse} from "axios";
import NProgress from 'nprogress'
import {Message} from '@element-plus/icons-vue'

interface ResType<T> {
    code: number
    data?: T
    msg: string
    err?: string
}

interface Http {
    get<T>(url: string, params?: unknown): Promise<ResType<T>>

    post<T>(url: string, params?: unknown): Promise<ResType<T>>

    upload<T>(url: string, params: unknown): Promise<ResType<T>>

    download(url: string): void
}

// 设置请求头和请求路径
axios.defaults.baseURL = '/api'
axios.defaults.timeout = 10000
axios.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

//请求拦截器
axios.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = window.sessionStorage.getItem('token')
        if (token) {
            // @ts-ignore
            config.headers.token = token
        }
        return config
    },
    (error: Error) => {
        return error
    }
)
// 响应拦截
axios.interceptors.response.use(
    (res: AxiosResponse) => {
        //发请求前做的一些处理，数据转化，配置请求头，设置token,设置loading等，根据需求去添加
        switch (res.data.code) {
            case 111:
                sessionStorage.setItem('token', '');
                return res
            case 200:
                return JSON.stringify(res.data)
            default :
                return
        }
    },
    (error: AxiosError) => {
        // 接收到异常响应的处理开始
        if (error && error.response) {
            // 1.公共错误处理
            // 2.根据响应码具体处理
            switch (error.response.status) {
                case 400:
                    error.message = '错误请求'
                    break;
                case 401:
                    error.message = '未授权，请重新登录'
                    break;
                case 403:
                    error.message = '拒绝访问'
                    break;
                case 404:
                    error.message = '请求错误,未找到该资源'
                    window.location.href = "/NotFound"
                    break;
                case 405:
                    error.message = '请求方法未允许'
                    break;
                case 408:
                    error.message = '请求超时'
                    break;
                case 500:
                    error.message = '服务器端出错'
                    break;
                case 501:
                    error.message = '网络未实现'
                    break;
                case 502:
                    error.message = '网络错误'
                    break;
                case 503:
                    error.message = '服务不可用'
                    break;
                case 504:
                    error.message = '网络超时'
                    break;
                case 505:
                    error.message = 'http版本不支持该请求'
                    break;
                default:
                    error.message = `连接错误${error.response.status}`
            }
        } else {
            // 超时处理
            if (JSON.stringify(error).includes('timeout')) {
                Message.error('服务器响应超时，请刷新当前页')
            }
            Message.error('连接服务器失败')
        }
        Message.error(error.message)
        //处理结束
        //如果不需要错误处理，以上的处理过程都可省略
        return Promise.resolve(error.response)
    }
)

const Http: Http = {
    get(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .get(url, {params})
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    post(url, params) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, JSON.stringify(params))
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    upload(url, file) {
        return new Promise((resolve, reject) => {
            NProgress.start()
            axios
                .post(url, file, {
                    headers: {'Content-Type': 'multipart/form-data'},
                })
                .then((res) => {
                    NProgress.done()
                    resolve(res.data)
                })
                .catch((err) => {
                    NProgress.done()
                    reject(err.data)
                })
        })
    },
    download(url) {
        const iframe = document.createElement('iframe')
        iframe.style.display = 'none'
        iframe.src = url
        iframe.onload = function () {
            document.body.removeChild(iframe)
        }
        document.body.appendChild(iframe)
    },
}

export default Http;

```
---
在http文件夹下创建api文件夹用于统一存放接口文件,统一管理api
http/api/login.ts
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646042618894-db465848-f667-4b9b-9d0a-671d55dc72e5.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=136&id=u42af14b5&margin=%5Bobject%20Object%5D&name=image.png&originHeight=272&originWidth=1295&originalType=binary&ratio=1&rotation=0&showTitle=false&size=38293&status=done&style=none&taskId=u9c51786f-64ad-49ba-9902-c4052d25094&title=&width=647.5)
---
```js
import http from "@/http/Http";

export async function login(data: { userName: string, password: string }) {
    return http.post(`/login`, data)
}

```
---
至此,一个简单地请求封装完成了!!!!
除了自己手动封装 axios ,这里还推荐一个 vue3 的请求库: VueRequest,非常好用,下面来看看 VueRequest有哪些比较好用的功能吧!!!

- 所有数据都具有响应式
- 轮询请求
- 自动处理错误重试
- 内置请求缓存
- 节流请求与防抖请求
- 聚焦页面时自动重新请求
- ⚙️ 强大的分页扩展以及加载更多扩展
- 完全使用 Typescript 编写，具有强大的类型提示
- ⚡️ 兼容 Vite
- 轻量化
- 开箱即用

![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646042727022-50d66f40-a66f-4523-9569-50309e136229.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=454&id=u29a69e50&margin=%5Bobject%20Object%5D&name=image.png&originHeight=908&originWidth=1920&originalType=binary&ratio=1&rotation=0&showTitle=false&size=152360&status=done&style=none&taskId=u13a5aeb1-c7b1-4b90-a601-e1c728f55ba&title=&width=960)

## tsx支持
首先需要安装官方维护的vite插件@vitejs/plugin-vue-jsx,这个插件其实核心还是@vue/babel-plugin-jsx,只是在这个插件上封装了一层供vite插件调用。所以关于vue的jsx语法规范可以直接参看@vue/babel-plugin-jsx,文档链接如下，建议大家可以先读一遍语法规范。官方写得比较详细，后续我也会结合实际讲解一下大部分规范的用法，[vue jsx语法规范](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fvuejs%2Fjsx-next)。
---
```js
$ npm install @vitejs/plugin-vue-jsx -D
# or 
$ yarn add @vitejs/plugin-vue-jsx -D 
```
---
安装完之后在vite.config.ts进行插件使用，代码如下：
---
```js
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueJsx from "@vitejs/plugin-vue-jsx";

export default defineConfig({
  plugins: [
    vue(),
    vueJsx() //插件使用
  ],
});

```
---


## 环境变量配置
> vite 提供了两种模式：具有开发服务器的开发模式（development）和生产模式（production）

项目根目录新建:	.env.development 
`NODE_ENV=development VITE_APP_WEB_URL= 'YOUR WEB URL'`

项目根目录新建:	.env.production 
`NODE_ENV=production VITE_APP_WEB_URL= 'YOUR WEB URL'`

组件中使用：
`console.log(**import**.meta.env.VITE_APP_WEB_URL) `

配置 package.json:
打包区分开发环境和生产环境
> "build:dev": "vite build --mode development",
>  "build:pro": "vite build --mode production",



# Vite 常用基础配置
### 基础配置
运行 代理 和 打包 配置
---
```js
//配置代理
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        https: false,
        proxy: {}
    },
      
      // 生产环境打包配置
    //去除 console debugger
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
```
---
### 生产环境生成 .gz 文件
开启 gzip 可以极大的压缩静态资源，对页面加载的速度起到了显著的作用。

使用 vite-plugin-compression 可以 gzip 或 brotli 的方式来压缩资源，这一步需要服务器端的配合，vite 只能帮你打包出 .gz 文件。此插件使用简单，你甚至无需配置参数，引入即可。
`_# 安装_ yarn add --dev vite-plugin-compression`
plugins 中添加：
---
```js
 import viteCompression from 'vite-plugin-compression'

//配置插件
    plugins: [
        vue(),
        vueJsx(),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
    ],
```
---
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646051294864-83f53139-9d0a-4e60-a08f-a854c1c88626.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=412&id=u0bb66cc7&margin=%5Bobject%20Object%5D&name=image.png&originHeight=824&originWidth=698&originalType=binary&ratio=1&rotation=0&showTitle=false&size=77330&status=done&style=none&taskId=u76ba16c5-330f-4e9a-9e62-ca956d2b767&title=&width=349)
### 最终 vite.config.ts

---
```js
import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import * as path from "path"
import viteCompression from 'vite-plugin-compression'

export default defineConfig({
    base: './', //打包路径

    //配置插件
    plugins: [
        vue(),
        vueJsx(),
        viteCompression({
            verbose: true,
            disable: false,
            threshold: 10240,
            algorithm: 'gzip',
            ext: '.gz',
        }),
    ],
    //配置路径别名
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'src'),
        },
    },
    //配置代理
    server: {
        host: '0.0.0.0',
        port: 3000,
        open: true,
        https: false,
        proxy: {}
    },

    // 生产环境打包配置
    //去除 console debugger
    build: {
        terserOptions: {
            compress: {
                drop_console: true,
                drop_debugger: true,
            },
        },
    },
})

```
---
## 常用插件
可以查看官方文档：[https://vitejs.cn/plugins/](https://vitejs.cn/plugins/)

- @vitejs/plugin-vue 提供 Vue 3 单文件组件支持
- @vitejs/plugin-vue-jsx 提供 Vue 3 JSX 支持（通过 专用的 Babel 转换插件）
- @vitejs/plugin-legacy 为打包后的文件提供传统浏览器兼容性支持
- unplugin-vue-components 组件的按需自动导入
- vite-plugin-compression 使用 gzip 或者 brotli 来压缩资源
- .....
## 非常推荐使用的 hooks 库
因为vue3.x和react hooks真的很像，所以就称为 hooks

VueUse：[https://vueuse.org/](https://vueuse.org/)
![image.png](https://cdn.nlark.com/yuque/0/2022/png/1388480/1646051414863-e271e0d8-d5af-432f-8d3f-2956456f40f0.png#clientId=ub507500d-5f2d-4&crop=0&crop=0&crop=1&crop=1&from=paste&height=418&id=u646eb3b6&margin=%5Bobject%20Object%5D&name=image.png&originHeight=835&originWidth=1919&originalType=binary&ratio=1&rotation=0&showTitle=false&size=79711&status=done&style=none&taskId=ua6e38fde-a0ec-41ad-b407-33bc336241b&title=&width=959.5)
看到这个库的第一眼，让我立马想到了 react 的 ahooks
VueUse 是一个基于 Composition API 的实用函数集合。通俗的来说，这就是一个工具函数包，它可以帮助你快速实现一些常见的功能，免得你自己去写，解决重复的工作内容。以及进行了基于 Composition API 的封装。让你在 vue3 中更加得心应手。
想要入手 vue3 的小伙伴，赶快学习起来吧！！！
最后给大家奉上仓库地址吧：[https://gitee.com/frontendBoy_wang/vite-vue3-ts-pinia-element_plus-template.git](https://gitee.com/frontendBoy_wang/vite-vue3-ts-pinia-element_plus-template.git)
## 写在最后
> 公众号：前端少年汪
> 专注分享 web 前端相关技术文章、视频教程资源、热点资讯等，如果喜欢我的分享，给 点一个赞 或者 ➕关注 都是对我最大的支持。


