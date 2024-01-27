---
title: Three.js深入浅出：4-three.js中的光源
categories:
   - 前端
   - three.js
cover: ../img/2.jpeg
feature: false
date: 2023-12-19 22:46:35
tags: 前端 webGL
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


本篇文章将带你深入了解Three.js中的光源类型、属性和使用方法，助你在创建虚拟世界时获得更加生动逼真的效果


# 1. Three.js中的光源类型
-    1.1 环境光(Ambient Light)
-    1.2 平行光(Directional Light)
-    1.3 点光源(Point Light)
-    1.4 聚光灯(Spotlight)
-    1.5 区域光(Area Light)

> 当使用Three.js中的光源类型时，每种光源具有不同的属性和功能，下面对每种光源进行更详细的解释：
>
### 1.1 环境光(Ambient Light)
> 环境光是一种全局光源，它会均匀地照亮整个场景，不考虑物体的位置和方向。环境光没有明确定义的位置，也不会产生阴影效果。您可以设置环境光的颜色和强度来控制整个场景的整体亮度和色彩。
>
### 1.2 平行光(Directional Light)
> 平行光是一种具有指定方向的光源，类似于太阳光。平行光的光线是平行的，不会随距离的增加而发散。平行光可以产生明显的阴影效果，并常用于模拟室外自然光。您可以设置平行光的颜色、强度和方向来调整光照的效果。
>
### 1.3 点光源(Point Light)
> 点光源是一种向所有方向发射光线的光源，类似于灯泡。点光源的光线衰减程度随着距离的增加而减弱，即远离光源的物体会受到较少的光照。点光源可以产生明显的阴影效果，并常用于模拟人造光源，如室内灯光。您可以设置点光源的颜色、强度和位置来控制光照的效果。
>
### 1.4 聚光灯(Spotlight)
> 聚光灯是一种具有方向性的光源，可以产生锥形光照射效果。聚光灯具有发光点、方向和发散角度等属性。发光点决定了聚光灯的位置，方向控制了光线的传播方向，而发散角度决定了聚光灯的光锥大小。聚光灯可以产生明显的阴影效果，并常用于突出特定物体或区域。此外，聚光灯还可以设置光锥的衰减范围和光锥外的阴影效果。
>
### 1.5 区域光(Area Light)
> 区域光是一种基于面积的光源，可以产生柔和的阴影效果。区域光通常用于模拟大型光源，例如天窗或墙壁。区域光的形状可以是矩形或圆形，并且具有位置、法线和颜色等属性。区域光会通过面的面积和法线方向来决定光的强度和照射角度，从而产生柔和的环境光照射效果。

通过使用这些不同类型的光源，您可以根据场景的需求模拟各种不同的光照效果，使得渲染出的场景更加真实、细腻。您可以设置光源的属性，如颜色、强度、位置、方向和角度等，以及阴影的开启和关闭，来实现所需的光照效果。

```js
// 创建环境光
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);

// 创建平行光
const directionalLight = new THREE.DirectionalLight(0xffffff, 1);

// 创建点光源
const pointLight = new THREE.PointLight(0xffffff, 1, 100);

// 创建聚光灯
const spotLight = new THREE.SpotLight(0xffffff, 1);

// 创建区域光
const areaLight = new THREE.RectAreaLight(0xffffff, 1, 4, 4);

```
----
# 2. 光源属性及其影响
-    2.1 光的颜色和强度
-    2.2 光的位置和方向
-    2.3 光的衰减和阴影
-    2.4 光的投射和接收
   在Three.js中，光源的属性会对场景中的物体产生不同的影响。以下是光源属性及其影响的详细解释：

### 2.1 光的颜色和强度
> 光的颜色和强度是控制光源发出的光线的两个主要属性。光的颜色决定了场景中物体受到的光线的颜色，而光的强度决定了光线的亮度。增加光的强度可以使物体更明亮，而减小光的强度则会使物体变暗。通过调整光的颜色和强度，您可以创造出不同的光照效果，如自然光或彩色灯光。

### 2.2 光的位置和方向
> 光的位置和方向决定了光线的传播方式。对于平行光和点光源，您可以设置它们的位置来控制光线的发射方向。通过调整光源的位置，您可以模拟光线从不同角度或位置照射到物体上的效果。聚光灯也具有方向属性，您可以将其指向特定的位置，并通过调整方向来控制光锥的投射方向。
>
 ### 2.3 光的衰减和阴影
> 光的衰减和阴影属性可以影响光线的传播和物体的投影效果。衰减是指光线随着距离的增加逐渐减弱的过程。您可以设置光源的衰减系数来调整光线的衰减程度，从而影响物体受到的光照强度。阴影属性可以使光源产生阴影效果，实现物体之间的遮挡关系。通过打开阴影属性，您可以在场景中模拟出真实的阴影效果，增强物体的立体感。
>
 ### 2.4 光的投射和接收
> 光的投射和接收属性决定了物体能否投射或接收光线。通过设置物体的投射属性，您可以使光源照射到该物体上并产生阴影效果。而设置物体的接收属性，则可以使该物体受到其他光源的照射，并影响其表面的颜色和明暗程度。通过控制物体的投射和接收属性，您可以实现物体之间的相互作用和光照效果。

