---
title: 一遍就能读懂的WebSocket协议详解
categories:
    - 网络
    - TCP/IP
    - HTTP
cover: ../img/0.png
feature: false
date: 2023-4-04 21:46:35
tags: 网络协议
---

# 什么是WebSocket协议
## 概念
用一句话解释一下:
>WebSocket协议是一种基于TCP的网络协议，用于在客户端和服务器之间建立持久连接，实现全双工通信,它允许服务器主动向客户端推送数据，同时也允许客户端向服务器发送数据。

![wallhaven-z8dg9y_3840x3072.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ea308c0eba2a41a98ade6b1b54afb709~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=3840&h=3072&s=8764720&e=png&b=8d9eb7)

## WebSocket协议的特点
### 1.  较低的开销：  
 WebSocket使用更少的头部信息和保持连接的机制，减少了数据传输的开销。
### 2.  实时性：   
WebSocket提供了实时的、双向的通信机制，可以立即将数据从服务器推送到客户端，实现即时更新。
### 3.  更好的性能：   
WebSocket通过减少每次连接的握手次数和数据包的开销，提高了通信的效率和性能。
### 4.  跨域支持：   
WebSocket协议可以跨域使用，允许不同源的客户端与服务器进行通信。

![image (1).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/53b82c571d1f4aba98a059efdd666990~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1920&h=1080&s=186187&e=png&b=1e222a)

# WebSocket和Http协议的异同
1.  连接方式不同：<br>HTTP协议采用请求-响应模式，每次请求需要建立一个新的连接；而WebSocket协议通过一次握手后，建立起持久连接，可以实现双向通信。
1.  支持的数据类型不同：<br>HTTP协议只能传输文本和二进制数据，而WebSocket协议支持传输任意类型的数据。
1.  头部信息不同：<br>HTTP协议的头部信息较多，包含请求方法、请求头等；WebSocket协议的头部信息相对简洁，只包含必要的信息。
1.  状态码不同：<br>HTTP协议有大量的状态码，表示服务器处理请求的结果；WebSocket协议仅有几个状态码，主要用于表示连接状态和关闭原因。
1.  安全性不同：<br>HTTP协议的通信是明文的，容易被窃听和篡改；WebSocket协议可以使用SSL/TLS协议进行加密，提高了通信的安全性。
2.   数据帧格式不同：<br>WebSocket协议的数据帧格式与HTTP协议的数据包格式不同。WebSocket协议的每个数据帧都包含一个头部和数据部分，头部包含标识数据类型、数据长度等信息；而HTTP协议的请求和响应数据包则包含请求行、请求头和请求体等部分。
1.  通信方式不同：<br>HTTP协议是一种请求-响应式的协议，客户端发送请求，服务器返回响应；而WebSocket协议是一种全双工通信协议，客户端和服务器可以同时发送和接收数据。
1.  适用场景不同：<br>HTTP协议主要用于浏览器与Web服务器之间的通信，常用于请求Web页面、图片、音频、视频等资源；而WebSocket协议主要用于实现实时通信、在线游戏、远程控制等场景。
1.  跨域支持不同：<br>在跨域访问方面，HTTP协议需要使用JSONP、CORS等机制来进行跨域操作；而WebSocket协议可以直接跨域使用，不需要额外的跨域处理。

# websocket是如何和服务端进行连接的


1.  客户端发送 HTTP 请求建立连接：客户端通过发送一个 HTTP 请求给服务器来建立 WebSocket 连接。请求头中包含了一些特殊的字段，如 Upgrade 和 Connection 字段，告诉服务器它希望升级到 WebSocket 连接。
1.  服务器响应握手请求：服务器收到客户端发送的握手请求后，会进行相应的处理并返回一个 HTTP 响应。响应头中同样包含了一些特殊的字段，如 Upgrade 和 Connection 字段，以及一个 Sec-WebSocket-Accept 字段，用于验证请求的合法性。
1.  WebSocket 连接建立成功：客户端收到服务器返回的响应后，会验证响应的合法性。如果验证通过，表示 WebSocket 连接已经成功建立。
1.  双向通信：一旦 WebSocket 连接建立成功，客户端和服务器就可以通过该连接进行双向通信了。客户端可以发送消息给服务器，服务器也可以发送消息给客户端，实现真正的双向通信。
1.  连接关闭：当客户端或服务器决定关闭连接时，可以发送一个特殊的消息，通知对方关闭连接。双方收到关闭消息后，会相应地关闭连接。

