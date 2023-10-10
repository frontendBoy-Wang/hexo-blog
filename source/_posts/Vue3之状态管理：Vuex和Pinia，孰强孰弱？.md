---
title: 再遇vue之vue3新特性
categories:
    - 前端
cover: ../img/74.jpeg
feature: true
date: 2023-10-10 19:14:01
tags: Pinia Vuex
---


![4-wallhaven-0q7geq.jpg](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a35ba51a593a4558811b005fc02089ef~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1700&h=1063&s=420599&e=jpg&b=350e0a)

# 什么状态管理
在介绍Vuex和Pinia之前，我们有必要先了解一下什么是状态管理。

在前端开发中，状态管理器是一种用于管理应用程序全局状态的工具。它通常用于大型应用程序，可以帮助开发者更好地组织和管理状态，并提供一些强大的工具来简化状态的变更和使用。

# 前端常用的状态管理库
以下是几个常见的前端状态管理器：

> 1. Redux：Redux 是 React 生态系统中最流行的状态管理库之一。它使用单向数据流、纯函数和不可变数据结构来管理状态。Redux 提供了一个存储所有状态的全局 store，并使用 actions 和 reducers 来修改和处理状态的变更。Redux 还具有强大的工具和插件支持，可以帮助开发者调试和优化应用程序。
>
> 2. MobX：MobX 是一种响应式状态管理库，可以自动追踪状态的变化并触发更新。它提供了一些装饰器和 API，可以将普通的 JavaScript 对象转换为响应式对象，从而实现状态的管理和共享。与 Redux 不同，MobX 的数据流是双向的，允许直接修改状态并触发更新。
>
> 3. VueX：VueX 是 Vue.js 官方提供的状态管理库。它基于 Flux 架构模式，提供了一个中央状态存储器来管理应用程序中的状态。VueX 可以通过 mutations、actions 和 getters 等概念来修改和处理状态的变更，同时具有强大的工具和插件支持。
>
> 4. Pinia 是 Vue 的专属状态管理库，它允许你跨组件或页面共享状态。如果你熟悉组合式 API 的话，你可能会认为可以通过一行简单的 `export const state = reactive({})` 来共享一个全局状态。对于单页应用来说确实可以，但如果应用在服务器端渲染，这可能会使你的应用暴露出一些安全漏洞。 而如果使用 Pinia，即使在小型单页应用中，你也可以获得如下功能：
     >
     >     -   Devtools 支持
               >         -   追踪 actions、mutations 的时间线
>         -   在组件中展示它们所用到的 Store
>         -   让调试更容易的 Time travel
>     -   热更新
          >         -   不必重载页面即可修改 Store
>         -   开发时可保持当前的 State
>     -   插件：可通过插件扩展 Pinia 功能
>     -   为 JS 开发者提供适当的 TypeScript 支持以及**自动补全**功能。
>     -   支持服务端渲染

无论选择哪种状态管理器，都应该根据项目的需求和特点进行权衡。对于小型应用或组件级别的状态管理，也可以使用一些轻量级的状态管理方案，如 React Hooks 中的 useState、useReducer 等。重要的是要保持状态的一致性和可维护性，以便在应用程序不断变化和扩展时保持代码的清晰和可读性。

而我们今天要介绍的就是vue生态系统中的Vuex和pinia这两个状态管理器的异同，优劣和应用场景


# Vuex

vuex这个我相信这个就不用我过多介绍了，凡是用过vue的开发者应该没有不知道这个的，vue3之前一般都是用的vuex这个库作为vue项目的状态管理。

Vuex 是一个专为 Vue.js 应用程序开发的**状态管理模式 + 库**。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

目前vuex的最新版本是4.1.0,可以用于vue3的项目，vue2的项目是用vuex 3.x.x的版本。

要想掌握vuex就必须要了解vuex的5个核心概念：**State,Getter,Mutation,Action,Module**

vue的单向数据流状态管理包含以下几个部分：

-   **状态**，驱动应用的数据源；
-   **视图**，以声明方式将**状态**映射到视图；
-   **操作**，响应在**视图**上的用户输入导致的状态变化。