通过调整光源的属性，如颜色、强度、位置、方向、衰减和阴影等，以及物体的投射和接收属性，您可以创造出各种不同的光照效果，使得渲染出的场景更加真实、生动。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47c89b5c04c5411589dc10245de49648~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2988&h=1710&s=127046&e=png&a=1&b=000000)

```html
<script type="module">
  // 现在浏览器支持ES6语法，自然包括import方式引入js文件
  import * as THREE from './node_modules/three/src/Three.js';

  // 创建场景
  let scene = new THREE.Scene();
 

  // 创建平行光源
  let directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 颜色为白色，强度为1
  directionalLight.position.set(1, 1, 1); // 设置光源位置
  scene.add(directionalLight);

  // 创建点光源
  let pointLight = new THREE.PointLight(0xff0000, 1, 10); // 颜色为红色，强度为1，距离为10
  pointLight.position.set(0, 3, 0); // 设置光源位置
  scene.add(pointLight);

  // 创建立方体并设置材质
  let geometry = new THREE.BoxGeometry(1, 1, 1);
  let material = new THREE.MeshPhongMaterial({ color: 0x00ff00 }); // 设置立方体的颜色
  let cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  // 创建渲染器并设置大小
  let renderer = new THREE.WebGLRenderer();
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // 创建相机并设置位置
  let camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
  camera.position.set(0, 0, 5);

  // 渲染场景
  function render() {
    requestAnimationFrame(render);
    cube.rotation.x += 0.01; // 使立方体旋转
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  render();
  
</script>

```

---
# 3. Three.js中的光源使用方法
-    3.1 创建光源对象
-    3.2 将光源添加到场景中
-    3.3 调整光源属性和位置
-    3.4 渲染场景并观察光照效果



### 3.1 创建光源对象：
```javascript
// 创建平行光源
var directionalLight = new THREE.DirectionalLight(0xffffff, 1); // 颜色为白色，强度为1

// 创建点光源
var pointLight = new THREE.PointLight(0xff0000, 1, 10); // 颜色为红色，强度为1，距离为10
```

### 3.2 将光源添加到场景中：
```javascript
scene.add(directionalLight); // 将平行光源添加到场景中
scene.add(pointLight); // 将点光源添加到场景中
```

### 3.3 调整光源属性和位置：
```javascript
directionalLight.position.set(1, 1, 1); // 设置平行光源位置
pointLight.position.set(0, 3, 0); // 设置点光源位置
```

### 3.4 渲染场景并观察光照效果：
```javascript
// 创建渲染器并设置大小
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// 创建相机并设置位置
var camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(0, 0, 5);

// 渲染场景
function render() {
  requestAnimationFrame(render);
  renderer.render(scene, camera);
}
render();
```

通过以上步骤，可以在Three.js中创建光源，并将其应用到场景中的物体上，然后调整光源的属性和位置，最终渲染场景并观察光照效果。


---
# 4. 我的最佳实践和性能优化
-    4.1 合理选择光源类型
-    4.2 控制光源数量和强度
-    4.3 使用阴影技术增强真实感
-    4.4 考虑移动设备的性能限制

 

###  4.1 合理选择光源类型：
   根据场景需求合理选择光源类型，如平行光、点光源、聚光灯等。不同类型的光源会对渲染性能产生不同的影响，需根据具体情况进行选择。

   平行光源可以模拟太阳光，适用于大范围照射场景。点光源可以模拟灯泡等局部照明，适用于小范围照射场景。聚光灯可以模拟手电筒等具有方向性的光源，适用于需要强调某个区域的场景。

###  4.2 控制光源数量和强度：   
   控制光源的数量和强度，过多的光源会增加渲染负担，影响性能。合理使用光源并控制其强度可以提高渲染效率。

   过多的光源会导致场景中需要渲染更多的阴影和高光，从而增加渲染成本，影响性能。因此，在使用光源时，需要权衡渲染效果和性能，并控制光源的数量和强度。

###  4.3 使用阴影技术增强真实感：
 当需要增强场景的真实感时，可以考虑使用阴影技术。然而，阴影技术会增加渲染开销，因此需要谨慎使用，并根据性能需求进行调整。

   阴影技术可以让物体的投影产生更真实的效果，增强场景的真实感。但是，使用阴影技术会增加渲染开销，如果需要在性能有限的设备上运行，可能需要关闭阴影或采用简化的阴影技术。

###  4.4 考虑移动设备的性能限制：
 如果目标是在移动设备上运行，需要特别关注性能限制。移动设备的硬件性能通常比桌面设备低，因此需要针对移动设备进行性能优化，例如减少光源数量、简化模型细节等。

   移动设备的硬件性能相对较低，因此需要注意性能优化。可以通过减少光源数量、简化模型细节、使用纹理压缩等方法来提高性能。此外，还需要测试和优化场景的性能，并针对移动设备进行适当的调整。

通过遵循上述最佳实践和性能优化建议，可以有效提高Three.js应用的性能和用户体验。当然，实际应用中还需要根据具体场景和需求做出适当调整。


----

# 结论
通过本篇文章，已经了解了Three.js中不同类型的光源、光源属性的影响以及如何使用它们来创建逼真的光照效果。合理地设置和调整光源可以让3D场景更加生动、真实，并且在性能优化方面也有所收获。 