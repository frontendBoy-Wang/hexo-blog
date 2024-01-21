---
title: 听说你还不知道React18新特性？看我给你整明白！
categories:
  - 前端
cover: ../img/0.png
feature: true
date: 2024-01-21 22:10:31
tags: react 
---


![wallhaven-9m3r9k_3840x2160.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/186a3370c05644129c57e076bd1c47e7~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3840&h=2160&s=11790803&e=png&b=e9e0eb)

# 前言

目前react的最新版本是18.2.0。React 团队在 2022 年 3 月 29 日正式发布了 React 的第 18 个版本 是 React 框架的最新版本，它主要着眼于解决 React 应用在性能、稳定性、开发体验等方面的问题。本文将介绍 React 18 的升级内容、新特性、新的 API、底层逻辑更新等方面的内容，并通过示例展示其使用效果。 我将在这篇文章里简单介绍 React 18 的新特性，React Concurrent Mode（并发模式）的实现，以及简要的升级指南。

# 升级

-   react18 已经不支持IE浏览器
-   新项目： 直接用 `npm` 或者 `yarn` 安装最新版依赖即可（如果是js，可以不需要安装types类型声明文件）
-   改变根节点的挂载方式使用新的 API `createRoot`，使用旧的 API 仍然兼容，只有在使用 `createRoot` 了之后才会有 React 18 的新特性。

```tsx
ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App/>
    </Provider>
  </React.StrictMode>,
)
```

在这个示例中，我们使用了 `ReactDOM.createRoot` 方法创建了一个根节点，并使用 `render` 方法将组件渲染到根节点中。这样可以让 React 应用更快地响应用户操作，提高用户体验。

# react18 setState异步同步

在 React 18 中，`setState` 的行为有一些改变，它将更倾向于以异步方式进行更新，但也提供了一些选项来控制同步更新。下面是关于 React 18 中 `setState` 的异步和同步行为的解释：

## 1.  异步更新（默认行为）：

在 React 18 中，默认情况下，`setState` 方法会以异步方式进行更新。这意味着它会将多个状态更新批量处理，并在适当的时机进行合并和应用，以优化性能。这样做可以减少不必要的重渲染，并提高应用程序的响应性。

```tsx

// 异步更新
this.setState({ count: this.state.count + 1 });
```

## 2.  同步更新（使用 `flushSync`）：

尽管 `setState` 默认以异步方式进行更新，但在某些情况下，您可能需要立即获取更新后的状态。为了实现此目的，React 18 提供了 `flushSync` 方法，可以强制执行同步更新。

```tsx

import { flushSync } from 'react-dom';

// 同步更新

flushSync(() => {

  this.setState({ count: this.state.count + 1 });

});
```

通过使用 `flushSync` 包裹 `setState` 的调用，您可以确保在执行下一个任务之前立即获取到更新后的状态。请注意，使用 `flushSync` 可能会对性能产生影响，并且应谨慎使用，以避免阻塞主线程。

需要注意的是，React 18 引入了一种新的异步渲染优先级机制，称为 `useTransition`。通过使用 `useTransition`，您可以控制异步更新的优先级。这对于在高优先级工作（例如用户交互）和低优先级工作（例如懒加载数据）之间进行平衡非常有用。然而，它不直接影响 `setState` 的异步/同步行为，而是影响更新的优先级。

总结一下，在 React 18 中，`setState` 通常以异步方式进行更新，并且使用 `flushSync` 可以实现同步更新。此外，您还可以使用 `useTransition` 提供的优先级控制来平衡不同任务之间的更新。

# React18 新增API

React 18 是 React 的一个重要版本，它包含了一些新的特性和改进，其中一些会对应用程序的开发流程、性能和用户体验产生重要影响。以下是 React 18 中新增的一些 API：

## 1.  `startTransition`

`startTransition` 是一个新的 React API，旨在帮助开发者优化应用程序的性能和用户体验。这个函数可以告诉 React 在下次重新渲染组件时，应该延迟更新状态。这样，一些较慢的操作（例如异步请求等）就可以在后台执行，不会影响应用程序的交互性能。