以下是一个表示“单向数据流”理念的简单示意：   
简单来说就是数据驱动视图更新，这在单文件组件里面是没有问题的，但是，当我们的应用遇到**多个组件共享状态**时，单向数据流的简洁性很容易被破坏

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0c86965f8864d7eb92c5a148b3aa657~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1280&h=866&s=56870&e=png&b=ffffff)

因此，我们为什么不把组件的共享状态抽取出来，以一个全局单例模式管理呢？在这种模式下，我们的组件树构成了一个巨大的“视图”，不管在树的哪个位置，任何组件都能获取状态或者触发行为！

通过定义和隔离状态管理中的各种概念并通过强制规则维持视图和状态间的独立性，我们的代码将会变得更结构化且易维护。


![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53f2fed95cc043c6af5dbc6a0078dde8~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=701&h=551&s=33966&e=png&b=ffffff)

如何下载安装vuex我就不讨论了，直接去看vuex的官方文档即可。

主要是看vuex的的用法和功能

下面是一个简单的 Vuex 示例代码，包括了 State、Getter、Mutation 和 Action 的使用：

```javascript
// store.js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 0
  },
  getters: {
    doubleCount: state => state.count * 2
  },
  mutations: {
    increment: state => state.count++,
    decrement: state => state.count--
  },
  actions: {
    asyncIncrement: ({ commit }) => {
      setTimeout(() => {
        commit('increment')
      }, 1000)
    }
  }
})

export default store
```

在上述代码中，我们首先引入了 Vue 和 Vuex。然后创建了一个 Store 实例，其中定义了 State、Getter、Mutation 和 Action。

State 中包含了一个名为 count 的数据，用于统计点击次数。

Getter 定义了一个名为 doubleCount 的 Getter，用于获取 count 的两倍。

Mutation 定义了两个 Mutation，分别用于增加和减少 count。

Action 定义了一个名为 asyncIncrement 的 Action，用于异步增加 count。在这个 Action 中，我们通过 setTimeout 来模拟异步操作，并在 1 秒后触发 Increment Mutation。

最后，我们将 Store 导出，可以在 Vue 组件中通过 this.$store 访问到这个 Store。

下面是一个简单的组件示例，演示如何在组件中使用 Vuex 状态管理：

```js
<template>
  <div>
    <h2>Count: {{ count }}</h2>
    <h2>Double Count: {{ doubleCount }}</h2>
    <button @click="increment">Increment</button>
    <button @click="decrement">Decrement</button>
    <button @click="asyncIncrement">Async Increment</button>
  </div>
</template>

<script>
export default {
  computed: {
    count() {
      return this.$store.state.count
    },
    doubleCount() {
      return this.$store.getters.doubleCount
    }
  },
  methods: {
    increment() {
      this.$store.commit('increment')
    },
    decrement() {
      this.$store.commit('decrement')
    },
    asyncIncrement() {
      this.$store.dispatch('asyncIncrement')
    }
  }
}
</script>
```

在上述代码中，我们通过 computed 属性来获取 State 和 Getter，并通过 methods 属性来触发 Mutation 和 Action。注意，在触发 Mutation 时使用 $store.commit，而在触发 Action 时使用 $store.dispatch。


使用`this.$store.state.count`获取vuex中的状态。
当一个组件需要获取多个状态的时候，将这些状态都声明为计算属性会有些重复和冗余。为了解决这个问题，我们可以使用 `mapState` 辅助函数帮助我们生成计算属性，

```js

// 在单独构建的版本中辅助函数为 Vuex.mapState
import { mapState } from 'vuex'

export default {
  // ...
  computed: mapState({
    // 箭头函数可使代码更简练
    count: state => state.count,

    // 传字符串参数 'count' 等同于 `state => state.count`
    countAlias: 'count',

    // 为了能够使用 `this` 获取局部状态，必须使用常规函数
    countPlusLocalState (state) {
      return state.count + this.localCount
    }
  })
}

```
# Getter
Vuex 允许我们在 store 中定义“getter”（可以认为是 store 的计算属性）。就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。

`mapGetters` 辅助函数仅仅是将 store 中的 getter 映射到局部计算属性
```js
import { mapGetters } from 'vuex'

export default {
  // ...
  computed: {
  // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter',
      // ...
    ])
  }
}
```

