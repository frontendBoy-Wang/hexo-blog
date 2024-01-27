---
title: 使用Vite+Vue3创建Cesium项目
categories:
- vue3
cover: ../img/45.png
feature: false
date: 2023-4-15 10:46:35
tags: cesium
---

# Vite+Vue3+Cesium项目模版
> Cesium是AGI公司计算机图形开发小组与2011年研发的三维地球和地图可视化开源JavaScript库，Cesium一词来源于化学元素铯，铯是制造原子钟的关键元素，研发小组通过命名强调Cesium产品精益求精，专注时间数据可视化。Cesium为三维GIS提供了一个高效的数据可视化平台

## 使用viet创建vue3项目

创建vue3项目 这里使用的是vue的模版。如果选择其他框架，则不用加--template vue  
`pnpm create vite vite+vue3+cesium --template vue`

进入项目 `cd vite-app`

安装依赖 `pnpm install`

运行项目 `pnpm run dev`



![img.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/842db20b28964cc09d3be4b6d1432f07~tplv-k3u1fbpfcp-watermark.image?)

看到这个页面就说明vite+vue3的项目初始化成功了，下面就是安装和初始化cesium框架和cesium的vite插件了 在vite项目中要正常使用cesium我目前知道的有两种方法。

下面先讲第一种，也就是使用vite-plugin-cesium这个插件 首先找到这个插件的git仓库 <https://github.com/nshen/vite-plugin-cesium>

## 第一种方法

### install

```shell
npm i cesium vite-plugin-cesium vite -D

yarn add cesium vite-plugin-cesium vite -D
```

### Usage
在vite.config.js文件中添加cesium的插件
```js
import { defineConfig } from 'vite';
import cesium from 'vite-plugin-cesium';
export default defineConfig({
  plugins: [cesium()]
});
```

### 下面去页面中初始化cesium

```js
<script setup>
import {onMounted, ref} from 'vue'
import * as Cesium from 'cesium'

//cesium初始化必须写在mounted生命周期里面，否则会报错"Element with id "cesiumContainer" does not exist in the document."
onMounted(() => {
  const viewer = new Cesium.Viewer('cesiumContainer', {
    //这里是配置项
  })
})
</script>

<template>
  <div id="cesiumContainer"></div>
</template>


<style scoped>
#cesiumContainer {
  width: 100vw;
  height: 100vh;
}
</style>
```

![img_1.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fd081af2b7874a14922f01f365d21cbb~tplv-k3u1fbpfcp-watermark.image?)

发现样式有些问题。我一看，哦，原来是style.css中有模版的默认样式的影响。 把style.css中的默认样式删除就好了

![img_3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/d4c78e6c774c42da81b2bbdd17517512~tplv-k3u1fbpfcp-watermark.image?)

这才是正确的姿势嘛！🚀

## 第2种方法

第二种方法就是本地引入，把下载好的cesium依赖包（node_modules里面）复制放到public里面， 然后在index.html里面引入cesium和css文件  
```html

<script type="text/javascript" src="./public/Cesium/Cesium.js"></script>

<link rel="stylesheet" href="./public/Cesium/Widgets/widgets.css">
```

![img_3.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7d0d2941943747278d9212f487e3c8f6~tplv-k3u1fbpfcp-watermark.image?)
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Vue+Cesium</title>
      <link rel="stylesheet" href="./public/Cesium/Widgets/widgets.css">

![img_3.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06e65d12be0540ddb17c9a7b2476a7e2~tplv-k3u1fbpfcp-watermark.image?)
  </head>
  <body>
    <div id="app"></div>
    <script type="module" src="/src/main.js"></script>
    <script type="text/javascript" src="./public/Cesium/Cesium.js"></script>

![img_1.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cd519580e2904edbb34dc4d0dba5a00b~tplv-k3u1fbpfcp-watermark.image?)
  </body>
</html>
```

![img_3.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dcacaa51c6074d579fe935378e2fc551~tplv-k3u1fbpfcp-watermark.image?)

然后同样的去页面种初始化cesium就可以了。

不过还有一个小问题，在控制台中我发现有个报错:

*VM19:1 Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.*

目前还没找到解决的办法

下篇文章将介绍vite+react+cesium应该如何搭建react项目框架,以及cesium的一些概念和基本知识。