```tsx

import { startTransition } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const [results, setResults] = useState([]);

  function handleSearch(event) {

    setSearchTerm(event.target.value);

    startTransition(() => {

      fetch(`/api/search?query=${searchTerm}`)

        .then(response => response.json())

        .then(data => setResults(data));

    });

  }

  return (

    <div>

      <input type="text" value={searchTerm} onChange={handleSearch} />

      <ul>

        {results.map(result => (

          <li key={result.id}>{result.title}</li>

        ))}

      </ul>

    </div>

  );

}
```

在上述代码中，我们使用 `startTransition` 函数将异步请求和状态更新操作包裹起来，以告诉 React 在下一次重新渲染之前应该延迟更新状态。

## 2.  `useTransition`

`useTransition` 是 `startTransition` 的 hook 版本。它可以在函数组件中使用，从而让开发者更方便地控制异步操作的状态。

```tsx

import { useState, useTransition } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  const [results, setResults] = useState([]);

  const [isPending, setIsPending] = useState(false);

  const [startTransition, isPendingTransition] = useTransition({ timeoutMs: 3000 });

  function handleSearch(event) {

    setSearchTerm(event.target.value);

    startTransition(() => {

      setIsPending(true);

      fetch(`/api/search?query=${searchTerm}`)

        .then(response => response.json())

        .then(data => setResults(data))

        .finally(() => setIsPending(false));

    });

  }

  return (

    <div>

      <input type="text" value={searchTerm} onChange={handleSearch} />

      {isPendingTransition ? <p>Loading...</p> : null}

      <ul>

        {results.map(result => (

          <li key={result.id}>{result.title}</li>

        ))}

      </ul>

    </div>

  );

}
```

在上述代码中，我们使用 `useTransition` hook 来控制异步请求的状态，并在加载数据时显示一个 Loading... 的提示信息。

## 3.  `createRoot`

`createRoot` 是一个新的入口函数，用于创建根 React 组件。它可以替代原先的 `ReactDOM.render` 方法，使得开发者可以将多个根节点渲染到一个页面上。

```

import { createRoot } from 'react-dom';

function App() {

  return (

    <div>Hello, world!</div>

  );

}

// 原先的使用方式

ReactDOM.render(<App />, document.getElementById('root'));

// 新的使用方式

const rootElement = document.getElementById('root');

createRoot(rootElement).render(<App />);
```

在上述代码中，我们使用 `createRoot` 函数来创建根 React 组件，并将其渲染到页面上。这样，我们就可以使用多个根节点来构建各种复杂的应用程序界面。

## 4.  `useDeferredValue`

`useDeferredValue` 是一个新的 hook，可以将某个状态值的更新延迟一段时间后再执行，从而提高应用程序的性能和用户体验。

```

import { useState, useDeferredValue } from 'react';

function App() {

  const [searchTerm, setSearchTerm] = useState('');

  function handleSearch(event) {

    setSearchTerm(event.target.value);

  }

  const deferredSearchTerm = useDeferredValue(searchTerm, {

    timeoutMs: 1000

  });

  return (

    <div>

      <input type="text" value={searchTerm} onChange={handleSearch} />

      <p>Search term: {deferredSearchTerm}</p>

    </div>

  );

}
```

在上述代码中，我们使用 `useDeferredValue` hook 将搜索词的更新延迟了一秒钟。这样，用户在快速输入搜索词时，不会因为频繁的重新渲染而出现卡顿等问题。

## 5.  `useTransition`

上面已经提到过了，在 React 18 中新增了 `useTransition` hook，用于帮助开发者控制异步操作的状态。

## 6.  `useMutableSource`

`useMutableSource` 是一个新的 hook，用于获取可变数据源，并可以在多个组件之间共享状态。它可以帮助开发者拆分组件逻辑，并使其更加灵活和可复用。

