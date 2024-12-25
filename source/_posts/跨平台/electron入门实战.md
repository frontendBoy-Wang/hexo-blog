---
title: electron入门实战
categories:
    - electron
cover: ../img/31.png
feature: false
date: 2023-1-11 1:46:35
tags: electron
---

![iTab-6o7z77-20231026200347-bzxckup.jpeg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d0d69fc1535e4951a4260b81603474bd~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3840&h=2160&s=1968934&e=jpg&b=365072)

# 前言

> 我们在学习某一种技术之前，得先问几个问题：
>
> -   是什么？
> -   干什么？
> -   优缺点？
> -   怎么用？
>
> 当我们明白了以上几个问题之后，那就大概率算是基本掌握了这个技术，后面再要深入就要经过大量的项目实践和源码原理的研究了。

我本人也是做个好几个基于electron+react的项目了。在做electron项目过程中也是踩了不少坑，学习了不少关于electron的知识。这篇文章主要是介绍electron基本概念和入门级的实践。

本文将从以下几个方面讲述electron的入门实践：

1.  什么是Electron

    1.  架构组成
    1.  底层技术

1.  Electron的应用场景

1.  Electron的优缺点

1.  如何使用Electron

    1.  创建项目

1.  有哪些好用的cli脚手架

# 什么是Electron

这里借用官方的一句话：

