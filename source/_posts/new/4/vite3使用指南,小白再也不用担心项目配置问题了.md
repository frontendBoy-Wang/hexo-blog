---
title: vite使用入门
categories:
- vite
cover: ../img/43.png
feature: false
date: 2023-4-13 10:46:35
tags: vite
---


为开发提供极速响应v4.1.0

目前Vite已经更新到v4.1.0的版本了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2ebd20490fd24e6e95619f21ff37d08f~tplv-k3u1fbpfcp-zoom-1.image)

# vite的特性

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53f8b854a4f04c9dab1c965c58b69eec~tplv-k3u1fbpfcp-zoom-1.image)

-   💡极速的服务启动，意思就是一个字**快**
-   **⚡️**轻量快速的热重载，就是说热更新也很快
-   🔧丰富的功能，支持的工具集比较多，开箱即用
-   📦优化的构建 对于生产环境的构建有更好的优化
-   🔩通用的插件，在开发和构建之间共享 Rollup-superset 插件接口。
-   完全类型化的API 使用TS，有较好的语法提示和类型支持

  


# 使用Vite创建项目

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/aff529e6bbef4e1ca0a449d31f141098~tplv-k3u1fbpfcp-zoom-1.image)

使用npm

```
npm create vite@latest
```

  


使用yarn

```
yarn create vite
```

  


使用pnpm

```
pnpm create vite
```

  


如果使用vite创建Vue项目的话，可以创建带模版的vue项目

```
# npm 6.x
npm create vite@latest my-vue-app --template vue

# npm 7+, extra double-dash is needed:
npm create vite@latest my-vue-app -- --template vue

# yarn
yarn create vite my-vue-app --template vue

# pnpm
pnpm create vite my-vue-app --template vue
```

查看 [create-vite](https://github.com/vitejs/vite/tree/main/packages/create-vite) 以获取每个模板的更多细节：vanilla，vanilla-ts, vue, vue-ts，react，react-ts，react-swc，react-swc-ts，preact，preact-ts，lit，lit-ts，svelte，svelte-ts。

  


# 区分开发环境，测试环境和生产环境

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/771bdfcbc78745e28a3c83cca630831f~tplv-k3u1fbpfcp-zoom-1.image)

首先在项目根目录下创建.env文件,Vite 使用 [dotenv](https://github.com/motdotla/dotenv) 从你的 [环境目录](https://cn.vitejs.dev/config/shared-options.html#envdir) 中的下列文件加载额外的环境变量

```
.env                # 所有情况下都会加载
.env.local          # 所有情况下都会加载，但会被 git 忽略
.env.[mode]         # 只在指定模式下加载
.env.[mode].local   # 只在指定模式下加载，但会被 git 忽略

.env.development		# 开发模式
.env.production			# 生产模式
.env.test						# 测试模式
```

  


*默认情况下*

-   *npm run dev 会加载 .env 和 .env.development 内的配置*
-   *npm run build 会加载 .env 和 .env.production 内的配置*
-   *mode 可以通过命令行 --mode 选项来重写。*

**

*在package.json文件中配置一个test命令*

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/686ea238e40f4f05a00a70e4d1dc1f24~tplv-k3u1fbpfcp-zoom-1.image)

**

**环境加载优先级**

一份用于指定模式的文件（例如 **.env.production**）会比通用形式的优先级更高（例如 **.env**）。

另外，Vite 执行时已经存在的环境变量有最高的优先级，不会被 **.env** 类文件覆盖。例如当运行 **VITE_SOME_KEY=123 vite build** 的时候。

**.env** 类文件会在 Vite 启动一开始时被加载，而改动会在重启服务器后生效

```
console.log('获取当前目录',process.cwd());
//参数：模式：development||production,入口文件，修改.env变量前缀
const env=loadEnv('development',process.cwd(),'wmq')
console.log(env);
```

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4d4b42ddb1b24d0dbf23a47df97fa859~tplv-k3u1fbpfcp-zoom-1.image)

加载的环境变量也会通过 import.meta.env 以字符串形式暴露给客户端源码。

为了防止意外地将一些环境变量泄漏到客户端，只有以 VITE_ 为前缀的变量才会暴露给经过 vite 处理的代码

所以这里如果没配置前缀的话，import.meta.env 就访问不到了

```
VITE_BASE_API=base/api	这个可以被访问到
wmq_client='aa🤔'。访问不了
```

  

使用envPrefix方法可以更换环境变量的前缀

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3f1511c1dcaf42909f003ae58535930b~tplv-k3u1fbpfcp-zoom-1.image)

然后在main.js文件中去打印import.mate.env的环境变量，在不同的开发模式下就可以获取到相应的环境变量了

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/027199697ba747229b327d4859712b2a~tplv-k3u1fbpfcp-zoom-1.image)

  


开发模式下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/59225f2d674e4993b6ab007b94096fcd~tplv-k3u1fbpfcp-zoom-1.image)

生产模式下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/041a3ec183f145a69fc6ec89e94178f3~tplv-k3u1fbpfcp-zoom-1.image)

测试模式下

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9ccc060299a7471492472867d289e2ba~tplv-k3u1fbpfcp-zoom-1.image)

  


通过验证我们可以看出，不管是什么模式下，都可以加载到.env文件中的变量

  


**更改.env的默认地址**

我们现在的.env文件都是建立在根目录的，如果.env.XX的文件太多，会显得我们的项目目录很乱，我们能将.env放在一个统一的文件夹内吗？