```tsx

import { useMutableSource } from 'react';

const myDataSource = {

  get: () => ({ count: 0 }),

  subscribe: (handleUpdate) => {

    const intervalId = setInterval(() => {

      handleUpdate({ count: Math.floor(Math.random() * 100) });

    }, 1000);

    return () => clearInterval(intervalId);

  }

};

function Counter() {

  const [dataSource, setDataSource] = useState(() => myDataSource);

  const [count, setCount] = useState(0);

  function handleUpdate(data) {

    setCount(count => count + data.count);

  }

  useEffect(() => {

    const unsubscribe = dataSource.subscribe(handleUpdate);

    return unsubscribe;

  }, [dataSource]);

  return (

    <div>

      <p>Count: {count}</p>

      <button onClick={() => setDataSource(myDataSource)}>Restart</button>

    </div>

  );

}

function App() {

  const [dataSource, setDataSource] = useState(() => myDataSource);

  const [, forceUpdate] = useReducer(x => x + 1, 0);

  function handleRestart() {

    setDataSource(myDataSource);

    forceUpdate();

  }

  const count = useMutableSource(dataSource, ({ count }) => count);

  return (

    <div>

      <p>Count: {count}</p>

      <button onClick={handleRestart}>Restart</button>

    </div>

  );

}
```

在上述代码中，我们使用 `myDataSource` 作为可变数据源，并将其共享到多个组件中。在 `Counter` 组件中，我们订阅了数据源的更新，并实时反映出计数器的变化。在 `App` 组件中，我们使用了 `useMutableSource` hook 来获取数据源的值，从而实现了多组件之间的状态共享。

总而言之，React 18 中引入了许多有用的新特性和 API，包括 `startTransition`、`useTransition`、`createRoot`、`useDeferredValue`、`useMutableSource` 等。这些新特性和 API 可以让开发者更方便地构建高性能、灵活和可复用的 React 应用程序。

# 新增Hooks

React 18 引入了一些新的 hooks，以帮助开发者更好地管理状态和副作用。以下是 React 18 中新增的一些 hooks：

## 1.  `useTransition`

`useTransition` 允许开发者在处理潜在的延迟操作时控制异步更新的优先级。它接受一个配置对象，可以设置超时时间和中断标志等选项。

```tsx

import { useTransition } from 'react';

function MyComponent() {

  const [isPending, startTransition] = useTransition({ timeoutMs: 2000 });

  function handleClick() {

    startTransition(() => {

      // 执行某个需要较长时间的操作

    });

  }

  return (

    <div>

      <button onClick={handleClick}>开始操作</button>

      {isPending && <p>操作进行中...</p>}

    </div>

  );

}
```

在上述代码中，我们使用了 `useTransition` hook 来控制长时间操作的优先级，并在操作进行中显示一个提示信息。

## 2.  `useDeferredValue`

`useDeferredValue` 允许开发者将某个状态的更新推迟到未来的帧中。这对于处理与用户输入相关的操作非常有用，可以避免在频繁输入时产生连续的重渲染。

```tsx

import { useState, useDeferredValue } from 'react';

function MyComponent() {

  const [searchTerm, setSearchTerm] = useState('');

  function handleChange(event) {

    setSearchTerm(event.target.value);

  }

  const deferredSearchTerm = useDeferredValue(searchTerm, {

    timeoutMs: 500

  });

  return (

    <div>

      <input type="text" value={searchTerm} onChange={handleChange} />

      <p>搜索词: {deferredSearchTerm}</p>

    </div>

  );

}
```

在上述代码中，我们使用了 `useDeferredValue` hook 来将搜索词的更新推迟了 500ms。这样，在频繁输入时，只有用户停止输入一段时间后，才会执行搜索操作。

## 3.  `useMutableSource`

`useMutableSource` 允许开发者访问可变的数据源，并在多个组件之间共享状态。这对于高性能的数据订阅和共享非常有用。

```tsx

import { useMutableSource } from 'react';

const myDataSource = {

  get: () => ({ count: 0 }),

  subscribe: (callback) => {

    const interval = setInterval(() => {

      callback({ count: Math.floor(Math.random() * 100) });

    }, 1000);

    return () => clearInterval(interval);

  }

};

function MyComponent() {

  const [, forceUpdate] = useState({});

  const count = useMutableSource(myDataSource, source => source.get());

  function handleRestart() {

    forceUpdate({});

  }

  return (

    <div>

      <p>Count: {count}</p>

      <button onClick={handleRestart}>重启</button>

    </div>

  );

}
```

在上述代码中，我们使用了 `useMutableSource` hook 来获取可变数据源中的值，并在计数器组件中共享该状态。

