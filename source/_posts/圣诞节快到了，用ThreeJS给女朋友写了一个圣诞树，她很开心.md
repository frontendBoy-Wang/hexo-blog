---
title: 圣诞节快到了，用ThreeJS给女朋友写了一个圣诞树🎄，她很开心
categories:
    - 前端
    - Three.JS

cover: ../img/0.png
feature: true
date: 2023-12-30 10:46:35
tags: 前端 webGL WEB3d WebGIS
---

>转眼间又是一年快要结束了，马上圣诞节🎄就快到了。给女朋友(没有女朋友的就自己new一个吧🙈)写一个圣诞树让她开心一下吧


# 使用什么技术写

一开始我准备用html+css去写，后来感觉使用html和css写就太low了，没有一点点心意。就打算用three.js写一个3d版本的。

## 简单介绍一下threejs

Three.js是一个基于原生WebGL封装运行的三维引擎，是最著名的3D WebGL JavaScriptThree.js是一个基于原生WebGL封装运行的三维引擎，是最著名的3D WebGL JavaScript库之一。它是一个让用户通过JavaScript入手进入搭建WebGL项目的类库。Three.js提供了许多简单易用的API，使得开发者能够更加方便地创建复杂的3D场景。

WebGL是一个只能画点、线和三角形的非常底层的系统。而Three.js则在此基础之上进行了封装，提供了一系列的图形处理功能，如渲染器、相机、灯光、材质等，以及各种几何体、粒子系统等，极大地简化了3D图形编程的难度。这使得学习WebGL需要图形学知识的要求得以降低，因为开发者可以直接通过使用Three.js提供的JS和GLSL两种语言来构建和呈现3D图形。

# 实现具体步骤


首先，我们需要在HTML文件中引入Three.js库。你可以在Three.js官方网站下载最新版本的库，或者直接从CDN获取。将以下代码添加到你的HTML文件的`<head>`部分：

```html
<script src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js"></script>
```

接下来，我们将开始编写JavaScript代码来创建场景、相机、渲染器以及圣诞树的各个部分。首先，我们创建一个场景对象，并设置其背景颜色为深绿色：

```javascript
let scene = new THREE.Scene();
scene.background = new THREE.Color(0x002633);
```

然后，我们创建一个透视相机，并将其位置设置为距离场景中心一定距离的位置。我们还设置了相机的视野范围和纵横比：

```javascript
let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;
```

接下来，我们创建一个WebGL渲染器，并将其大小设置为浏览器窗口的大小。然后，我们将渲染器的DOM元素添加到页面中：

```javascript
let renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
```

现在，我们可以开始创建圣诞树的各个部分了。首先，我们创建一个树干，它是一个圆柱体：

```javascript
let trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 1.6, 8);
let trunk = new THREE.Mesh(trunkGeometry, brownMaterial);
scene.add(trunk);
```

接着，我们创建一个树叶，它是一个圆锥体：

```javascript
let leavesGeometry = new THREE.ConeGeometry(1.2, 2.4, 8);
let leaves = new THREE.Mesh(leavesGeometry, greenMaterial);
leaves.position.y = 1.6;
scene.add(leaves);
```

然后，我们创建彩灯，它们是一些旋转的球体：

```javascript
let lightGeometry = new THREE.SphereGeometry(0.1, 4, 4);
let lights = [];
let colors = [redMaterial, yellowMaterial, new THREE.MeshBasicMaterial({ color: 0x0000ff }), new THREE.MeshBasicMaterial({ color: 0x00ff00 })];
let angles = [0, Math.PI / 3, 2 * Math.PI / 3, Math.PI, 4 * Math.PI / 3, 5 * Math.PI / 3];
for (let i = 0; i < angles.length; i++) {
    let light = new THREE.Mesh(lightGeometry, colors[i % 4]);
    light.position.set(Math.cos(angles[i]) * 0.9, 2.2, Math.sin(angles[i]) * 0.9);
    scene.add(light);
    lights.push(light);
}
```

接下来，我们创建一个星星，它是一些旋转的点：

```javascript
let starGeometry = new THREE.SphereGeometry(0.2, 4, 4);
let star = new THREE.Mesh(starGeometry, yellowMaterial);
star.position.y = 2.7;
scene.add(star);
```

最后，我们创建一个礼物盒，它是一个立方体：

```javascript
let giftGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
let giftMaterials = [
    new THREE.MeshBasicMaterial({ color: 0xff0000 }),
    new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
    new THREE.MeshBasicMaterial({ color: 0x0000ff }),
    new THREE.MeshBasicMaterial({ color: 0xffff00 }),
    new THREE.MeshBasicMaterial({ color: 0xff00ff }),
    new THREE.MeshBasicMaterial({ color: 0x00ffff })
];
let giftMesh = new THREE.Mesh(giftGeometry, giftMaterials);
giftMesh.position.set(0, -1.3, 0);
scene.add(giftMesh);
```

为了给圣诞树增添一些雪花效果，我们还需要创建一个雪花几何体和一个雪花材质，然后将它们组合成一个雪花网格对象，并将其添加到场景中：

