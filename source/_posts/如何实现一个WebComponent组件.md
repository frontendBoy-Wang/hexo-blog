---
title: 如何实现一个WebComponent组件
categories:
- 前端
- js
- html
cover: ../img/17.png
feature: false
date: 2022-11-04 22:46:35
tags: web组件
---

> 作为开发者，我们都知道尽可能多的重用代码是一个好主意。这对于自定义标记结构来说通常不是那么容易 — 想想复杂的 HTML（以及相关的样式和脚本），有时你不得不写代码来呈现自定义 UI 控件，并且如果你不小心的话，多次使用它们会使你的页面变得一团糟。

# 什么是Web Conmponent组件

Web Component 是一套不同的用于构建可重用并封装化的组件化技术，允许你创建可重用的定制元素（它们的功能封装在你的代码之外）并且在你的 web 应用中使用它们。它是由一组标准规范组成的。其中最重要的规范包括 Custom Elements、Shadow DOM、HTML Templates 和 HTML Imports。


Web Components 旨在解决这些问题 — 它由三项主要技术组成，它们可以一起使用来创建封装功能的定制元素，可以在你喜欢的任何地方重用，不必担心代码冲突。
以下参考MDN文档:

-   **Custom element（自定义元素）** ：一组 JavaScript API，允许你定义 custom elements 及其行为，然后可以在你的用户界面中按照需要使用它们。
-   **Shadow DOM（影子 DOM）** ：一组 JavaScript API，用于将封装的“影子”DOM 树附加到元素（与主文档 DOM 分开呈现）并控制其关联的功能。通过这种方式，你可以保持元素的功能私有，这样它们就可以被脚本化和样式化，而不用担心与文档的其他部分发生冲突。
-   **HTML template（HTML 模板）：**  `<template>`  和 `<slot>` 元素使你可以编写不在呈现页面中显示的标记模板。然后它们可以作为自定义元素结构的基础被多次重用。


# 如何创建并且使用web组件的详细步骤和方法
当创建一个 Web Component 组件时，需要执行以下详细步骤：

1.  创建组件类：

    -   使用 JavaScript 或 TypeScript 创建一个类来定义你的组件。
    -   组件类应该继承自 `HTMLElement` 或其子类。这样可以确保你的组件拥有所有标准的 DOM 元素功能和属性。

1.  定义组件模板：

    -   使用 HTML 和 CSS 来定义组件的外观和布局。
    -   可以在组件类中通过 `innerHTML` 或 `template` 属性设置组件的模板。
    -   模板可以包含任何常规的 HTML、CSS 和 JavaScript 代码，用于构建组件的结构和样式。

1.  添加生命周期方法：

    -   生命周期方法是在组件生命周期的不同阶段被调用的特殊方法。

    -   常用的生命周期方法包括：

        -   `connectedCallback()`：当组件被插入到文档中时调用。可以在此方法中执行初始化操作，如添加事件监听器或进行初始渲染。
        -   `disconnectedCallback()`：当组件从文档中移除时调用。可以在此方法中进行清理操作，如移除事件监听器或释放资源。
        -   `attributeChangedCallback(attributeName, oldValue, newValue)`：当组件的属性值发生变化时调用。可以在此方法中处理属性变化的逻辑。

1.  实现组件功能：

    -   在组件类中添加方法和属性，实现组件的功能。
    -   可以使用 JavaScript 或其他库/框架来增强组件的行为。例如，你可以添加事件处理程序、数据绑定逻辑、动态更新组件等。

1.  注册组件：

    -   使用 `customElements.define` 方法将组件类注册为一个自定义元素。
    -   通过调用 `customElements.define(tagName, componentClass)`，将组件类映射到特定的标签名称。
    -   这样，当在 HTML 页面中使用该标签时，浏览器会自动创建组件的实例并进行渲染。

1.  使用组件：

    -   在 HTML 文档中使用组件标签，即可在页面中实例化和展示组件。
    -   在标签中可以添加属性，这些属性可以在组件类中通过 `attributeChangedCallback()` 方法进行捕获和处理。
    

  我这里实现了一个最简单的web Component组件的例子:

  ```js

// 创建组件类
class MyComponent extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
      <div>
        <h1>Hello, Web Component!</h1>
      </div>
    `;
    }
}

// 注册组件
customElements.define('my-component', MyComponent);
 
  ```
  ```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<my-component></my-component>
<script src="index.js"></script>
</body>
</html>
  ```


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/12c4f94e659540d6a355013746e52ce6~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1048&s=218659&e=png&b=313340)

# 总结
Web Component 的优势在于提高了前端开发的模块化程度、可维护性和可重用性。它使得开发者能够更加专注于组件级别的开发，减少了整体页面的复杂度，同时也为跨团队协作和组件库的构建提供了更好的支持。总的来说，Web Component 是现代前端开发中非常重要的一环，有助于构建更加灵活、可靠和可维护的 Web 应用。

  