需要注意的是，WebSocket 是一种持久化的协议，一旦连接建立成功，它会保持长时间的连接状态，不会像传统的 HTTP 请求那样频繁地建立和关闭连接。这种长连接的特性使得 WebSocket 协议在实时通信场景下具有较好的性能优势。

# WebSocket协议详解
### 构造函数
我们可以使用websocket的构造函数来创建一个websocket对象   
**`WebSocket()`** 构造函器会返回一个 [`WebSocket`] 对象。
```js
let ws =new WebSocket('ws://localhost:8080')
```
WebSocket()参数:
- url:要连接的 URL；这应该是 WebSocket 服务器将响应的 URL。
-  `protocols` 可选: 一个协议字符串或者一个包含协议字符串的数组。这些字符串用于指定子协议，这样单个服务器可以实现多个 WebSocket 子协议（例如，你可能希望一台服务器能够根据指定的协议（`protocol`）处理不同类型的交互）。如果不指定协议字符串，则假定为空字符串。

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34ba8fba53cc4b22b1138b98b252333a~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1024&h=395&s=39604&e=png&b=2b2a2a)

### 常量
| `WebSocket.CONNECTING` | `0`  |
| ---------------------- | ---- |
| `WebSocket.OPEN`       | `1`  |
| `WebSocket.CLOSING`    | `2`  |
| `WebSocket.CLOSED`     | `3`  |

主要表示websocket生命周期的状态码


### 属性
点击Websocket的原型展开就可以看到websocket的所有属性和方法了
-   [`WebSocket.binaryType`]  使用二进制的数据类型连接。
-   [`WebSocket.bufferedAmount`]  只读:未发送至服务器的字节数。
   - [`WebSocket.extensions`]  只读:服务器选择的扩展   
- [`WebSocket.onclose`] 用于指定连接关闭后的回调函数。
-   [`WebSocket.onerror`]  用于指定连接失败后的回调函数。
-   [`WebSocket.onmessage`]  用于指定当从服务器接收到信息时的回调函数。
-   [`WebSocket.onopen`]  用于指定连接成功后的回调函数。
-   [`WebSocket.protocol`] 只读:服务器选择的下属协议。
-   [`WebSocket.readyState`] 只读:当前的链接状态。
-   [`WebSocket.url`]  只读:WebSocket 的绝对路径。

