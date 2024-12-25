---
title: Three.js深入浅出：3-三维空间
categories:
    - Three
cover: ../img/3.png
feature: false
date: 2023-10-12 22:46:35
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


# 什么是三维空间

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0637d61f3ddd47758f2c46b1df793ed8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=621&h=371&s=50329&e=png&a=1&b=1298db)

在Three.js中，三维空间指的是具有三个独立轴的空间，通常称为X、Y和Z轴。这种空间用于描述和定位3D对象的位置、旋转和缩放。

1. **位置（Position）**：在三维空间中，每个对象都有一个位置，可以通过它在X、Y和Z坐标轴上的位置来确定。例如，一个立方体可能被放置在(x, y, z) = (0, 0, 0)，表示它位于三维空间的原点。

2. **旋转（Rotation）**：除了位置之外，物体还可以围绕三维空间中的任意轴进行旋转。在Three.js中，通常使用欧拉角（Euler angles）或四元数（quaternions）来表示旋转。

3. **缩放（Scale）**：每个对象都可以沿着X、Y和Z轴进行缩放，这决定了物体的大小。通过在不同轴上应用不同的缩放因子，可以实现各种形状和比例的变化。

通过使用这些三维空间的概念，你可以在Three.js中创建具有真实感的3D场景，包括摄影机、灯光、材质和几何体等元素，并对它们进行精确的定位、旋转和缩放，从而呈现出生动的三维世界。

总的来说，三维空间是Three.js中非常重要的概念，它提供了一个框架来描述和操作3D对象在虚拟世界中的位置、方向和大小，为构建交互式的3D场景提供了基础。


# 辅助观察坐标系

`THREE.AxesHelper()`的参数表示坐标系坐标轴线段尺寸大小，你可以根据需要改变尺寸。

```js
// AxesHelper：辅助观察的坐标系
const axesHelper = new THREE.AxesHelper(150);
scene.add(axesHelper);
```

# 材质半透明设置

设置材质半透明,这样可以看到坐标系的坐标原点。

```js
const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff, //设置材质颜色
    transparent:true,//开启透明
    opacity:0.5,//设置透明度
});
```

# `AxesHelper`的xyz轴

three.js坐标轴颜色红**R**、绿**G**、蓝**B**分别对应坐标系的**x**、**y**、**z**轴，对于three.js的3D坐标系默认**y轴朝上**。

# 设置模型在坐标系中的位置或尺寸

通过模型的位置、尺寸设置，加深3D坐标系的概念。

测试：设置长方体xyz不同方向尺寸

```
// 设置几何体长宽高，也就是x、y、z三个方向的尺寸
//对比三个参数分别对应xyz轴哪个方向
new THREE.BoxGeometry(100, 60, 20);
```

测试：改变位置

```
// 设置模型mesh的xyz坐标
mesh.position.set(100,0,0);
```

# 参数——预览新的渲染效果

你可以尝试源码中改变相机的参数，看看场景中的物体渲染效果怎么变化。

相机放在x轴负半轴，目标观察点是坐标原点，这样相当于相机的视线是沿着x轴正方向，只能看到长方体的一个矩形平面。

```js
camera.position.set(-1000, 0, 0);
camera.lookAt(0, 0, 0);
```

```js
// 相机视线沿着x轴负半轴，mesh位于相机后面，自然看不到
camera.position.set(-1000, 0, 0);
camera.lookAt(-2000, 0, 0);
```

相机far偏小，mesh位于far之外，物体不会显示在画布上。

```js
// const camera = new THREE.PerspectiveCamera(30, width / height, 1, 3000);
// 你可以进行下面测试，改变相机参数，把mesh放在视锥体之外，看看是否显示
// 3000改为300，使mesh位于far之外，mesh不在视锥体内，被剪裁掉
const camera = new THREE.PerspectiveCamera(30, width / height, 1, 300);
```

![视锥体](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/39a0e12e781e4f20a36604b202abe716~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=597&h=562&s=45000&e=png&a=1&b=d5e8d4)