```javascript
let snowFlakeGeometry = new THREE.BufferGeometry();
let positions = [];
for (let i = 0; i < 1000; i++) {
    positions.push(Math.random() * 2000 - 1000);
    positions.push(Math.random() * 2000 - 1000);
    positions.push(Math.random() * 2000 - 1000);
}
snowFlakeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
let snowFlakeMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
let snowFlake = new THREE.Points(snowFlakeGeometry, snowFlakeMaterial);
scene.add(snowFlake);
```

最后，我们需要添加一个渲染循环，以便不断地更新场景中的物体并渲染到屏幕上：

```javascript
function animate() {
    requestAnimationFrame(animate);
    trunk.rotation.y += 0.01;
    leaves.rotation.y += 0.01;
    for (let i = 0; i < lights.length; i++) {
        lights[i].rotation.y += 0.02;
    }
    snowFlake.rotation.y -= 0.001;
    renderer.render(scene, camera);
}
animate();
```

这就是如何使用Three.js创建一个完整的圣诞树的全部过程。如果你有女朋友，可以尝试写一个哄女朋友开心一下

最终效果：
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/cc7bb9ccf7fd4116858135cca27fd701~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2916&h=1712&s=144890&e=png&a=1&b=0b2532)

# 所有代码

```html
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="utf-8">
    <title>完整的圣诞树</title>
    <style>
        body { margin: 0; }
        canvas { display: block; }
    </style>
</head>
<body>
<script src="https://threejs.org/build/three.js"></script>
<script >
    // 创建场景
    let scene = new THREE.Scene();

    // 添加背景颜色
    scene.background = new THREE.Color(0x002633);

    // 创建相机
    let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 5;

    // 创建渲染器
    let renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    // 创建材质
    let brownMaterial = new THREE.MeshBasicMaterial({ color: 0x7f4014 });
    let greenMaterial = new THREE.MeshBasicMaterial({ color: 0x006400, transparent: true, opacity: 0.8 });
    let redMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000 });
    let yellowMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });

    // 创建树干
    let trunkGeometry = new THREE.CylinderGeometry(0.2, 0.4, 1.6, 8);
    let trunk = new THREE.Mesh(trunkGeometry, brownMaterial);
    scene.add(trunk);

    // 创建树叶
    let leavesGeometry = new THREE.ConeGeometry(1.2, 2.4, 8);
    let leaves = new THREE.Mesh(leavesGeometry, greenMaterial);
    leaves.position.y = 1.6;
    scene.add(leaves);

    // 创建彩灯
    let lightGeometry = new THREE.SphereGeometry(0.1, 4, 4);
    let lights = [];
    let colors = [redMaterial, yellowMaterial, new THREE.MeshBasicMaterial({ color: 0x0000ff }), new THREE.MeshBasicMaterial({ color: 0x00ff00 })];
    let angles = [0, Math.PI / 3, 2 * Math.PI / 3, Math.PI, 4 * Math.PI / 3, 5 * Math.PI / 3];
    for (let i = 0; i < angles.length; i++) {
        let light = new THREE.Mesh(lightGeometry, colors[i % 4]);
        light.position.set(Math.cos(angles[i]) * 0.9, 2.2, Math.sin(angles[i]) * 0.9);
        scene.add(light);
        lights.push(light);
    }

    // 创建星星
    let starGeometry = new THREE.SphereGeometry(0.2, 4, 4);
    let star = new THREE.Mesh(starGeometry, yellowMaterial);
    star.position.y = 2.7;
    scene.add(star);

    // 创建礼物盒
    let giftGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);
    let giftMaterials = [
        new THREE.MeshBasicMaterial({ color: 0xff0000 }),
        new THREE.MeshBasicMaterial({ color: 0x00ff00 }),
        new THREE.MeshBasicMaterial({ color: 0x0000ff }),
        new THREE.MeshBasicMaterial({ color: 0xffff00 }),
        new THREE.MeshBasicMaterial({ color: 0xff00ff }),
        new THREE.MeshBasicMaterial({ color: 0x00ffff })
    ];
    let giftMesh = new THREE.Mesh(giftGeometry, giftMaterials);
    giftMesh.position.set(0, -1.3, 0);
    scene.add(giftMesh);

    // 添加雪花效果
    let snowFlakeGeometry = new THREE.BufferGeometry();
    let positions = [];
    for (let i = 0; i < 1000; i++) {
        positions.push(Math.random() * 2000 - 1000);
        positions.push(Math.random() * 2000 - 1000);
        positions.push(Math.random() * 2000 - 1000);
    }
    snowFlakeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
    let snowFlakeMaterial = new THREE.PointsMaterial({ color: 0xffffff, size: 2 });
    let snowFlake = new THREE.Points(snowFlakeGeometry, snowFlakeMaterial);
    scene.add(snowFlake);
    

    // 渲染循环
    function animate() {
        requestAnimationFrame(animate);
        trunk.rotation.y += 0.01;
        leaves.rotation.y += 0.01;
        for (let i = 0; i < lights.length; i++) {
            lights[i].rotation.y += 0.02;
        }
        snowFlake.rotation.y -= 0.001;
        renderer.render(scene, camera);
    }
    animate();
</script>
</body>
</html>
```