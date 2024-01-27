---
title: Three.js深入浅出：1-搭建Three.js开发环境
categories:
    - Three
cover: ../img/3.png
feature: false
date: 2023-10-04 22:46:35
tags: threr.js
---
# 序言：

> 在现代互联网时代，Web 技术的快速发展使得 Web 开发领域日新月异。随着互联网内容变得越来越丰富、复杂，用户对于网页和应用程序的交互性和视觉效果提出了更高的要求。在这样的背景下，基于 WebGL 的 3D 图形技术越来越受到关注和重视。
>
> 而在众多的 3D 图形库中，Three.js 作为一款优秀的 JavaScript 3D 图形库，受到了广泛的欢迎和应用。无论是创建引人入胜的交互式 3D 场景、还是打造惊艳的虚拟现实体验，Three.js 都展现出了强大的潜力和灵活性。
>
> 本系列文章将深入探讨 Three.js，从基础入门到高级应用，带领读者逐步掌握 Three.js 的核心概念和技术要点。我们将从搭建基本的 3D 场景开始，逐步引入光影、材质、纹理、动画等概念，让读者能够系统地掌握 Three.js 的开发技巧和实践经验。
>
> 通过本系列文章的学习，读者将能够掌握使用 Three.js 创建精美的 3D 可视化效果，以及实现交互式的虚拟场景的能力。无论是 Web 开发工程师、还是对 3D 图形技术感兴趣的爱好者，都能够从中受益匪浅。
>
> 让我们一起踏上 Three.js 的学习之旅，探索无限的创意可能性，开启属于自己的 3D 时代！
> 欢迎各位小伙伴们多多关注，你的点赞和评论是我写作的动力！👏🚀


# 引入three.js的方式
这里主要分为两种情况
1. 开发环境：项目开发引入threejs，比如vue或react脚手架引入threejs。
2. 学习环境：入门学习threejs阶段，html文件中直接引入threejs


# 开发环境下
## npm安装引入
如果你使用的是**Vue + threejs**或**React + threejs**技术栈，那么threejs就是一个js库，直接通过**npm**命令行安装就行。

npm安装特定版本three.js(注意使用哪个版本，查文档就查对应版本)
```cmd
npm i three@版本号 --save

yarn add three

```

使用npm安装之后在vue或者react组件里面直接使用es6的方式引入即可
```js
// 引入three.js
import * as THREE from 'three';

```

## 引入three扩展库

除了three.js核心库以外，在threejs文件包中**examples/jsm**目录下，还可以看到各种不同功能的扩展库。

项目用到那个扩展库，就引入那个，用不到就不需要引入
比如：
```js
// 引入扩展库OrbitControls.js
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
// 引入扩展库GLTFLoader.js
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

```

# 学习环境下
如果不是正式开发Web3D项目，只是学习threejs功能，完全没必要用webpack或vite搭建一个开发环境。

学习使用的环境，只要创建一个.html文件，编写threejs代码，最后通过**本地静态服务**打开.html文件就行。

 

## script标签引入
你可以像平时开发web前端项目一样，通过script标签把three.js当做一个js库引入你的项目。

three.js库可以在threejs官方文件包下面的**build**目录获取到。
```html
<script src="./build/three.js"></script>
```

```js
//随便输入一个API，测试下是否已经正常引入three.js
console.log(THREE.Scene); 
```

####  ES6 import方式引入

给script标签设置`type="module"`,也可以在.html文件中使用`import`方式引入three.js。

```html
<script type="module">
// 现在浏览器支持ES6语法，自然包括import方式引入js文件
import * as THREE from './build/three.module.js';
</script>
```

#### type="importmap"配置路径

学习环境中，.html文件引入three.js，最好的方式就是参考threejs官方案例，通过配置`<script type="importmap">`,实现学习环境.html文件和vue或reaact脚手架开发环境一样的写法。这样你实际项目的开发环境复制课程源码，不用改变threejs引入代码。

下面配置的`type="importmap"`代码具体写法不用掌握记忆，复制粘贴后，能修改目录就行，你可以去电子书课件或者课件源码中复制。

```html
<!-- 具体路径配置，你根据自己文件目录设置，我的是课件中源码形式 -->
<script type="importmap">
    {
		"imports": {
			"three": "../../../three.js/build/three.module.js"
		}
	}
</script>
```

```html
<!-- 配置type="importmap",.html文件也能和项目开发环境一样方式引入threejs -->
<script type="module">
    import * as THREE from 'three';
    // 浏览器控制台测试，是否引入成功
    console.log(THREE.Scene);
</script>
```


## CDN引入
通过将文件上传到你自己的服务器，或是使用一个已存在的CDN，three.js 便可以不借助任何构建系统来进行使用。由于 three.js 依赖于ES module，因此任何引用它的script标签必须使用*type="module"* 。如下所示：

```html
<script type="importmap">
    {
    "imports": 
        { "three":"https://unpkg.com/three@<version>/build/three.module.js" }
    } 
</script>
<script type="module">
    import * as THREE from 'three'; 
    const scene = new THREE.Scene();
</script>
```

## 兼容性

### CommonJS 导入

虽然现代的 JavaScript 打包器已经默认支持ES module，然而也有一些较旧的构建工具并不支持。对于这些情况，你或许可以对这些打包器进行配置，让它们能够理解 ES module 。例如，[Browserify](http://browserify.org/) 仅需 [babelify](https://github.com/babel/babelify) 插件。

### Import maps

和从静态主机或CDN来进行安装的方式相比，从npm安装时，导入的路径有所不同。我们意识到，对于使用两种不同方式的用户群体来说，这是一个人体工程学问题。使用构建工具与打包器的开发者更喜欢仅使用单独的包说明符（如'three'）而非相对路径，而*examples/* 目录中的文件使用相对于 *three.module.js* 的引用并不符合这一期望。对于不使用构建工具的人（用于快速原型、学习或个人参考）来说，或许也会很反感这些相对导入。这些相对导入需要确定目录结构，并且比全局 *THREE.**  命名空间更不宽容。

我们希望在 [import maps](https://github.com/WICG/import-maps) 广泛可用时，能够移除这些相对路径，将它们替换为单独的包说明符，'three'。这更加符合构建工具对npm包的期望，且使得两种用户群体在导入文件时能够编写完全相同的代码。对于更偏向于避免使用构建工具的用户来说，一个简单的 JSON 映射即可将所有的导入都定向到一个 CDN 或是静态文件夹。通过实验，目前你可以通过一个 import map 的 polyfill，来尝试更简洁的导入，如 [import map example](https://glitch.com/edit/#!/three-import-map?path=index.html) 示例中所示。

### Node.js

由于 three.js 是为 Web 构建的, 因此它依赖于浏览器和 DOM 的 API ，但这些 API 在 Node.js 里不一定存在。这些问题中有的可以使用 [headless-gl](https://github.com/stackgl/headless-gl) 等 shims 来解决，或者用自定义的替代方案来替换像 [TextureLoader](http://www.yanhuangxueyuan.com/threejs/docs/index.html#api/zh/loaders/TextureLoader "TextureLoader") 这样的组件。其他 DOM API 可能与使用它们的代码强相关，因此将更难以解决。我们欢迎简单且易于维护的 pull request 来改进对 Node.js 的支持，但建议先打开问题来讨论您的改进。

确保在您的 package.json 文件中添加 { "type": "module" }，以在您的 Node.js 项目中启用 ES6 模块。