可以通过**envDir**配置来改变！参考：[共享配置 | Vite 官方中文文档](https://link.juejin.cn/?target=https%3A%2F%2Fvitejs.cn%2Fvite3-cn%2Fconfig%2Fshared-options.html%23envdir)

envDir用于加载 .env 文件的目录。可以是一个绝对路径，也可以是相对于项目根的路径。

-   **类型：** string
-   **默认：** root

比如，我们在vite.config.js中这样配置

```
import { defineConfig } from "vite";
export default defineConfig( {
  envDir:"env"
});
```

  


然后，所有的.env.xxx文件就可以放在项目根目录的**env**文件夹下了。

  





# 配置服务端选项

```
export default defineConfig({
  server: {
    host: 'localhost',//  开放服务器启动的地址，默认时localhost
    port: 9000,//项目启动端口
    open: true,//项目启动时是否打开浏览器
    base:'/',//用于代理 Vite 作为子文件夹时使用。
    cors: true,//为开发服务器配置 CORS。默认启用并允许任何源，传递一个 选项对象 来调整行为或设为 false 表示禁用。
    headers:{},//指定服务端响应的headers信息
    strictPort:true,//设为 true 时若端口已被占用则会直接退出，而不是尝试下一个可用端口。
    proxy: {//配置后端代理
      // 字符串简写写法
      '/foo': 'http://localhost:4567',
      // 选项写法
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',//指向后端地址
        changeOrigin: true,//允许跨域
        rewrite: (path) => path.replace(/^/api/, '')
      },
      // 正则表达式写法
      '^/fallback/.*': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^/fallback/, '')
      },
      // 使用 proxy 实例
      '/api': {
        target: 'http://jsonplaceholder.typicode.com',
        changeOrigin: true,
        configure: (proxy, options) => {
          // proxy 是 'http-proxy' 的实例
        }
      },
      // Proxying websockets or socket.io
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true
      }
    }，
  }
})
```

### server

其中server是比较常用的重要属性，特别是proxy主要是配置代理后端API地址的

-   target
-   changeOrigin
-   rewrite

服务端的选项常用的大概就这些了，期中最常用的就是解决开发过程中的跨域问题了，需要在proxy里面去设置即可，其他的不常用的选项如有用到去查vite官网的`服务器选项`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0df5efd1a6b74dcf99b04cd831dff814~tplv-k3u1fbpfcp-zoom-1.image)

  





# 配置CSS

```js
export default defineConfig({
  //css配置
  css: {
    // 开发模式为true，生产模式为flase, devSourcemap:true,//源代码映射
    devSourcemap:command === 'serve',
    // css模块化配置项
    modules:{
      // 是否开启模块化。模块化or全局化
      scopeBehaviour: 'global' | 'local',
      // css模块化的路径
      globalModulePaths: RegExp[],
      // 更改生成的哈希名称，一个字符串模板或者通过函数返回
      generateScopedName: string| ((name, filename, css) => string),
      // 生成hash名称的前缀
      hashPrefix: string,
      // 修改生成的配置对象的key的展示形式(驼峰还是中划线形式)
      localsConvention:'camelCase'
        | 'camelCaseOnly'
        | 'dashes'
        | 'dashesOnly'
        | null
    },
    // 预处理器配置项
    preprocessorOptions: {
      less: {
        math: "always",
      },
      scss: {
        additionalData: '@import "src/assets/styles/var.scss";'
      }
    },
    
    postcss:{
      // 一些配置
    }

  }
})
```

css的配置主要是一些css的模块化和预处理器的配置。比如scss，less，postcss等等

### 模块化属性

-   scopeBehaviour：是否开启模块化，global为全局化，local为模块化
-   globalModulePaths：css模块化的路径
-   generateScopedName：生成的哈希名称，一个字符串模板或者通过函数返回
-   hashPrefix：生成hash名称的前缀
-   localsConvention：生成的配置对象的key的展示形式(驼峰还是中划线形式)

  


其他的less，scss，postcss属性使用的时候查询官方文档即可

  





# 其他的一些常用小配置

  


![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/251a4ed36bbb4bd39cc4bd8b69e02644~tplv-k3u1fbpfcp-zoom-1.image)

### 配置别名

```
export default defineConfig({
  resolve:{
        alias:{
            '@': resolve(__dirname, 'src')//配置别名
        }
    }
})
```

  


### 打包速度的问题

vite在打包中会计算包的大小，但是只是计算不做处理，会长打包时间，所以可以在build中再添加一个配置项关闭打包计算。

启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。

```
brotliSize: false,//vite2
reportCompressedSize:false //vite3
```

  


### gizp压缩

```
plugins: [vue(),
      viteCompression({
        //生成压缩包gz
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: 'gzip',
        ext: '.gz',
    }),],
```

  


我把打包后的项目用express稍微搭了个后台跑了一下，发现express开启了gzip和没开启gzip，都是一样的。不知道vite是不是默认启动gzip压缩？有了解的小伙伴也可以说一下。

  


### 生产环境移除console

```
build:{
  ...
  terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true
      }
  }
}
```

  





以上就是vite的一些常用的项目配置了，基本上绝大多数都是在项目中需要经常使用的，而且随着前端技术的不断发展，构建工具也是在不停的更新迭代，作为技术人员也得紧跟技术潮流，也许你现在的项目用的不是vite，但是你不能说你不会，所谓技多不压身嘛，小伙伴们赶紧学起来吧！🚀

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e67d78b9370547fc93f12920321e1cdf~tplv-k3u1fbpfcp-zoom-1.image)