这些是 React 18 中新增的一些重要 hooks。通过使用这些 hooks，开发者可以更好地管理状态、处理潜在的延迟操作，并实现高性能的数据共享。除了这些新增的 hooks，React 18 也支持其他常用的 hooks，如 `useState`、`useEffect`、`useCallback` 等。

# 严格模式

React 严格模式（Strict Mode）是一个开发模式，可以帮助开发者发现一些潜在的问题，以提高应用程序的质量。启用严格模式后，React 会执行额外的检查和警告，以帮助开发者发现一些常见问题，并尽早地解决它们。

启用 React 严格模式可以通过在代码中添加如下代码实现：

```

import React from 'react';

import ReactDOM from 'react-dom';

ReactDOM.render(

  <React.StrictMode>

    <App />

  </React.StrictMode>,

  document.getElementById('root')

);
```

在上述代码中，我们使用 `React.StrictMode` 组件来包裹应用程序的顶层组件 `<App>`。这样，React 将会在严格模式下执行应用程序，并对常见问题进行检查和提示。

React 严格模式主要包含以下几个方面的检查和提示：

-   识别不安全的生命周期方法，提示开发者修改，这些方法可能会导致意外的副作用或错误。
-   检测意外的副作用，例如：多余的重新渲染、不符合预期的函数调用等。
-   检测某些过时的 API 使用，提供更好的替代方案。
-   检测警告信息，使其更加明显和易于发现。

需要注意的是，React 严格模式只在开发环境下工作，不会影响生产环境下的应用程序。因此，在开发过程中启用严格模式可以帮助开发者及早发现问题，并尽可能将这些问题解决，以提高应用程序的稳定性和质量。

总而言之，React 严格模式是一种非常有用的开发模式，可以帮助开发者发现常见问题并提高应用程序的质量。通过在顶层组件中添加 `<React.StrictMode>` 包裹，我们可以启用严格模式，并享受其带来的好处。

## 如何禁用严格模式

在 React 应用中禁用严格模式可以通过以下两种方式实现：

## 1.  直接移除 `<React.StrictMode>` 组件

最简单的方法是将应用程序顶层组件中的 `<React.StrictMode>` 组件直接移除。这样，React 将不会启用严格模式，也不会执行额外的检查和警告。

```tsx

import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';

ReactDOM.render(

  <App />,

  document.getElementById('root')

);
```

## 2.  在应用程序启动时禁用严格模式

在一些情况下，移除 `<React.StrictMode>` 组件可能不太方便，例如：在大型项目中或已经存在大量的 `console.log` 调用等代码片段。此时，可以在应用程序启动时禁用严格模式。

在应用程序启动文件中，我们可以使用 React 的 `unstable_disableDevMode()` 函数来禁用严格模式：

```tsx

import React from 'react';

import ReactDOM from 'react-dom';

import App from './App';

React.unstable_disableDevMode();

ReactDOM.render(

  <React.StrictMode>

    <App />

  </React.StrictMode>,

  document.getElementById('root')

);
```

在上述代码中，我们在调用 `ReactDOM.render` 之前调用了 `React.unstable_disableDevMode()` 函数，以禁用严格模式。该函数并不在文档中明确提供支持，因此请谨慎使用。

需要注意的是，禁用严格模式可能会导致一些潜在问题无法被及早发现，因此建议仅在必要时使用。同时，需要确保 React 版本兼容性，并遵循最佳实践和安全规则。

# 并发模式

React 并发模式（React Concurrent Mode）是 React 的一项新功能，旨在改善在复杂应用程序中的用户体验和性能。在传统的 React 中，更新组件树时会阻塞用户界面的响应，可能导致卡顿和延迟。而并发模式通过将任务分解为多个小步骤，让 React 在执行渲染和布局时可以中断和恢复任务，从而提供更平滑和响应式的用户体验。

在 React 并发模式中，引入了两个主要概念：任务调度和优先级。任务调度器负责决定哪些任务执行、何时执行以及中断和恢复任务。优先级允许 React 根据任务的紧迫性来安排任务的执行顺序，确保响应度更高的任务能够优先执行。

利用并发模式，React 可以将渲染过程分解为多个小任务，并根据优先级来动态调整任务执行的顺序。这样，在浏览器空闲时间或网络请求等异步操作期间，React 可以暂停当前任务，执行其他具有更高优先级的任务，以实现更爽快的用户交互体验。

