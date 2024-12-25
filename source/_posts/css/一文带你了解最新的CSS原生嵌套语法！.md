---
title: 一文带你了解最新的CSS原生嵌套语法！
categories:
    - css
cover: ../img/33.png
feature: false
date: 2023-6-10 22:46:35
tags: css
---

![wallhaven-3lrw69.jpg](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/714bff47a0244fa4a4b66e5038ddff78~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3840&h=2160&s=5018148&e=jpg&b=51acc3)
# 前言

>CSS nesting provides the ability to nest one style rule inside another, with the selector of the child rule relative to the selector of the parent rule. Similar behavior previously required a CSS pre-processor.   

>CSS嵌套提供了将一个样式规则嵌套在另一个样式中的能力，子规则的选择器相对于父规则的选择器。类似的行为以前需要CSS预处理器。


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/62c9dc3d4c9946588aee7189229fcade~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3010&h=1718&s=476287&e=png&a=1&b=27221a)


在Web开发中，CSS是一种关键的技术，用于样式化HTML元素。而为了更好地组织和管理样式代码，CSS原生嵌套语法应运而生。本文将带你深入了解CSS原生嵌套语法，探索其用法、特性和优势。

1. 什么是CSS原生嵌套语法？
CSS原生嵌套语法是一种CSS预处理器中常见的语法，它允许我们在样式表中使用嵌套的规则和选择器来组织样式代码。通过嵌套语法，我们可以更清晰地表示元素之间的层级关系，提高代码的可读性和维护性。

2. 基本语法规则
- 选择器嵌套：在嵌套语法中，我们可以使用父元素的选择器作为子元素的前缀，以表示它们之间的层级关系。例如，`ul li`选择器表示选中所有父元素为`ul`的子元素为`li`的元素。
- 属性嵌套：除了选择器嵌套外，我们还可以在嵌套语法中使用属性嵌套。例如，使用`font`属性时，我们可以使用`font-size`、`font-weight`等相关属性来设置字体的样式。这样可以更好地组织和管理属性相关的代码。
- 伪元素嵌套：CSS原生嵌套语法还支持伪元素的嵌套。例如，我们可以使用`::after`伪元素来添加内容，并在其中定义样式。

3. 继承与覆盖
CSS原生嵌套语法具有继承和覆盖的特性。当子元素嵌套在父元素内部时，它会继承父元素的样式属性，从而减少代码的重复性。同时，如果需要覆盖父元素的样式，只需在子元素中重新定义该属性即可。

4. 嵌套选择器的应用
嵌套选择器是CSS原生嵌套语法的一大亮点，它能够帮助我们编写更具可读性和维护性的选择器。通过嵌套选择器，我们可以更准确地选择特定的元素，并避免使用过于具体的选择器。这使得我们的样式表更加简洁和可扩展。

5. 注意事项
在使用CSS原生嵌套语法时，需要注意以下几点：
- 避免过度嵌套：过多的嵌套可能会导致代码难以阅读和理解，应尽量保持嵌套层级的简洁性。
- 选择器优先级：在嵌套语法中，选择器的优先级可能会增加。因此，在编写样式时，需要注意选择器的权重，以避免产生意外的结果。

让我们来看看 CSS 嵌套语法是如何使用的！
从上面的浏览器版本支持来看（我使用的是谷歌浏览器）

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a6780ba0131a4ea1a6b551f56cd546db~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2842&h=1634&s=500093&e=png&a=1&b=242018)
其中淡紫色是部分支持，绿色是完全支持。所以要先查看一下自己的浏览器的版本。
```js
var browserVersion = navigator.userAgent;
console.log(browserVersion);

Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/118.0.0.0 Safari/537.36
```
我的浏览器是118.0.0.0,支持部分特性。


嵌套，就是将一个 CSS 规则放在另一个（嵌套规则）中，子规则的选择器将相对于父规则的选择器。这有利于代码的模块化和可维护性。原来只能在 CSS [预处理器]()中使用的嵌套功能，现在在原生 CSS 中也可以使用。
对比一下原生css嵌套和sass嵌套
```css
main .colortable td {  
  text-align:center;  
}  
  
main .colortable td.c {  
  text-transform:uppercase;  
}  
  
main.colortable td:first-child, table.colortable td:first-child+td {  
  border:1px solid black;  
}  
  
main.colortable th {  
  text-align:center;  
  background:black;  
  color:white;  
}

```
如果使用 CSS 嵌套时，就是这样的：
```css
main.colortable {  
  & td {  
    text-align:center;  
    &.c { text-transform:uppercase }  
    &:first-child, &:first-child + td { border:1px solid black }  
  }  
  & th {  
    text-align:center;  
    background:black;  
    color:white;  
  }  
}
```
使用嵌套不仅消除重复，相关规则的分组还提高了生成的 CSS 的可读性和可维护性。是不是好看多了

# 嵌套的规则
嵌套的规则可以使用嵌套选择器(&)直接引用父规则的匹配元素，或者用相对选择器语法指定后代以外的关系
```css
.a {  
  color: red;  
  
  &:hover {  
    color: blue;  
  }  
}  
  
/* 相当于: */  
  
.a { color: red; }  
.a:hover { color: blue; }
```

```css
.a {  
  color: red;  
  
  + .b {  
    color: blue;  
  }  
}  
  
/* 相当于: */  
  
.a { color: red; }  
.a + .b { color: blue; }
```
# 嵌套选择器
在使用嵌套规则时，必须能够引用父规则匹配的元素。为此，规范中定义了一个新的选择器，即**嵌套选择器**，写为 `&` 。

当在嵌套样式规则的选择器中使用时，嵌套选择器表示与父规则匹配的元素。当在任何其他上下文中使用时，它表示与该上下文中的 :scope 相同的元素。

嵌套选择器可以通过 `:is()` 选择器将其替换为父样式规则的选择器。例如：
```css
a, b {  
  & c { color: blue; }  
}
这就相当于
:is(a, b) c { color: blue; }
```

# 总结
CSS原生嵌套语法是一种用于组织和管理样式代码的强大工具。通过选择器嵌套、属性嵌套和伪元素嵌套等基本语法规则，我们可以更好地表达元素之间的层级关系和样式属性。继承与覆盖的特性使得代码更具灵活性和可维护性。同时，嵌套选择器的应用能够提高选择器的可读性和可扩展性。然而，在使用CSS原生嵌套语法时，需要避免过度嵌套和注意选择器的优先级。通过合理地运用这些技巧，我们能够更高效地编写和维护CSS样式表，提升Web开发的效率。