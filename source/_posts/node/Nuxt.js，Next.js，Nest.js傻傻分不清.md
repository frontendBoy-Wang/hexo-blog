---
title: Nuxt.js，Next.js，Nest.js傻傻分不清？
categories:
   - node
cover: ../img/32.png
feature: true
date: 2023-2-2 10:46:35
tags: Nuxt.js Next.js Nest.js
---

# 三者区别
Nuxt.js和Next.js都是服务端渲染框架(SSR)，属于前端框架,Nest.js则是node框架,属于后端框架。

虽然名字看起来都很像但是确实不一样的框架。
其中Nuxt.js是vue的ssr框架，Next.js是react的ssr框架

都是比vue和react更上层的前端框架

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0598251d1ef424c9e2e6875f5a662bc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=330&h=176&s=14276&e=png&a=1&b=02041f" alt="image.png"  width="50%"width="50%"/></p>
<p align=center> </p>

<p align=center>       </p>
<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c14a65ff9b0144398f336b3bd905bc0b~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=466&h=178&s=14619&e=png&a=1&b=000000" alt="image.png"  width="50%"width="50%"/></p>


<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/081f4ffb301a4a948e73605b4d1f8518~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=966&s=71455&e=png&a=1&b=e0234f" alt="image.png"  width="30%"/></p>

​     

## SSR框架
先搞清楚什么是服务端渲染

服务端渲染（Server-Side Rendering，简称 SSR）是一种将网页内容在服务器端动态生成并发送给客户端的技术。传统的客户端渲染（Client-Side Rendering，简称 CSR）是在客户端浏览器中使用 JavaScript 动态生成页面内容。

在传统的客户端渲染中，浏览器首先下载一个空的 HTML 页面，然后通过 JavaScript 请求数据并生成页面内容。这种方式的优点是可以提供更丰富的交互和动态效果，但也存在一些缺点。例如，搜索引擎爬虫可能无法正确解析和索引页面内容，导致 SEO（搜索引擎优化）问题。同时，初始加载时用户可能会看到空白的页面或者出现闪烁的内容。

相比之下，服务端渲染通过在服务器上预先生成完整的 HTML 页面，将其发送给客户端浏览器。这样，浏览器在接收到页面时就能够立即显示完整的内容，而不需要等待 JavaScript 的下载和执行。这样可以提高页面的加载速度和首次渲染速度，并且对于搜索引擎爬虫来说更容易解析和索引页面内容，有利于 SEO。

服务端渲染的实现方式通常涉及使用服务器端框架（如Node.js、Java、Python等）来处理请求，并在服务器上生成完整的 HTML 页面。服务器端框架可以使用模板引擎或者直接在后端代码中生成 HTML。一旦生成完整的 HTML 页面，服务器将其发送给客户端浏览器，浏览器接收到后即可直接显示页面内容。

需要注意的是，服务端渲染不是完全取代客户端渲染，而是根据需求和场景选择合适的渲染方式。一些页面或组件可能更适合使用客户端渲染，以提供更好的交互和动态效果。而对于需要更好的首次加载速度和 SEO 的页面，服务端渲染则是一个有价值的选择。


