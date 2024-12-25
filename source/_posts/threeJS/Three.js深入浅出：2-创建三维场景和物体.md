---
title: Three.js深入浅出：2-创建三维场景和物体
categories:
    - Three
cover: ../img/3.png
feature: false
date: 2023-10-10 22:46:35
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
> 让我们一起踏上 Three.js 的学习之旅，探索无限的创意可能性，开启属于自己的 3D 时代！ 欢迎各位小伙伴们多多关注，你的点赞和评论是我写作的动力！

# 核心概念 

下面我将详细解释 Three.js 的核心概念：

1.  **场景 (Scene)** ：场景是 Three.js 中的核心概念，它充当着所有 3D 对象的容器。通过创建场景对象，可以将所有的物体、灯光和相机放置在同一个坐标空间中进行渲染。
1.  **相机 (Camera)** ：相机定义了用户在场景中所看到的部分。Three.js 提供了多种类型的相机，包括透视相机（PerspectiveCamera）和正交相机（OrthographicCamera），它们分别用于创建透视投影和正交投影效果。
1.  **渲染器 (Renderer)** ：渲染器负责将场景和相机中的内容渲染成 2D 图像，并显示在浏览器中。Three.js 提供了 WebGLRenderer 和 CanvasRenderer 两种渲染器，其中 WebGLRenderer 利用 WebGL 技术实现硬件加速渲染，性能更好。
1.  **光源 (Light)** ：光源用于模拟场景中的光照效果。Three.js 支持多种类型的光源，包括环境光、点光源、聚光灯和方向光等，通过调整光源的参数可以控制阴影、反射等效果。
1.  **材质 (Material)** ：材质定义了物体表面的外观和特性，如颜色、纹理、光照反射等。Three.js 提供了各种内置的材质类型，也支持自定义的着色器材质。
1.  **几何体 (Geometry)** ：几何体是 3D 物体的基本结构，描述了物体的形状和结构。在 Three.js 中可以创建各种几何体，如立方体、球体、圆柱体等，也支持自定义几何体的创建。
1.  **网格 (Mesh)** ：网格是由几何体和材质组合而成的对象，它是 Three.js 中最常见的 3D 对象类型。网格可以被添加到场景中，通过变换、旋转、缩放等操作来实现动画效果。
1.  **纹理 (Texture)** ：纹理用于给几何体表面贴图，赋予物体更加生动和细致的外观。Three.js 支持加载各种图片文件作为纹理，也支持动态生成纹理。
1.  **动画 (Animation)** ：Three.js 提供了丰富的动画支持，可以实现物体的平移、旋转、缩放等动画效果。动画系统可以与时间、鼠标、键盘等事件进行交互，实现复杂的交互式动画效果。
当然，除了上面提到的核心概念外，Three.js 还涵盖了一些其他重要的概念，这些概念对于理解和使用 Three.js 都非常关键：
10. **控制器 (Controller)** ：控制器用于管理用户与场景之间的交互，包括鼠标、触摸屏、键盘等输入设备的响应。Three.js 提供了 OrbitControls、FlyControls、TrackballControls 等多种控制器，可以方便地实现用户对相机视角的控制。
10. **粒子系统 (Particle System)** ：粒子系统是用于模拟大量小颗粒的效果，比如烟雾、火焰、雨滴等。Three.js 提供了ParticleSystem类，可以创建和管理粒子系统，通过调整粒子的位置、速度、大小等参数来实现各种粒子效果。
10. **后期处理 (Post-processing)** ：后期处理是指在渲染图像后对其进行额外的处理，比如添加景深效果、光照效果、色彩调整等。Three.js 提供了EffectComposer类和多个着色器（Shader）来实现各种后期处理效果。
10. **阴影 (Shadow)** ：阴影效果可以使场景中的物体产生逼真的阴影，增强了 3D 场景的真实感。Three.js 支持通过设置光源的属性和材质的属性来实现阴影效果。
10. **加载器 (Loader)** ：加载器用于加载外部资源，比如模型文件、纹理图片、音频文件等。Three.js 提供了多种加载器，如OBJLoader、MTLLoader、TextureLoader 等，可以方便地将外部资源加载到场景中使用。
10. **性能优化 (Performance Optimization)** ：在开发 3D 应用时，性能优化非常重要。Three.js 提供了诸如几何体合并、LOD（细节层次）技术、GPU 粒子等性能优化手段，来提高应用的运行效率和流畅度。


# 创建一个正方体

