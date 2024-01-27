---
title: Vue3中使用TailwindCSS
categories:
    - TailwindCSS
cover: ../img/20.png
feature: false
date: 2023-7-10 22:46:35
tags: css
---

# 前言
当谈到前端开发框架时，Tailwind CSS 是一个备受瞩目的选择。它是一款功能强大且灵活的CSS框架，提供了大量的实用工具类，帮助开发者快速构建现代化的用户界面。在本篇技术博客中，我们将深入了解 Tailwind CSS 的主题和使用。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/971e1509103f460bb05594472d86b637~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=600&h=200&s=16629&e=png&a=1&b=0c111f)

Tailwind CSS 是一种流行的现代化 CSS 框架，它提供了一套原子类（Atomic Classes）来构建网页界面，相较于传统的 CSS 框架，如Bootstrap或Foundation，Tailwind CSS 强调基于原子类的方式来构建界面，使得开发者可以更加灵活地组合和定制样式，而无需编写自定义的 CSS。

以下是 Tailwind CSS 的一些重要特点和概念：

1. **原子类**：Tailwind CSS 的核心理念是原子类，它提供了大量的类名，每个类名对应一个特定的样式属性。通过组合这些原子类，开发者可以快速地构建出所需的样式，例如 `bg-red-500` 代表设置背景色为红色，`text-xl` 代表设置文本大小为大号等。

2. **工具类**：除了常见的样式属性外，Tailwind CSS 还提供了丰富的实用工具类，如布局、间距、边框等，这些工具类可以帮助开发者快速地实现响应式设计和布局。

3. **定制化**：Tailwind CSS 提供了丰富的配置选项，允许开发者根据项目需求定制自己的样式，包括颜色、字体、间距等，从而使得每个项目的样式都可以高度定制。

4. **响应式设计**：Tailwind CSS 内置了响应式设计的工具类，使得开发者可以轻松地编写出适配不同屏幕尺寸的样式。

5. **插件系统**：Tailwind CSS 具有强大的插件系统，允许开发者编写定制的插件来扩展框架的功能，例如添加新的样式类或工具类。

总的来说，Tailwind CSS 提供了一种非常灵活的方式来构建网页界面，它与传统的 CSS 框架在思维方式上有很大的区别，更加强调原子化的样式组合和定制化。许多开发者认为使用 Tailwind CSS 可以显著提高开发效率，并且使得样式更加可维护和可预测。

# 安装和配置

要开始使用 Tailwind CSS，首先需要通过 npm 或 yarn 安装它：

```bash
# 使用 npm 安装
npm install tailwindcss

# 使用 yarn 安装
yarn add tailwindcss
```

安装完成后，可以通过运行以下命令来生成默认的配置文件和样式表：

```bash
npx tailwindcss init
```

生成的默认配置文件名为 `tailwind.config.js`，我们可以在其中对颜色、字体、间距等属性进行自定义配置。接下来，需要创建一个 CSS 文件，并导入 Tailwind CSS 的样式：

```css
/* styles.css */
@import 'tailwindcss/base';
@import 'tailwindcss/components';
@import 'tailwindcss/utilities';
```

# 使用实用工具类

Tailwind CSS 提供了丰富的实用工具类，涵盖了各种样式属性。让我们通过一个简单的示例来演示如何使用这些工具类。假设我们要创建一个带有蓝色背景和居中文本的按钮，可以这样写：

```html
<button class="bg-blue-500 text-white font-bold py-2 px-4 rounded">
  Click me
</button>
```

在这个例子中，我们使用了 `bg-blue-500` 类来设置按钮的背景颜色为蓝色，`text-white` 类来设置文本颜色为白色，`font-bold` 类来设置文本加粗，`py-2` 和 `px-4` 类来设置垂直和水平方向上的内边距，`rounded` 类来设置圆角边框。

# 自定义配置

除了使用默认的实用工具类之外，Tailwind CSS 还支持自定义配置。例如，可以修改默认的颜色、字体、间距等属性。让我们在 `tailwind.config.js` 中添加一些自定义配置：

```js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

在这个例子中，我们扩展了颜色配置，添加了一个名为 `primary` 的自定义颜色；同时扩展了字体配置，添加了一个名为 `sans` 的自定义字体。

# 示例

<p align=center><img src="https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/2cc63251f6024aafb465b6f291693109~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3092&h=1726&s=663895&e=png&a=1&b=262626" alt="image.png"  /></p>

```html
<script setup>
</script>

<template>
  <div>
    <div class="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
      <div>
    <span class="inline-flex items-center justify-center p-2 bg-indigo-500 rounded-md shadow-lg">
      <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"></svg>
    </span>
      </div>
      <h3 class="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">Writes Upside-Down</h3>
      <p class="text-slate-500 dark:text-slate-400 mt-2 text-sm">
        The Zero Gravity Pen can be used to write in any orientation, including upside-down. It even works in outer space.
      </p>
    </div>
  </div>
</template>

<style scoped>

</style>
```

# 结语

总结一下，Tailwind CSS 是一个强大而灵活的前端开发框架，通过提供丰富的实用工具类，帮助开发者快速构建现代化的用户界面。它的无样式预设和可定制配置使得开发者能够更好地控制样式，并与其他前端工具和框架无缝集成。如果你正在寻找一种新的方式来开发 Web 应用程序，不妨尝试一下 Tailwind CSS。

通过以上介绍，相信你已经对 Tailwind CSS 有了初步的了解。希望这篇技术博客能够帮助你更好地掌握和应用 Tailwind CSS，为你的下一个项目带来便利和高效！