总而言之，React 并发模式通过任务调度和优先级机制，提供了更好的用户体验和性能，使得 React 应用程序能够更加平滑地响应用户操作。

以下是一个简单的示例代码，展示了 React Concurrent Mode 的基本用法：

```tsx
import React, { useState, useEffect, unstable_ConcurrentMode as ConcurrentMode } from 'react';


function App() {

  const [count, setCount] = useState(0);

  useEffect(() => {

    const timer = setInterval(() => {

      setCount((prevCount) => prevCount + 1);

    }, 1000);

    return () => {

      clearInterval(timer);

    };

  }, []);

  return (

    <ConcurrentMode>

      <div>

        <h1>计数器</h1>

        <p>{count}</p>

      </div>

    </ConcurrentMode>

  );

}

export default App;
```

在上面的示例中，我们使用了 `unstable_ConcurrentMode` 组件来包裹根元素。这表示该组件下的子组件可以享受到并发模式的好处。

在 `App` 组件中，我们使用了 `useState` 来声明一个状态变量 `count`，并通过 `setCount` 来更新它的值。在 `useEffect` 中，我们使用定时器每秒钟增加 `count` 的值。注意，我们传递了空数组作为第二个参数，表示只在组件挂载时执行一次。

最后，在组件的返回值中，我们使用 `<ConcurrentMode>` 组件包裹了整个应用程序的 UI。这样，React 将会利用并发模式来处理渲染任务，以提供更平滑和响应式的用户体验。

# 服务端渲染

React 18 并没有专门针对服务端渲染（SSR）进行大规模的改进，但它仍然提供了一些与 SSR 相关的 API 和改进。以下是一些我们在 React 18 中可以使用的 SSR 相关功能：

## 1.  `useOpaqueIdentifier`

`useOpaqueIdentifier` 允许开发者生成与数据不相关的、不透明的标识符，并在 SSR 上使用这些标识符来生成唯一的 DOM ID。

```tsx
import { useOpaqueIdentifier } from 'react';

function MyComponent() {
  const id = useOpaqueIdentifier();

  return <div id={`my-component-${id}`}>My component</div>;
}
```

在上述代码中，我们使用了 `useOpaqueIdentifier` hook 来生成一个不透明的标识符，并将其用于组件的 DOM ID 中。由于这个标识符与数据无关，因此在 SSR 上也可以正确地生成唯一的 ID。

## 2.  `ReactDOMServer.renderToStringAsync`
`ReactDOMServer.renderToStringAsync` 允许开发者异步地渲染组件并输出 HTML。这样可以避免在 SSR 期间阻塞主线程，在数据加载和计算时保持响应性。

```tsx
import ReactDOMServer from 'react-dom/server';

async function renderApp(req, res) {
  const app = <MyApp />;
  const html = await ReactDOMServer.renderToStringAsync(app);
  res.send(html);
}
```

在上述代码中，我们使用了 `ReactDOMServer.renderToStringAsync` 方法异步地将 `<MyApp />` 组件渲染为 HTML，并在 Express 中将其发送到客户端。

## 3.  Concurrent Mode
Concurrent Mode 是 React 18 中引入的一个新特性，它通过异步渲染和交互优先级控制等方式提升了应用程序的响应性。在 SSR 中，Concurrent Mode 可以帮助开发者更好地处理异步数据加载和渲染等任务。

```tsx
import { unstable_createRoot } from 'react-dom';

async function renderApp(req, res) {
  const app = <MyApp />;
  const root = unstable_createRoot(document.createDocumentFragment());
  await new Promise(resolve => setTimeout(resolve, 1000)); // 模拟数据加载延迟
  root.render(app);
  const html = ReactDOMServer.renderToString(root);
  res.send(html);
}
```

在上述代码中，我们使用了 `unstable_createRoot` 方法来创建一个 Concurrent Mode 的根节点。在数据加载完成后，我们渲染了应用程序，并将其输出为 HTML。

这些是 React 18 中与 SSR 相关的一些功能和改进。通过使用这些功能，开发者可以更好地处理异步数据加载和渲染，并提升应用程序的响应性。