### 创建场景，相机，渲染器
```js
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 ); 
const renderer = new THREE.WebGLRenderer();
```
1.  **const scene = new THREE.Scene();** 这一行代码创建了一个新的场景对象。在 Three.js 中，场景（Scene）是用来存放和管理所有 3D 对象（比如模型、灯光、相机等）的容器。通过创建一个场景对象，我们可以将所有的 3D 元素都添加到这个场景中，并在之后对它们进行操作和渲染。
1.  **const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);** 这一行代码创建了一个透视相机（Perspective Camera）。相机是观察场景的视角，决定了最终渲染出来的图像是怎样的。在这里，使用 PerspectiveCamera 类创建了一个透视相机，参数分别为视野角度（fov）、屏幕纵横比（aspect ratio）、近裁剪面（near clipping plane）和远裁剪面（far clipping plane）。视野角度决定了观察者能够看到的范围，而近裁剪面和远裁剪面则定义了相机能够渲染的物体范围，超出这个范围的物体将不会被渲染。
1.  **const renderer = new THREE.WebGLRenderer();** 这一行代码创建了一个 WebGL 渲染器（WebGL Renderer）。渲染器负责将 3D 场景渲染成 2D 图像并显示在浏览器中。Three.js 使用 WebGL 技术来进行硬件加速的 3D 渲染，而 WebGLRenderer 类就是用于创建并配置这个渲染器的。渲染器会将最终的 3D 场景渲染到画布（canvas）上，并通过渲染器的 DOM 元素添加到页面中来显示最终的渲染结果。


### 设置渲染器大小参数
```js
renderer.setSize(windowWidth, windowHeight);// 设置渲染器的大小
document.body.appendChild( renderer.domElement );// 将渲染器添加到页面中
```
1.  **renderer.setSize(windowWidth, windowHeight);** 这行代码的作用是设置渲染器的大小，其中 windowWidth 和 windowHeight 分别代表了浏览器窗口的宽度和高度。通过调用 setSize 方法，我们告诉渲染器应该将输出的 3D 场景渲染成多大尺寸的图像。通常情况下，我们会将渲染器的大小设置为与浏览器窗口相同的尺寸，以保证 3D 场景能够填满整个浏览器窗口。
1.  **document.body.appendChild( renderer.domElement );** 这行代码的作用是将渲染器的 DOM 元素添加到页面中，以便在浏览器中显示 3D 场景。在 Three.js 中，每个渲染器都有一个对应的 DOM 元素（通常是一个 canvas 元素），它用于显示渲染后的 3D 图像。通过调用 appendChild 方法，我们将这个 DOM 元素添加到页面的 body 元素中，这样就能在页面上看到经过渲染的 3D 场景了。
2.  

### 创建立方体物体
```js
const geometry = new THREE.BoxGeometry(1, 1, 1);// 立方体几何体
const material = new THREE.MeshBasicMaterial({color: 0x00ff00});// 材质
const cube = new THREE.Mesh(geometry, material);// 立方体
```
1.  **const geometry = new THREE.BoxGeometry(1, 1, 1);** 这一行代码创建了一个立方体的几何体（geometry）。在 Three.js 中，几何体用来定义 3D 模型的形状，比如立方体、球体、圆柱体等。BoxGeometry 类表示一个立方体的几何形状，参数 (1, 1, 1) 分别表示立方体在 x、y、z 轴上的尺寸。因此，这行代码创建了一个边长为 1 的立方体几何体。
1.  **const material = new THREE.MeshBasicMaterial({color: 0x00ff00});** 这一行代码创建了一个基本网格材质（MeshBasicMaterial）。材质定义了模型表面的外观特性，比如颜色、光照效果等。在这里，使用 MeshBasicMaterial 类创建了一个具有固定颜色的材质，颜色值 0x00ff00 表示绿色。这意味着我们将创建一个绿色的立方体模型。
1.  **const cube = new THREE.Mesh(geometry, material);** 这一行代码创建了一个网格对象（Mesh），并将之前创建的立方体几何体和材质应用到这个网格对象上。Mesh 类表示一个由几何体和材质组合而成的 3D 模型。通过将立方体几何体和材质传递给 Mesh 构造函数，我们实际上创建了一个拥有指定形状和外观的立方体模型。


### 渲染场景和动画
```js
scene.add(cube);// 将立方体添加到场景中

camera.position.z = 5;// 移动摄像机

// 渲染循环
function animate() {
    requestAnimationFrame(animate);// 请求动画帧
    cube.rotation.x += 0.01;// 旋转立方体
    cube.rotation.y += 0.01;// 旋转立方体
    renderer.render(scene, camera);// 渲染场景
}

window.onload = animate// 页面加载完毕后执行动画函数
```

1.  **scene.add(cube);** 这一行代码将之前创建的立方体模型 cube 添加到场景中。在 Three.js 中，使用 add 方法可以将 3D 对象添加到场景中，使其成为场景的一部分，从而在渲染时被显示出来。