### Nuxt
#### Nuxt是什么
> Nuxt is an [open source framework ](https://github.com/nuxt/nuxt)that makes web development intuitive and powerful.  Create performant and production-grade full-stack web apps and websites with confidence.   

>Nuxt是一个开源框架，它使Web开发变得直观和强大。
>自信地创建高性能和生产级全栈Web应用程序和网站。

#### 使用Nuxt的条件

-   **Node.js** - [`v16.10.0`](https://nodejs.org/en) 或更高版本
-   **文本编辑器** - 我们推荐使用 [Visual Studio Code](https://code.visualstudio.com/) 并安装 [Volar 扩展](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
-   **终端** - 用于运行 Nuxt 命令
#### 创建项目并且运行

```sh
npx nuxi@latest init <project-name>

cd project-name

npm i

npm run dev

```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f732c94681ca4d059513aa5180db03b9~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=331127&e=png&a=1&b=f3f4f6)

这就创建项目之后的初始化页面了。

下面我们就来看看nuxt的特性和原理

nuxt基本上是由vue2，webpack，babel这三个构成的

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f5d042f4ce0045699a6eb0b4d702c8a6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1000&h=212&s=79887&e=png&b=ffffff)

Nuxt.js 集成了以下组件/框架，用于开发完整而强大的 Web 应用：

-   [Vue 2](https://github.com/vuejs/vue)
-   [Vue-Router](https://github.com/vuejs/vue-router)
-   [Vuex](https://github.com/vuejs/vuex) (当配置了 [Vuex 状态树配置项](https://www.nuxtjs.cn/guide/vuex-store) 时才会引入)
-   [Vue 服务器端渲染](https://ssr.vuejs.org/en/) (排除使用 [`mode: 'spa'`](https://www.nuxtjs.cn/api/configuration-mode))
-   [Vue-Meta](https://github.com/nuxt/vue-meta)

压缩并 gzip 后，总代码大小为：**57kb** （如果使用了 Vuex 特性的话为 60kb）。

另外，Nuxt.js 使用 [Webpack](https://github.com/webpack/webpack) 和 [vue-loader](https://github.com/vuejs/vue-loader) 、 [babel-loader](https://github.com/babel/babel-loader) 来处理代码的自动化构建工作（如打包、代码分层、压缩等等）。

#### 特性
-   基于 Vue.js
-   自动代码分层
-   服务端渲染
-   强大的路由功能，支持异步数据
-   静态文件服务
-   ES2015+ 语法支持
-   打包和压缩 JS 和 CSS
-   HTML 头部标签管理
-   本地开发支持热加载
-   集成 ESLint
-   支持各种样式预处理器： SASS、LESS、 Stylus 等等
-   支持 HTTP/2 推送
#### 工作流程
下图阐述了 Nuxt.js 应用一个完整的服务器请求到渲染（或用户通过 `<nuxt-link>` 切换路由渲染页面）的流程

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2bcfa3d69acd4121852b333f7d05e3cc~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=460&h=600&s=51821&e=png&a=1&b=038796)

#### 服务端渲染(通过 SSR)

可以使用**Nuxt.js**作为框架来处理项目的所有 UI 呈现。

启动时`nuxt`，它将启动具有热更新加载的开发服务器，并且[Vue 服务器端渲染](https://ssr.vuejs.org/en/)配置为自动为服务器呈现应用程序。

#### 目录结构     
- ├── README.md                
- ├── components
- ├── dist
- ├── jest.config.js
- ├── node_modules
- ├── nuxt.config.js
- ├── package.json
- ├── pages
- ├── plugins
- ├── static
- ├── store
- ├── test
- ├── tree.txt
- └── yarn.lock

nuxt的配置文件在`nuxt.config.js`文件中
```js
export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: 'nuxt-demo',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    'ant-design-vue/dist/antd.css'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '@/plugins/antd-ui'
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
  ],

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
```

这里主要讲一下nuxt的路由，Nuxt.js 依据 `pages` 目录结构自动生成 [vue-router](https://github.com/vuejs/vue-router) 模块的路由配置。

要在页面之间使用路由，我们建议使用[`<nuxt-link>`](https://www.nuxtjs.cn/api/components-nuxt-link) 标签。
假设 `pages` 的目录结构如下：

```
pages/
--| user/
-----| index.vue
-----| one.vue
--| index.vue
```

那么，Nuxt.js 自动生成的路由配置如下：

```
router: {
  routes: [
    {
      name: 'index',
      path: '/',
      component: 'pages/index.vue'
    },
    {
      name: 'user',
      path: '/user',
      component: 'pages/user/index.vue'
    },
    {
      name: 'user-one',
      path: '/user/one',
      component: 'pages/user/one.vue'
    }
  ]
}
```
还有其他的路由方式，比如动态路由，路由参数校验，嵌套路由和动态嵌套路由等等，可以查看nuxt的[路由文档](https://www.nuxtjs.cn/guide/routing)


### Next
>Next.js is a React framework for building full-stack web applications. You use React Components to build user interfaces, and Next.js for additional features and optimizations.
>Under the hood, Next.js also abstracts and automatically configures tooling needed for React, like bundling, compiling, and more. This allows you to focus on building your application instead of spending time with configuration.
>Whether you're an individual developer or part of a larger team, Next.js can help you build interactive, dynamic, and fast React applications.

>Js是一个用于构建全栈Web应用程序的React ssr框架。
>您可以使用Reaction组件来构建用户界面，使用Next.js来实现其他功能和优化。
>在幕后，Next.js还抽象并自动配置Reaction所需的工具，如绑定、编译等。
>这使您可以专注于构建应用程序，而不是花费时间进行配置。
>无论您是个人开发人员还是更大团队的一员，Next.js都可以帮助您构建交互式、动态和快速反应的应用程序。

 

### 什么是 Next.js？

Next.js 是一个开源的 React 框架，用于构建服务器渲染（SSR）和静态生成（SSG）的应用程序。它结合了 React 的声明性和灵活性以及服务器端渲染的性能优势，使得构建高性能的应用变得更加简单。

### 主要特性

1. **服务器渲染和静态生成**：Next.js 支持服务器渲染和静态生成两种方式。服务器渲染可以提供更快的首次加载时间和更好的 SEO。静态生成则可以预先生成页面，并在每个请求之前提供响应，从而具有出色的性能。

2. **热模块替换**：Next.js 支持热模块替换（HMR），在开发过程中，您可以实时更新代码并立即看到变化，无需手动刷新页面。

3. **自动代码拆分**：Next.js 可以根据页面和组件的需求自动拆分代码，只加载当前页面所需的代码，从而提高性能和加载速度。

4. **路由系统**：Next.js 提供了简单而强大的路由系统，可以轻松地定义页面之间的导航关系，并支持动态路由、嵌套路由等功能。

5. **CSS 模块支持**：Next.js 内置了对 CSS 模块的支持，使得组件级别的样式隔离和管理变得更加简单。

### 如何开始使用 Next.js？

要开始使用 Next.js，您可以按照以下步骤进行：

1. **创建新项目**：使用命令行工具，在您选择的目录中创建一个新的 Next.js 项目。

```bash
npx create-next-app my-app
```

2. **定义页面**：在 `pages` 目录下创建您的页面文件，每个文件将映射到一个路由。

```jsx
// pages/index.js
function HomePage() {
  return <h1>Hello, Next.js!</h1>;
}

export default HomePage;
```

3. **编写组件**：在页面文件中编写 React 组件，可以使用 JSX 语法和任何其他 React 功能。

4. **启动开发服务器**：运行开发命令，启动 Next.js 开发服务器，并访问 http://localhost:3000 查看您的应用程序。

```bash
npm run dev
```

5.**构建和部署**：当您准备好部署应用程序时，使用构建命令生成优化的生产版本，并将其部署到您选择的托管平台上。

### 结论

Next.js 是一个强大而灵活的框架，为 React 开发者提供了构建高性能应用程序的便利性。它的服务器渲染和静态生成功能、热模块替换和自动代码拆分等特性使得开发过程更加高效和愉快。如果您正在寻找一种简单而强大的方式来构建 React 应用程序，不妨试试 Next.js！




## node框架

标题：入门指南：了解 Nest.js

正文：

在现代 Web 开发中，构建高性能的应用程序是至关重要的。Nest.js 是一个基于 TypeScript 的框架，它提供了一种简单而强大的方式来构建可扩展和模块化的应用程序。本文将介绍 Nest.js 的基本概念和特性，并提供代码示例，帮助您快速入门。

### 什么是 Nest.js？

Nest.js 是一个基于 TypeScript 的框架，用于构建可扩展和模块化的服务器端应用程序。它结合了 Angular 的依赖注入和模块化、Express 的灵活性和 Node.js 的性能优势，使得构建高性能的应用变得更加简单。

### 主要特性

1. **基于 TypeScript**：Nest.js 使用 TypeScript 编写，可以利用静态类型检查和强类型约束来提高代码质量和开发效率。

2. **依赖注入**：Nest.js 提供了 Angular 风格的依赖注入机制，使得组件之间的协作和解耦变得更加简单。

3. **模块化**：Nest.js 支持模块化编程，可以将应用程序拆分成多个可重用的模块，从而提高代码的可维护性和可扩展性。

4. **路由系统**：Nest.js 提供了强大的路由系统，可以轻松地定义 API 路由和请求处理程序，并支持中间件和管道等功能。

5. **支持多种数据库**：Nest.js 支持多种数据库，包括 MongoDB、MySQL、PostgreSQL 等，可以轻松地与数据库进行交互。

### 如何开始使用 Nest.js？

要开始使用 Nest.js，您可以按照以下步骤进行：

1. **创建新项目**：使用命令行工具，在您选择的目录中创建一个新的 Nest.js 项目。

```
$ npm i -g @nestjs/cli
$ nest new project-name
```

2. **定义控制器**：在 `src` 目录下创建您的控制器文件，每个文件将映射到一个路由。

```typescript
import { Controller, Get } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }
}
```

3. **定义模块**：在 `src` 目录下创建您的模块文件，用于组织和管理应用程序中的组件。

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

4. **启动应用程序**：运行启动命令，启动 Nest.js 应用程序，并访问 http://localhost:3000/cats 查看您的应用程序。

```
$ npm run start
```

### 使用nest写增删改查
要使用 Nest.js 编写增删改查（CRUD）接口，您可以按照以下步骤进行操作：

1. **创建控制器**：使用 Nest CLI 创建一个控制器文件，该文件将包含处理请求的方法。

```bash
$ nest generate controller cats
```

上述命令将在 `src` 目录下生成一个名为 `cats.controller.ts` 的控制器文件。

2. **定义路由和请求处理程序**：在控制器文件中，使用装饰器和方法来定义路由和请求处理程序。以下是一个示例，展示了如何创建一个简单的 CRUD 接口：

```typescript
import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';

@Controller('cats')
export class CatsController {
  @Get()
  findAll(): string {
    return 'This action returns all cats';
  }

  @Get(':id')
  findOne(@Param('id') id: string): string {
    return `This action returns cat ${id}`;
  }

  @Post()
  create(@Body() catData: any): string {
    return `This action creates a new cat with the following data: ${JSON.stringify(catData)}`;
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() catData: any): string {
    return `This action updates cat ${id} with the following data: ${JSON.stringify(catData)}`;
  }

  @Delete(':id')
  remove(@Param('id') id: string): string {
    return `This action removes cat ${id}`;
  }
}
```

上述代码创建了以下路由和请求处理程序：

- GET `/cats`：返回所有猫的信息。
- GET `/cats/:id`：根据提供的 ID 返回特定猫的信息。
- POST `/cats`：创建一个新的猫，使用请求体中提供的数据。
- PUT `/cats/:id`：更新具有提供的 ID 的猫的信息，使用请求体中提供的数据。
- DELETE `/cats/:id`：删除具有提供的 ID 的猫。

3. **注册控制器**：在模块文件中，将控制器注册到相应的模块中。您可以使用装饰器 `@Module` 和 `controllers` 属性来完成这一步骤。

```typescript
import { Module } from '@nestjs/common';
import { CatsController } from './cats.controller';

@Module({
  controllers: [CatsController],
})
export class AppModule {}
```

上述代码将 `CatsController` 注册到 `AppModule` 模块中。

4. **启动应用程序**：使用命令启动 Nest.js 应用程序。

```bash
$ npm run start
```

现在，您可以通过发送不同的 HTTP 请求（GET、POST、PUT、DELETE）到相应的路由来测试增删改查接口。

这只是一个简单的示例，您可以根据需要扩展和定制接口的功能。Nest.js 还提供了更多的装饰器和功能，如请求体验证、异常处理、数据库集成等，以满足不同场景下的需求。



### 结论

Nest.js 是一个强大而灵活的框架，为 TypeScript 开发者提供了构建可扩展和模块化应用程序的便利性。它的依赖注入、模块化和路由系统等特性使得开发过程更加高效和愉快。如果你正在寻找一种简单而强大的方式来构建服务器端应用程序，不妨试试 Nest.js！





## 总结

以上就是对Nuxt.js，Next.js，Nest.js这三个框架的一个最简单的介绍了。主要是让大家知道这三个框架虽然名字很像，但是使用方法和应用场景却是不一样的，各自用于不同的用途和场景。 
1. Nuxt.js：
   - Nuxt.js 是一个基于 Vue.js 的通用应用框架，用于构建服务器渲染的 Vue.js 应用程序。
   - 它提供了一些默认配置和约定，使得开发者可以快速搭建 SSR（服务器端渲染）应用，以提供更好的 SEO（搜索引擎优化）和性能。
   - Nuxt.js 还集成了 Vue 路由器和 Vuex 状态管理，使得开发复杂的前端应用变得更加简单。

2. Next.js：
   - Next.js 是一个基于 React 的通用应用框架，用于构建服务器渲染的 React 应用程序。
   - 它提供了一些默认配置和约定，使得开发者可以快速搭建 SSR 应用，并且具有出色的性能和开发体验。
   - Next.js 支持静态生成和服务器端渲染，可以根据页面的需求选择最佳的渲染方式。

3. Nest.js：
   - Nest.js 是一个用于构建高效、可扩展的服务器端应用程序的渐进式 Node.js 框架。
   - 它结合了 TypeScript（或 JavaScript）和面向对象编程的概念，使得开发者可以使用类、装饰器和依赖注入等技术来构建可维护和可测试的应用。
   - Nest.js 基于模块化的架构设计，提供了丰富的功能和插件，包括路由管理、中间件支持、数据库集成等。

简而言之：
- Nuxt.js 和 Next.js 都是用于构建服务器渲染应用的框架，分别基于 Vue.js 和 React。
- Nuxt.js 适用于构建 Vue.js 应用程序，提供了默认的配置和约定，使得开发 SSR 应用更加简单。
- Next.js 适用于构建 React 应用程序，具有出色的性能和开发体验，并支持静态生成和服务器端渲染。
- Nest.js 是一个用于构建 Node.js 服务器端应用的框架，结合了 TypeScript 和面向对象编程的概念，提供了模块化的架构设计和丰富的功能。

根据我们的的需求和技术栈选择适合的框架将有助于更高效地开发应用程序。