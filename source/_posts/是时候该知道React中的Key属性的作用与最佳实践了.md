---
title: 是时候该知道React中的Key属性的作用与最佳实践了
categories:
- react
- 前端
- diff
cover: ../img/21.png
feature: false
date: 2023-5-04 22:46:35
tags: 前端 react diff 虚拟dom
---

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7cf023e3fb9d461081752ba443d2ee45~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1892&h=1050&s=653226&e=png&a=1&b=1b1b1b)


# 前言
在React中，我们常常会遇到需要渲染列表或循环生成组件的场景。为了提高性能和优化用户体验，React引入了一个特殊的属性——key。本文将详细介绍React中key属性的作用、原理，并提供一些最佳实践。

# 一、Key属性的作用
Key属性是React要求使用者在渲染多个组件时提供的一个特殊属性。它的作用主要有以下几个方面：

1. 元素的唯一标识：Key属性用于帮助React识别每个元素的唯一性。React通过key属性来判断当新旧元素对比时，哪些元素需要更新、哪些元素需要重新渲染，从而提高渲染性能。

2. 提高重排性能：在列表或循环生成组件的场景中，如果没有为每个元素指定key属性，React在进行diff算法比较时，会采用遍历比对的方式，导致性能下降。而指定了key属性后，React会通过key值快速定位到新旧元素之间的差异，从而减少不必要的重排操作。

3. 组件状态保持：当组件在重新渲染时，React会优先复用具有相同key值的组件实例，而不是销毁并重新创建一个新的组件实例。这使得在动态列表或条件渲染中保持组件状态成为可能。

# 二、Key属性原理解析
为了更好地理解key属性的工作原理，我们可以简单了解一下React的reconciliation（协调）过程。当React渲染组件时，会创建一个虚拟DOM树，并与之前的虚拟DOM树进行比较，找出差异，并将差异应用到真实的DOM上。

在这个比较过程中，React需要对每个元素进行唯一性判断，以确定是否需要更新该元素。而这个唯一性判断就依赖于key属性。React使用key属性的值来判断元素是否相同。如果两个元素的key相同，React会认为它们是同一个元素，从而复用之前生成的组件实例，减少不必要的重绘操作。

 以下是一个简单的示例代码，展示了在使用key属性的情况下，React如何对比新旧元素，从而实现部分更新：

```javascript
class MyList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      items: [
        { id: 1, text: 'Item 1' },
        { id: 2, text: 'Item 2' },
        { id: 3, text: 'Item 3' },
      ],
    };
  }

  handleClick = () => {
    const newItems = [
      { id: 1, text: 'Item 1' },
      { id: 2, text: 'Item 2 (updated)' },
      { id: 3, text: 'Item 3' },
    ];
    this.setState({ items: newItems });
  };

  render() {
    return (
      <div>
        <ul>
          {this.state.items.map(item => (
            <li key={item.id}>{item.text}</li>
          ))}
        </ul>
        <button onClick={this.handleClick}>Update</button>
      </div>
    );
  }
}
```

在这个例子中，使用了一个简单的数组作为组件的state，每个数组元素包含一个id和text属性。在渲染列表项时，我们使用了每个元素的id作为key属性。

当用户点击“Update”按钮时，我们改变了数组中第二个元素的文本内容，并重新设置state。由于该元素的id没有改变，React会认为它是同一个元素，并且只会更新它的文本内容，而不是重新渲染整个列表。这样就可以大大提高渲染性能，避免不必要的重绘操作。


# 三、Key属性最佳实践
根据对key属性的作用和原理的理解，以下是一些使用key属性的最佳实践建议：

1. 使用唯一且稳定的值：为了确保key属性的有效性，我们应该尽量使用唯一且稳定的值作为key。通常情况下，使用列表中的每个元素的唯一标识（如id）作为key是一个不错的选择。

2. 避免使用索引作为key：在列表或循环渲染场景中，有时会考虑使用索引作为key。然而，这种做法可能导致一些问题，在列表发生变化时，React可能会错误地复用组件实例，导致出现渲染错误或不必要的性能损失。

3. 不要频繁改变key的值：频繁地改变key的值可能会导致React无法正确地复用组件实例，从而降低性能。因此，我们应该尽量避免在组件的生命周期内频繁改变key值。

示例代码：
```jsx
✅
function MyComponent({ items }) {
  return (
    <ul>
      {items.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}

❌
function MyComponent({ items }) {
  return (
    <ul>
      {items.map(（item，index） => (
        <li key={index}>{item.name}</li>
      ))}
    </ul>
  );
}
```

# 总结：
在React中，key属性在列表或循环生成组件时起到了至关重要的作用。通过合理使用key属性，我们可以提高渲染性能、优化用户体验，并保持组件状态的一致性。同时，我们也需要遵循最佳实践，确保key属性的值唯一且稳定，避免索引作为key，并尽量避免频繁改变key的值。希望本文对你理解React中的key属性有所帮助！