### 方法
websocket主要有两个方法:
- close:关闭当前链接 `WebSocket.close();` 
    -  [`code`] 可选: 一个数字状态码，它解释了连接关闭的原因。如果没有传这个参数，默认使用 1005。[`CloseEvent`] 的允许的状态码见[状态码列表](https://developer.mozilla.org/zh-CN/docs/Web/API/CloseEvent#status_codes) 。
    - [`reason`] 可选:一个人类可读的字符串，它解释了连接关闭的原因。这个 UTF-8 编码的字符串不能超过 123 个字节。
- send: **`WebSocket.send()`**  方法将需要通过 WebSocket 链接传输至服务器的数据排入队列，并根据所需要传输的 data bytes 的大小来增加 `bufferedAmount`的值。若数据无法传输（例如数据需要缓存而缓冲区已满）时，套接字会自行关闭。
    - 参数data:用于传输至服务器的数据。它必须是以下类型之一：
        - [`USVString`] :文本字符串。字符串将以 UTF-8 格式添加到缓冲区，并且 `bufferedAmount` 将加上该字符串以 UTF-8 格式编码时的字节数的值。

         - [`ArrayBuffer`]   你可以使用一有类型的数组对象发送底层二进制数据；其二进制数据内存将被缓存于缓冲区，`bufferedAmount` 将加上所需字节数的值。

        -   [`Blob`]   `Blob` 类型将队列 blob 中的原始数据以二进制中传输。 `bufferedAmount` 将加上原始数据的字节数的值。

        -   [`ArrayBufferView`]  你可以以二进制帧的形式发送任何 JavaScript 类数组对象 其二进制数据内容将被队列于缓冲区中。值 `bufferedAmount` 将加上必要字节数的值。

### 事件
如上面所讲,websocket有一些方法在连接的过程中自动触发
使用 `addEventListener()` 或将一个事件监听器赋值给本接口的 `oneventname` 属性，来监听下面的事件。

-   [`close`] 当一个 `WebSocket` 连接被关闭时触发。 也可以通过 [`onclose`]  属性来设置。

-   [`error`] 当一个 `WebSocket` 连接因错误而关闭时触发，例如无法发送数据时。 也可以通过 [`onerror`]  属性来设置。

-   [`message`] 当通过 `WebSocket` 收到数据时触发。 也可以通过 [`onmessage`] 属性来设置。

-   [`open`] 当一个 `WebSocket` 连接成功时触发。 也可以通过 [`onopen`] 属性来设置。



# 如何使用Websocket协议
- 创建websocket对象
```js
let ws = new WebSocket("ws://localhost:9090");
```

- 调用open方法
```js
ws.onopen = function () {
    console.log("链接成功");
    
};
```

- 调用onmessage,接收数据
```js
ws.onmessage = function (data) {
    console.log('接受服务端数据', data)
        ws.send('hello world')

};
```

- 调用send方法,向服务端发送数据
` ws.send('hello world')`

- 在断开连接的方法中处理错误或者重连
```js
ws.onclose = function (e) {
    console.log('连接已经关闭')
}
ws.onerror = function (e) {
    console.log('连接发生错误')
}
```


# 自己动手封装WebSocket的常用方法功能

```js
export default class WebSocketClient {
    /**
     * 创建一个WebSocket客户端对象。
     *
     * @param {string} url - WebSocket服务器的URL。
     */
    constructor(url) {
        this.url = url; // 保存WebSocket服务器的URL
        this.websocket = null; // WebSocket连接对象
        this.reconnectAttempts = 0; // 重连尝试次数
        this.maxReconnectAttempts = 10; // 最大重连次数
        this.messageHandlers = {}; // 消息处理器
        this.eventHandlers = {}; // 事件处理器
        this.timeoutIds = {}; // 超时定时器ID
    }

    /**
     * 连接WebSocket服务器。
     */
    connect(type, data) {
        this.websocket = new WebSocket(this.url); // 创建WebSocket连接
        this.websocket.binaryType = 'arraybuffer'; // 设置二进制数据类型为ArrayBuffer
        this.websocket.onopen = () => {
            console.log('Websocket connection established.'); // WebSocket连接建立成功
            this.reconnectAttempts = 0; // 重连尝试次数重置
            this.dispatchEvent('open', data); // 分发打开事件
        };
        this.websocket.onmessage = event => {
            const message = event.data instanceof ArrayBuffer ? event.data : JSON.parse(event.data); // 解析收到的消息
            if (message.id && this.timeoutIds[message.id]) { // 收到响应消息时清除超时定时器
                clearTimeout(this.timeoutIds[message.id]);
                delete this.timeoutIds[message.id];
            }
            if (message.type && this.messageHandlers[message.type]) {
                for (let handler of this.messageHandlers[message.type]) {
                    handler(message); // 处理收到的消息
                }
            }
            this.dispatchEvent('message', message); // 分发消息事件
        };
        this.websocket.onerror = error => {
            console.error('Websocket error:', error); // WebSocket错误处理
            this.dispatchEvent('error', error); // 分发错误事件
        };
        this.websocket.onclose = (type, data) => {
            console.log('Websocket connection closed.'); // WebSocket连接关闭
            if (this.reconnectAttempts < this.maxReconnectAttempts) {
                setTimeout(() => {
                    this.connect(); // 重新连接
                    this.reconnectAttempts++;
                }, 2000);
            } else {
                console.error(`Websocket connection failed after ${this.maxReconnectAttempts} attempts.`); // 达到最大重连次数后仍未成功连接
                this.dispatchEvent('close', data); // 分发关闭事件
            }
        };
    }

    /**
     * 发送一个WebSocket消息。
     *
     * @param {object|ArrayBuffer} message - 要发送的消息，可以是JavaScript对象或ArrayBuffer。
     * @param {number} timeout - 超时时间（毫秒），如果在指定时间内没有收到响应，则调用超时处理函数。
     * @param {function} timeoutHandler - 超时处理函数，接收一个参数：要发送的消息对象。
     */
    send(message, timeout, timeoutHandler) {
        if (this.websocket.readyState === WebSocket.OPEN) {
            if (message instanceof ArrayBuffer) {
                this.websocket.send(message); // 发送二进制消息
            } else {
                const messageId = Math.random().toString(36).substr(2, 8); // 生成随机消息ID
                const messageWithId = Object.assign({}, message, {id: messageId}); // 添加消息ID字段
                const data = JSON.stringify(messageWithId); // 将消息对象转换为JSON字符串
                this.websocket.send(data); // 发送消息
                if (timeout) {
                    this.timeoutIds[messageId] = setTimeout(() => {
                        console.warn(`WebSocket request ${messageId} timed out.`); // 超时警告
                        delete this.timeoutIds[messageId]; // 清除超时定时器ID
                        timeoutHandler && timeoutHandler(message); // 调用超时处理函数
                    }, timeout);
                }
            }
        } else {
            console.error('Websocket connection not open, message not sent:', message); // WebSocket连接未打开时无法发送消息
        }
    }

    /**
     * 添加一个WebSocket消息处理器。
     *
     * @param {string} type - 消息类型。
     * @param {function} handler - 处理函数，接收一个参数：消息对象或ArrayBuffer。
     */
    addMessageHandler(type, handler) {
        if (!this.messageHandlers[type]) {
            this.messageHandlers[type] = []; // 若不存在该类型的消息处理器，则初始化为空数组
        }
        this.messageHandlers[type].push(handler); // 添加消息处理函数
    }

    /**
     * 移除一个WebSocket消息处理器。
     *
     * @param {string} type - 消息类型。
     * @param {function} handler - 处理函数。
     */
    removeMessageHandler(type, handler) {
        if (this.messageHandlers[type]) {
            const index = this.messageHandlers[type].indexOf(handler); // 查找处理函数在数组中的索引
            if (index !== -1) {
                this.messageHandlers[type].splice(index, 1); // 移除处理函数
            }
        }
    }

    /**
     * 添加一个WebSocket事件处理器。
     *
     * @param {string} type - 事件类型。
     * @param {function} handler - 处理函数，接收一个参数：事件数据。
     */
    addEventHandler(type, handler) {
        if (!this.eventHandlers[type]) {
            this.eventHandlers[type] = []; // 若不存在该类型的事件处理器，则初始化为空数组
        }
        this.eventHandlers[type].push(handler); // 添加事件处理函数
    }

    /**
     * 移除一个WebSocket事件处理器。
     *
     * @param {string} type - 事件类型。
     * @param {function} handler - 处理函数。
     */
    removeEventHandler(type, handler) {
        if (this.eventHandlers[type]) {
            const index = this.eventHandlers[type].indexOf(handler); // 查找处理函数在数组中的索引
            if (index !== -1) {
                this.eventHandlers[type].splice(index, 1); // 移除处理函数
            }
        }
    }

    /**
     * 分发 WebSocket 事件。
     *
     * @param {string} type - 事件类型。
     * @param {any} data - 事件数据。
     */
    dispatchEvent(type, data) {
        if (this.eventHandlers[type]) {
            for (let handler of this.eventHandlers[type]) {
                handler(data); // 调用事件处理函数
            }
        }
    }
    
/**
 * 发送心跳消息。
 */
sendHeartbeat() {
    const message = { type: 'heartbeat' }; // 心跳消息内容
    const intervalId = setInterval(() => {
        this.send(message,5,(e)=>{
            console.log(e)}); // 发送心跳消息
    }, 1000);
    this.addEventHandler('close', () => {
        clearInterval(intervalId); // 关闭 WebSocket 连接时清除定时器
    });
}
 
}
 
```
我封装的是一个基于原生 JavaScript 的 WebSocket 客户端类的实现。这个类提供了一些方法和事件处理器，可以用于连接 WebSocket 服务器、发送消息、处理接收到的消息和处理 WebSocket 相关的事件。

在这段代码中，WebSocketClient 类有以下主要成员：

-   constructor(url)：构造函数，接收 WebSocket 服务器的 URL，并初始化一些属性，如 WebSocket 连接对象、重连尝试次数等。
-   connect(type, data)：连接 WebSocket 服务器的方法，内部创建 WebSocket 连接，并设置连接建立、消息接收、错误和关闭等事件的处理函数。在连接关闭后，会根据重连尝试次数进行重连。
-   send(message, timeout, timeoutHandler)：发送 WebSocket 消息的方法，可以发送 JavaScript 对象或 ArrayBuffer 类型的消息，并支持设置超时时间和超时处理函数。
-   addMessageHandler(type, handler) 和 removeMessageHandler(type, handler)：添加和移除消息处理器的方法，用于处理特定类型的消息。
-   addEventHandler(type, handler) 和 removeEventHandler(type, handler)：添加和移除事件处理器的方法，用于处理特定类型的事件。
-   dispatchEvent(type, data)：分发 WebSocket 事件的方法，用于触发相应类型的事件处理器。

 这个类封装了 WebSocket 的连接、消息发送和事件处理的逻辑，使得使用者可以更方便地操作 WebSocket 连接，并且支持自定义消息处理和事件处理逻辑。

# 有哪些好用的客户端WebSocket第三方库

1.  **Socket.io-client**：[Socket.io](http://socket.io/) 是一个流行的实时通信库，它提供了客户端 JavaScript 库，可用于在浏览器中与 [Socket.io](http://socket.io/) 服务器建立 WebSocket 连接。它支持自动重连、事件处理等功能，用于构建实时应用非常方便。
1.  **ReconnectingWebSocket**：ReconnectingWebSocket 是一个带有自动重连功能的 WebSocket 客户端库，可以很好地处理网络连接断开和重新连接的情况，适合用于浏览器端的 WebSocket 开发。
1.  **SockJS-client**：SockJS 提供了一个浏览器端的 JavaScript 客户端库，用于与 SockJS 服务器建立连接。它可以在不支持 WebSocket 的浏览器上自动降级到其他传输方式，具有良好的兼容性。
1.  **RxJS WebSocketSubject**：RxJS 是一个流式编程库，它提供了 WebSocketSubject 类，可以将 WebSocket 转换为可观察对象，方便进行响应式编程。
1.  **autobahn.js**：autobahn.js 是一个用于实现 WebSocket 和 WAMP（Web Application Messaging Protocol）的客户端库，在浏览器中可以方便地使用它来与 WAMP 路由进行通信。

这些库都提供了良好的接口封装和功能特性，可以根据项目需求选择适合的库来进行浏览器端的 WebSocket 开发。

# 总结

WebSocket 协议是一种基于 TCP 的应用层协议，它提供了在客户端和服务器之间进行双向通信的能力。相比传统的 HTTP 协议，它具有更低的延迟和更高的实时性。

WebSocket 协议通过建立一条持久化的连接来实现双向通信，从而避免了 HTTP 协议中频繁建立和断开连接的过程，减少了网络开销和服务器的负担。客户端可以发送消息给服务器，服务器也可以发送消息给客户端，实现了真正的双向通信。

在使用 WebSocket 协议时，客户端和服务器会进行一次握手过程，以建立起 WebSocket 连接。握手过程中，客户端会发送一个 HTTP 请求，请求头中包含 Upgrade 和 Connection 字段，告诉服务器它希望升级到 WebSocket 连接。服务器收到请求后会返回一个 HTTP 响应，响应头中包含 Upgrade 和 Connection 字段，以及一个 Sec-WebSocket-Accept 字段，用于验证请求的合法性。握手成功后，客户端和服务器就可以开始使用 WebSocket 协议进行通信了。

WebSocket 协议支持二进制数据和文本数据的传输，开发者可以根据实际需求进行选择。同时，WebSocket 还提供了心跳机制、自动重连等功能，可以提高连接的稳定性和可靠性。

总之，WebSocket 协议在实时通信、游戏、在线聊天等场景中得到了广泛应用，它为 Web 应用提供了更加高效、可靠的双向通信方式。