> Electron是一个使用 JavaScript、HTML 和 CSS 构建桌面应用程序的框架。 嵌入 [Chromium](https://www.chromium.org/) 和 [Node.js](https://nodejs.org/) 到 二进制的 Electron 允许 保持一个 JavaScript 代码代码库并创建 在Windows上运行的跨平台应用 macOS和Linux——不需要本地开发 经验。

## 架构组成

一图胜千言，简而言之Electron就等于谷歌浏览器+node+系统原生APIs

-   Chromium 为 Electron 提供强大的 UI 渲染能力，由于 Chromium 本身跨平台，因此无需考虑代码的兼容性。最重要的是，可以使用前端三板斧进行 Electron 开发。
-   Chromium 并不具备原生 GUI 的操作能力，因此 Electron 内部集成 Node.js，编写 UI 的同时也能够调用操作系统的底层 API，例如 path、fs、crypto 等模块。
-   Native API 为 Electron 提供原生系统的 GUI 支持，借此 Electron 可以调用原生应用程序接口。


![image-20231026214226-ekfgp1b.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2dd6b8610d52435494a09073330dc3df~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1520&h=794&s=264469&e=png&a=1&b=d0d0d0)

总结起来，Chromium 负责页面 UI 渲染，Node.js 负责业务逻辑，Native API 则提供原生能力和跨平台

## 底层技术

Chromium 的多进程模式主要由三部分组成: 浏览器端(Browser)、渲染器端(Render)、浏览器与渲染器的通信方式(IPC)

1.浏览器进程

浏览器进程 Browser 只有一个，当 Chrome 打开时，进程启动。浏览器为每个渲染进程维护对应的 RenderProcessHost，负责浏览器与渲染器的交互。RenderViewHost 则是与 RenderView 对象进行交互，渲染网页的内容。浏览器与渲染器通过 IPC 进行通信。

2.渲染进程管理

每个渲染进程都有一个全局 RenderProcess 对象，可以管理其与父浏览器进程之间的通信，并维护其全局状态。

3.view 管理

每个渲染器可以维护多个 RenderView 对象，当新开标签页或弹出窗口后，渲染进程就会创建一个 RenderView，RenderView 对象与它在浏览器进程中对应的 RenderViewHost 和 Webkit 嵌入层通信，渲染出网页网页内容(这里是我们日常主要关注的地方)。

# Electron的应用场景

Electron 的应用场景非常广泛，以下是一些常见的 Electron 应用场景：

1.  桌面应用程序开发：Electron 提供了丰富的 API 和工具，使开发者能够使用 HTML、CSS 和 JavaScript 构建功能强大的桌面应用程序。这种跨平台的能力使得开发者可以在 Windows、macOS 和 Linux 等操作系统上构建一次代码，多平台运行。
1.  跨平台的编辑器和开发工具：许多流行的代码编辑器和开发工具，如 Visual Studio Code、Atom 和 Slack，都是使用 Electron 构建的。Electron 提供了强大的扩展性和定制化能力，使得开发者能够创建适用于各种编程语言和开发环境的工具。
1.  桌面通讯工具：Electron 可以用于构建各种类型的桌面通讯工具，如聊天应用、视频会议工具和 VoIP（Voice over IP）应用。通过利用 Chromium 的 WebRTC 技术，Electron 应用程序可以实现实时音视频通讯和数据传输。
1.  桌面音乐和媒体播放器：Electron 可以用于构建音乐播放器、媒体管理工具和多媒体应用程序。通过结合 Node.js 的能力，开发者可以轻松地处理音频和视频文件、实现播放列表和音频可视化等功能。
1.  桌面游戏：Electron 提供了强大的图形渲染能力和硬件加速支持，使得开发者可以构建桌面游戏应用程序。通过结合 HTML5、Canvas 和 WebGL 技术，开发者可以创建高性能的游戏，并利用 Electron 的跨平台特性将其发布到不同的操作系统上。

总之，Electron 的应用场景非常广泛，适用于各种类型的桌面应用程序开发，包括编辑器、开发工具、通讯工具、音乐播放器、媒体应用和游戏等。它的跨平台特性和丰富的功能使得开发者能够快速构建出功能丰富、可扩展的桌面应用程序。

# Electron的优缺点

## 优点：

1.  跨平台支持：Electron 可以在多种操作系统上运行，包括 Windows、macOS 和 Linux 等。这使得开发者可以使用一套代码构建适用于不同平台的应用程序。
1.  强大的扩展性：Electron 提供了丰富的 API 和工具，使得开发者可以轻松地扩展和定制应用程序的功能。此外，Electron 还支持各种第三方插件和库，使得开发者能够快速实现复杂的功能。
1.  易于开发和调试：Electron 使用 HTML、CSS 和 JavaScript 进行开发，这些技术是广泛使用的前端开发技术。这使得开发者可以使用熟悉的技术栈进行开发，并且可以利用浏览器的调试工具进行调试。
1.  高性能和硬件加速：Electron 基于 Chromium 构建，具有强大的图形渲染能力和硬件加速支持。这使得开发者可以构建高性能的应用程序，并且可以利用 GPU 加速来提高图形渲染性能。
1.  社区活跃：Electron 拥有庞大的社区支持，这意味着开发者可以轻松地获取文档、示例代码和技术支持。此外，Electron 还有许多第三方插件和库可供选择，可以帮助开发者更快地构建应用程序。

## 缺点：

1.  内存占用高：Electron 应用程序通常需要占用大量的内存，这可能会导致性能问题和用户体验问题。
1.  安全问题：由于 Electron 应用程序使用了 Chromium 的渲染引擎，因此可能存在一些安全问题，如 XSS 攻击和跨站点脚本攻击等。
1.  文件大小较大：Electron 应用程序通常比传统的本地应用程序更大，这可能会导致下载和安装时间较长。
1.  更新管理困难：由于 Electron 应用程序需要更新整个应用程序包，因此更新管理可能会比较困难，尤其是在用户数据存储和应用程序配置方面。

总之， 开发者需要根据自己的需求和应用场景来选择是否使用该框架。如果 需要构建跨平台的应用程序，并且需要快速迭代和定制化功能，那么 Electron 可能是一个不错的选择。

# 如何使用Electron

当然是先安装啦

```
npm install --save-dev electron

yarn add --dev electron
```

## 创建项目

然后用npm创建工程化项目

```
npm init 
```

添加脚本命令

```
{
  "scripts": {
    "start": "electron ."
  }
}
```

创建main.js

```js
const { app, BrowserWindow } = require('electron')
const path = require('node:path')

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // 加载 index.html
    mainWindow.loadFile('index.html')

    // 打开开发工具
    // mainWindow.webContents.openDevTools()
}

// 这段程序将会在 Electron 结束初始化
// 和创建浏览器窗口的时候调用
// 部分 API 在 ready 事件触发后才能使用。
app.whenReady().then(() => {
    createWindow()

    app.on('activate', () => {
        // 在 macOS 系统内, 如果没有已开启的应用窗口
        // 点击托盘图标时通常会重新创建一个新窗口
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// 除了 macOS 外，当所有窗口都被关闭的时候退出程序。 因此, 通常
// 对应用程序和它们的菜单栏来说应该时刻保持激活状态, 
// 直到用户使用 Cmd + Q 明确退出
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})

// 在当前文件中你可以引入所有的主进程代码
// 也可以拆分成几个文件，然后用 require 导入。
```

# 有哪些好用的cli脚手架

以下是几个常用的 Electron 脚手架，可以帮助快速开始 Electron 应用程序的开发：

1.  Electron Forge：Electron Forge 是一个功能强大的命令行工具和脚手架，可以帮助 初始化、构建和打包 Electron 应用程序。它提供了一套简单的命令行接口，使得创建和管理 Electron 项目变得更加容易。
1.  Electron React Boilerplate：这是一个基于 Electron 和 React 的脚手架项目，提供了一个现代化的开发环境和项目结构。它集成了许多常用的工具和库，如 Webpack、Babel、Redux 等，使得开发 Electron 应用程序变得更加高效和便捷。
1.  Electron Vue：如果 喜欢使用 Vue.js 进行开发，那么 Electron Vue 是一个不错的选择。它提供了一个基于 Vue.js 的 Electron 开发模板，集成了许多常用的工具和插件，如 Vue Router、Vuex 等，使得开发 Electron 应用程序与 Vue.js 更加无缝衔接。
1.  Electron-Boilerplate：这是一个简单而灵活的 Electron 脚手架，提供了一个基本的项目结构和开发工作流程。它没有过多的集成和预设，适合那些希望从头开始构建自己的 Electron 应用程序的开发者。
1.  Electron-React-Boilerplate：这是一个基于 Electron 和 React 的脚手架项目，提供了一个完整的开发环境和项目结构。它集成了许多常用的工具和库，如 Webpack、Babel、React Router 等，使得开发 Electron 应用程序变得更加高效和便捷。

这些脚手架都有活跃的社区支持和文档， 可以根据自己的需求选择最适合 的脚手架进行开发。无论 是使用原生 JavaScript、React、Vue.js 还是其他前端框架，都可以找到相应的 Electron 脚手架来帮助 快速启动项目。