1.  **camera.position.z = 5;** 这一行代码将摄像机的位置沿着 z 轴移动到距离原点 5 个单位的位置。在 3D 场景中，摄像机决定了观察者的视角和展示效果，通过调整摄像机的位置，可以改变观察到的场景效果。

1.  **function animate() { ... }** 这是一个名为 animate 的函数，用于执行渲染循环。在这个函数中：

    -   **requestAnimationFrame(animate);**  这一行代码请求浏览器在下次重绘之前更新动画，并指定下一次重绘时调用的回调函数为 animate，这样可以实现流畅的动画效果。
    -   **cube.rotation.x += 0.01;**  和 **cube.rotation.y += 0.01;**  这两行代码分别对立方体模型进行 x 轴和 y 轴方向上的旋转操作。通过不断改变立方体模型的旋转角度，可以实现旋转的动画效果。
    -   **renderer.render(scene, camera);**  这一行代码使用渲染器来对场景进行渲染，以当前的摄像机视角生成最终的图像。

1.  **window.onload = animate** 这一行代码指定在页面加载完成后执行 animate 函数，启动动画渲染循环。

# 完整代码

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/138588b00600454e8d62599872771c1d~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2984&h=1722&s=143802&e=png&a=1&b=000000)
```html
<!--
 * @Date: 2023-11-11 14:14:21
 * @LastEditors: 前端少年汪  
 * @LastEditTime: 2023-11-11 15:50:17
 * @FilePath: /webGIS/1-three.html
 * @Description: 
-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
    <style>
        h1 {
            text-align: center;
        }

        #webgl {
            width: 1200px;
            height: 700px;
            margin: 0 auto;
        }

    </style>
</head>
<body>
<h1>three.js入门教程</h1>
<div id="webgl"></div>
<script type="module">
    // 现在浏览器支持ES6语法，自然包括import方式引入js文件
    import * as THREE from './node_modules/three/src/Three.js';

    let windowWidth = 1200;// 窗口宽度
    let windowHeight = 700;// 窗口高度

    const scene = new THREE.Scene();// 场景
    const camera = new THREE.PerspectiveCamera(75, windowWidth / windowHeight, 0.1, 1000);// 摄像机
    const renderer = new THREE.WebGLRenderer();// 渲染器

    renderer.setSize(windowWidth, windowHeight);// 设置渲染器的大小

    document.getElementById('webgl').appendChild(renderer.domElement);// 将渲染器添加到页面中
    // document.body.appendChild( renderer.domElement );

    const geometry = new THREE.BoxGeometry(1, 1, 1);// 立方体几何体
    const material = new THREE.MeshBasicMaterial({color: 0x00ff00});// 材质
    const cube = new THREE.Mesh(geometry, material);// 立方体
    scene.add(cube);// 将立方体添加到场景中

    camera.position.z = 5;// 移动摄像机

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);// 请求动画帧
        cube.rotation.x += 0.01;// 旋转立方体
        cube.rotation.y += 0.01;// 旋转立方体
        renderer.render(scene, camera);// 渲染场景
    }

    window.onload = animate// 页面加载完毕后执行动画函数

</script>
</body>
</html>
```

# 总结
以上demo总结来说，使用了 Three.js 库创建了一个简单的绿色立方体模型，并实现了旋转动画效果。 总结一下它的步骤：

1. **创建立方体模型：**
   - 使用 BoxGeometry 类创建了一个边长为 1 的立方体几何体。
   - 使用 MeshBasicMaterial 类创建了一个绿色的基本网格材质。
   - 将几何体和材质传递给 Mesh 类创建了一个立方体网格对象。

2. **将立方体添加到场景中：**
   - 使用 scene.add(cube) 将立方体模型添加到场景中，使其成为场景的一部分。

3. **设置摄像机位置：**
   - 将摄像机沿着 z 轴移动到距离原点 5 个单位的位置，以确定观察者的视角和展示效果。

4. **创建渲染循环：**
   - 定义了一个名为 animate 的函数，用于执行渲染循环。
   - 在 animate 函数中，使用 requestAnimationFrame 请求浏览器在下次重绘之前更新动画，然后对立方体模型进行 x 和 y 轴方向上的旋转操作，最后通过渲染器对场景进行渲染。

5. **启动动画渲染循环：**
   - 指定在页面加载完成后执行 animate 函数，从而启动动画渲染循环。

通过以上步骤，我们成功创建了一个具有旋转动画效果的绿色立方体模型，并将其显示在网页中。这个简单的示例展示了如何使用 Three.js 创建基本的 3D 模型并实现动画效果。