# Mutation
更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的**事件类型 (type)**和一个**回调函数 (handler)** 。这个回调函数就是我们实际进行状态更改的地方，并且它会接受 state 作为第一个参数
使用mutation修改vuex中的数据有几点需要注意：
- 使用this.$store.commit
- **mutation 必须是同步函数**

或者使用 **mapMutations**辅助函数代替this.$store.commit
```js
import { mapMutations } from 'vuex'

export default {
  // ...
  methods: {
    ...mapMutations([
      'increment', // 将 `this.increment()` 映射为 `this.$store.commit('increment')`

      // `mapMutations` 也支持载荷：
      'incrementBy' // 将 `this.incrementBy(amount)` 映射为 `this.$store.commit('incrementBy', amount)`
    ]),
    ...mapMutations({
      add: 'increment' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
```


# Action
Action 类似于 mutation，不同在于：
-   Action 提交的是 mutation，而不是直接变更状态。
-   Action 可以包含任意异步操作。


Action 通过 `store.dispatch` 方法触发:
```js
store.dispatch('increment')
```
# Modules
vuex还有一个比较好用的地方就是当store里面的状态多了，就会变得臃肿，这时候就可以用modules可以分模块进行管理
Vuex 允许我们将 store 分割成**模块（module）** 。每个模块拥有自己的 state、mutation、action、getter、甚至是嵌套子模块——从上至下进行同样方式的分割

```js
const moduleA = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... },
  getters: { ... }
}

const moduleB = {
  state: () => ({ ... }),
  mutations: { ... },
  actions: { ... }
}

const store = new Vuex.Store({
  modules: {
    a: moduleA,
    b: moduleB
  }
})

store.state.a // -> moduleA 的状态
store.state.b // -> moduleB 的状态
```


就是类似这种，模块里面还可以嵌套子模块。如果希望你的模块具有更高的封装度和复用性，你可以通过添加 `namespaced: true` 的方式使其成为带命名空间的模块。当模块被注册后，它的所有 getter、action 及 mutation 都会自动根据模块注册的路径调整命名。具体的可以去查看vuex的文档

在 store 创建**之后**，你可以使用 `store.registerModule` 方法注册模块：
```js
import Vuex from 'vuex'

const store = new Vuex.Store({ /* 选项 */ })

// 注册模块 `myModule`
store.registerModule('myModule', {
  // ...
})
// 注册嵌套模块 `nested/myModule`
store.registerModule(['nested', 'myModule'], {
  // ...
})
```
之后就可以通过 `store.state.myModule` 和 `store.state.nested.myModule` 访问模块的状态。

以上就vuex的大概内容。是不是比较简单？接下来还有更简单的，那就是Pinia

