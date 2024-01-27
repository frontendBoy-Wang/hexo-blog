---
title: 如何使用Vite+React18创建Cesium项目？教你两种方式
categories:
    - react
cover: ../img/40.png
feature: false
date: 2022-7-30 10:46:35
tags:  cesium 
---

# 前言

> 书接上文，上篇文章介绍了[《使用Vite+Vue3创建Cesium项目》](https://juejin.cn/post/7247669025874247735)，感觉还是对很多小伙伴有帮助的，那么这篇文章就介绍一下使用Vite+React18创建Cesium项目。

# 先填一下上一篇文章埋下的坑

控制台会报错这个问题：

`VM19:1 Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.`

解决方法：
设置infoBox：false
```js
const viewer = new Cesium.Viewer('cesiumContainer', {
    infoBox: false
})
```

# 使用viet创建react18项目


`pnpm create vite vite+react18+cesium --template react-ts`

进入项目 `cd vite+react18+cesium`

安装依赖 `pnpm install`

运行项目 `pnpm run dev`


![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a122f1eb9ffa422b8b5dc50a573598c4~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=325749&e=png&a=1&b=242424)

这个就是vite+react18的初始化项目了。下面介绍基于react框架创建cesium项目的两种方式：   
1. 使用cesium的vite插件 `vite-plugin-cesium`
2. 把cesium依赖包放到public文件夹下直接引入

# 第一种方法
## 安装`vite-plugin-cesium`插件

```cmd
npm i cesium vite-plugin-cesium vite -D

yarn add cesium vite-plugin-cesium vite -D
```

## 在vite.config.js文件中配置使用插件

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import cesium from 'vite-plugin-cesium';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(),cesium()],
})
```

## 在App组件中初始化Cesium
首先清除默认样式，把index.css和App.js里面的默认样式都删除掉

然后在App.jsx组件中

```jsx
import * as Cesium from 'cesium'
import './App.css'
import {useEffect} from "react";

function App() {
    
    useEffect(() => {
        // 初始化Cesium
        const viewer = new Cesium.Viewer('cesiumContainer', {
            /*在给cesium使用html2canvas插件加截图保存控件时，提示错误Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.*/
            infoBox: false
        })
    }, [])

    return (
        <div id="cesiumContainer"/>
    );
}

export default App
```

记得设置一下cesiumContainer容器的宽高
App.css
```css
#cesiumContainer{
    width: 100vw;
    height: 100vh;
}
```

然后在运行项目打开浏览器就可以看到🌍地球了

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c323812a2bac492a8aaedfa3d10e0338~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=1915366&e=png&a=1&b=040404)


# 第二种方法

第二种方法就是本地引入，把下载好的cesium依赖包（node_modules里面）复制放到public里面， 然后在index.html里面引入cesium和css文件

```html
<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <script type="text/javascript" src="./public/cesium/Build/Cesium/Cesium.js"></script>

    <link rel="stylesheet" href="./public/cesium/Build/CesiumUnminified/Widgets/widgets.css">

    <title>Vite + React</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```
重要的是这两行
```html
<script type="text/javascript" src="./public/cesium/Build/Cesium/Cesium.js"></script>
<link rel="stylesheet" href="./public/cesium/Build/CesiumUnminified/Widgets/widgets.css">
```
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/16827994e4a846a2ac83e1262e2dc164~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3008&h=1960&s=5817116&e=png&a=1&b=2e2732)

然后同样的，去页面初始化cesium就可以了。

# Cesium初始化的配置项说明
这是用于配置Cesium三维地球应用程序的选项。以下是各个参数的解释：

1. animation：是否显示动画控制器。
2. baseLayerPicker：是否允许用户选择基础图层。
3. fullscreenButton：是否显示全屏按钮。
4. vrButton：是否显示VR按钮。
5. geocoder：是否显示地理编码器，或应该包含哪些Geocoder服务对象。
6. homeButton：是否显示主页按钮。
7. infoBox：是否显示信息框。
8. sceneModePicker：是否显示场景模式选择器。
9. selectionIndicator：是否显示选择指示器。
10. timeline：是否显示时间轴。
11. navigationHelpButton：是否显示导航帮助按钮。
12. navigationInstructionsInitiallyVisible：在初始加载时，是否自动显示导航说明。
13. scene3DOnly：是否禁用2D地图模式。
14. shouldAnimate：是否自动运行动画。
15. clockViewModel：ClockViewModel对象，用于控制时间和动画。
16. selectedImageryProviderViewModel：当前选择的图像提供者。
17. imageryProviderViewModels：可用图像提供者。
18. selectedTerrainProviderViewModel：当前选择的地形提供者。
19. terrainProviderViewModels：可用地形提供者。
20. baseLayer：ImageryLayer对象，用于设置基础图层。
21. terrainProvider：TerrainProvider对象，用于设置地形提供者。
22. terrain：Terrain对象，用于控制地形的外观和行为。
23. skyBox：SkyBox对象，用于控制天空盒的外观和行为。
24. skyAtmosphere：SkyAtmosphere对象，用于控制大气影响的外观和行为。
25. fullscreenElement：全屏元素。
26. useDefaultRenderLoop：是否使用Cesium的默认渲染循环。
27. targetFrameRate：目标帧速率，以帧/秒为单位。
28. showRenderLoopErrors：是否在控制台输出渲染循环错误消息。
29. useBrowserRecommendedResolution：是否使用浏览器建议的分辨率。
30. automaticallyTrackDataSourceClocks：是否自动跟踪数据源时钟。
31. contextOptions：WebGL上下文选项。
32. sceneMode：场景模式（2D、3D或双眼立体）。
33. mapProjection：地图投影类型。
34. globe：Globe对象，用于控制球形地球的外观和行为。
35. orderIndependentTranslucency：是否启用无序透明度。
36. creditContainer：显示版权信息的元素。
37. creditViewport：版权信息元素的视口。
38. dataSources：DataSourceCollection对象，表示要可视化的数据源集合。
39. shadows：是否启用阴影。
40. terrainShadows：地形阴影类型。
41. mapMode2D：2D地图模式下地图行为。
42. projectionPicker：是否显示投影选择器。
43. blurActiveElementOnCanvasFocus：获取焦点时是否模糊当前活动元素。
44. requestRenderMode：渲染模式（RENDER_ONCE、ANIMATE、SCENE2D、SCENE3D和MORPH）。
45. maximumRenderTimeChange：每帧允许的最大渲染时间（毫秒）。
46. depthPlaneEllipsoidOffset：深度平面和椭球体之间的偏移量。
47. msaaSamples：抗锯齿采样级别。

希望可以帮助各位小伙伴在开发web 3D项目的时候有一点帮助