Pinia [起始](https://github.com/vuejs/pinia/commit/06aeef54e2cad66696063c62829dac74e15fd19e)于 2019 年 11 月左右的一次实验，其目的是设计一个拥有[组合式 API](https://github.com/vuejs/composition-api) 的 Vue 状态管理库。


<p align=center><img src="https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fee643838ca949a58dc524fe43a5ac91~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=319&h=477&s=81617&e=png&a=1&b=ffe062" alt="image.png"  /></p>
pinia的logo是一个菠萝，我也不知道到底是菠萝还是凤梨。我就叫它菠萝吧。


# store
Store (如 Pinia) 是一个保存状态和业务逻辑的实体，它并不与你的组件树绑定。换句话说，**它承载着全局状态**。它有点像一个永远存在的组件，每个组件都可以读取和写入它。它有**三个概念**，[state](https://pinia.vuejs.org/zh/core-concepts/state.html)、[getter](https://pinia.vuejs.org/zh/core-concepts/getters.html) 和 [action](https://pinia.vuejs.org/zh/core-concepts/actions.html)，我们可以假设这些概念相当于组件中的 `data`、 `computed` 和 `methods`。

对比vuex，pinia只有3个核心概念：state,getter,action.是不是要更简单一点了呢。

那就看看Pinia是怎么来管理全局状态的吧。

# Store
Store 是用 `defineStore()` 定义的，它的第一个参数要求是一个**独一无二的**名字
```js
import { defineStore } from 'pinia'

// 你可以对 `defineStore()` 的返回值进行任意命名，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。(比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useAlertsStore = defineStore('alerts', {
  // 其他配置...
})

```
这个**名字** ，也被用作 *id* ，是必须传入的， Pinia 将用它来连接 store 和 devtools。为了养成习惯性的用法，将返回的函数命名为 *use...*  是一个符合组合式函数风格的约定。

`defineStore()` 的第二个参数可接受两类值：Setup 函数或 Option 对象。
setup就是组合式API的写法，Option就是选项式API的写法，和vuex的写法差不多


### Option 对象写法
```js
export const useCounterStore = defineStore('counter', {
  state: () => ({ count: 0 }),
  getters: {
    double: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++
    },
  },
})
```
### setup 写法

```js

export const useCounterStore = defineStore('counter', () => {
  const count = ref(0)
  function increment() {
    count.value++
  }

  return { count, increment }
})
```

两种写法都差不多，就看自己喜欢哪个了。

如何使用store？
在组件中，直接导入使用就行
```js

<script setup>
import { useCounterStore } from '@/stores/counter'
// 可以在组件中的任意位置访问 `store` 变量 ✨
const store = useCounterStore()
</script>
```
为了从 store 中提取属性时保持其响应性，你需要使用 `storeToRefs()`

```js
<script setup>
import { storeToRefs } from 'pinia'
const store = useCounterStore()
// `name` 和 `doubleCount` 是响应式的 ref
// 同时通过插件添加的属性也会被提取为 ref
// 并且会跳过所有的 action 或非响应式 (不是 ref 或 reactive) 的属性
const { name, doubleCount } = storeToRefs(store)
// 作为 action 的 increment 可以直接解构
const { increment } = store
</script>
```


# State

对state的操作无非就是访问，重置，变更，替换，订阅

#### 访问
```js
const store = useStore(); 
store.count++;
```
#### 重置
直接调用reset()方法
```js
const store = useStore()

store.$reset()
```

#### 修改state的值
如果只改变一个属性的值，可以直接变更`store.count=111`

如果是要同事变更多个值，可以使用`store.$patch()`方法

```js
store.$patch({
  count: store.count + 1,
  age: 120,
  name: 'DIO',
})
//或者
store.$patch((state) => { state.items.push({ name: 'shoes', quantity: 1 }) state.hasChanged = true })
```

#### 替换state
你**不能完全替换掉** store 的 state，因为那样会破坏其响应性。但是，你可以 *patch* 它。

```js
// 这实际上并没有替换`$state`
store.$state = { count: 24 }
// 在它内部调用 `$patch()`：
store.$patch({ count: 24 })
```
你也可以通过变更 `pinia` 实例的 `state` 来设置整个应用的初始 state。
`pinia.state.value = {}`

#### 订阅state的变化
类似于 Vuex 的 [subscribe 方法](https://vuex.vuejs.org/zh/api/index.html#subscribe)，你可以通过 store 的 `$subscribe()` 方法侦听 state 及其变化。比起普通的 `watch()`，使用 `$subscribe()` 的好处是 *subscriptions* 在 *patch* 后只触发一次

```js
cartStore.$subscribe((mutation, state) => {
  // import { MutationType } from 'pinia'
  mutation.type // 'direct' | 'patch object' | 'patch function'
  // 和 cartStore.$id 一样
  mutation.storeId // 'cart'
  // 只有 mutation.type === 'patch object'的情况下才可用
  mutation.payload // 传递给 cartStore.$patch() 的补丁对象。

  // 每当状态发生变化时，将整个 state 持久化到本地存储。
  localStorage.setItem('cart', JSON.stringify(state))
})
```

# Getter
Getter 完全等同于 store 的 state 的[计算值](https://cn.vuejs.org/guide/essentials/computed.html)。可以通过 `defineStore()` 中的 `getters` 属性来定义它们。**推荐**使用箭头函数，并且它将接收 `state` 作为第一个参数
```js
export const useStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
})
```
可以使用this访问整个store实例。
this.doubleCount+1访问其他的getter
# Action

Action 相当于组件中的 [method](https://v3.vuejs.org/guide/data-methods.html#methods)。它们可以通过 `defineStore()` 中的 `actions` 属性来定义
```js
export const useCounterStore = defineStore('main', {
  state: () => ({
    count: 0,
  }),
  actions: {
    increment() {
      this.count++
    },
    randomizeCounter() {
      this.count = Math.round(100 * Math.random())
    },
  },
})
```
类似 [getter](https://pinia.vuejs.org/zh/core-concepts/getters.html)，action 也可通过 `this` 访问**整个 store 实例**，并支持**完整的类型标注(以及自动补全✨)** 。**不同的是，`action` 可以是异步的**，你可以在它们里面 `await` 调用任何 API，以及其他 action！下面是一个使用 [Mande](https://github.com/posva/mande) 的例子。

```js
import { mande } from 'mande'

const api = mande('/api/users')

export const useUsers = defineStore('users', {
  state: () => ({
    userData: null,
    // ...
  }),

  actions: {
    async registerUser(login, password) {
      try {
        this.userData = await api.post({ login, password })
        showTooltip(`Welcome back ${this.userData.name}!`)
      } catch (error) {
        showTooltip(error)
        // 让表单组件显示错误
        return error
      }
    },
  },
})
```




## [Pinia与 Vuex 的比较](https://pinia.web3doc.top/introduction.html#%E4%B8%8E-vuex-%E7%9A%84%E6%AF%94%E8%BE%83)

Pinia 最初是为了探索 Vuex 的下一次迭代会是什么样子，结合了 Vuex 5 核心团队讨论中的许多想法。最终，我们意识到 Pinia 已经实现了我们在 Vuex 5 中想要的大部分内容，并决定实现它 取而代之的是新的建议。

与 Vuex 相比，Pinia 提供了一个更简单的 API，具有更少的规范，提供了 Composition-API 风格的 API，最重要的是，在与 TypeScript 一起使用时具有可靠的类型推断支持。

### [RFC](https://pinia.web3doc.top/introduction.html#rfc)

虽然 Vuex 通过 RFC 从社区收集尽可能多的反馈，但 Pinia 没有。 我根据我开发应用程序、阅读其他人的代码、为使用 Pinia 的客户工作以及在 Discord 上回答问题的经验来测试想法。 这使我能够提供一种适用于各种情况和应用程序大小的有效解决方案。 我经常发布并在保持其核心 API 不变的同时使库不断发展。

### [与 Vuex 3.x/4.x 的比较](https://pinia.web3doc.top/introduction.html#%E4%B8%8E-vuex-3-x-4-x-%E7%9A%84%E6%AF%94%E8%BE%83)

> Vuex 3.x 是 Vuex 的 Vue 2 而 Vuex 4.x 是 Vue 3

Pinia API 与 Vuex ≤4 有很大不同，即：

-   *mutations* 不再存在。他们经常被认为是 ***非常* 冗长**。他们最初带来了 devtools 集成，但这不再是问题。
-   无需创建自定义复杂包装器来支持 TypeScript，所有内容都是类型化的，并且 API 的设计方式尽可能利用 TS 类型推断。
-   不再需要注入、导入函数、调用函数、享受自动完成功能！
-   无需动态添加 Store，默认情况下它们都是动态的，您甚至都不会注意到。请注意，您仍然可以随时手动使用 Store 进行注册，但因为它是自动的，您无需担心。
-   不再有 *modules* 的嵌套结构。您仍然可以通过在另一个 Store 中导入和 *使用* 来隐式嵌套 Store，但 Pinia 通过设计提供平面结构，同时仍然支持 Store 之间的交叉组合方式。 **您甚至可以拥有 Store 的循环依赖关系**。
-   没有 *命名空间模块*。鉴于 Store 的扁平架构，“命名空间” Store 是其定义方式所固有的，您可以说所有 Store 都是命名空间的。


以上就是vuex和pinia的全部介绍了。我个人觉得如果是vue2或者以前的老项目那就用vuex，如果是vue3的新项目那就用pinia，当然这也不是绝对的，更多的还是要具体情况具体分析的。
我个人觉得pinia相比于vuex在使用角度来说，是要更加简洁方便一点的

![1-wallhaven-p2zq23.png](https://img-blog.csdnimg.cn/img_convert/5fd0325787f60556ed8289ed3cca16b1.png)