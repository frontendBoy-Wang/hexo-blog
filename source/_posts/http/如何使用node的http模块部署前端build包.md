---
title: 如何使用node的http模块部署前端build包
categories:
    - 运维
cover: ../img/60.png
feature: false
date: 2023-2-10 22:46:35
tags: 运维 前端部署 node
---

# 创建简单的静态文件服务器：使用Node.js和HTTP模块

在Web开发中，经常需要搭建一个能够提供静态文件访问的服务器。无论是用于本地开发调试，还是用于部署网站，这都是一个常见的需求。本篇文章将介绍如何使用Node.js和其内置的HTTP模块来创建一个简单的静态文件服务器。

## 准备工作

首先，确保你已经安装了Node.js环境。如果没有安装，可以到Node.js官网（[https://nodejs.org/](https://nodejs.org/)）下载并安装最新版本。

## 代码实现

接下来，我们将通过以下代码来创建一个简单的静态文件服务器：

```javascript
const http = require('http');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    // 省略上面提到的代码，详见下文
});

const port = process.env.PORT || '3030';
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
```

代码解释：我们首先导入了Node.js内置的`http`、`fs`和`path`模块，分别用于创建HTTP服务器、读取文件和处理文件路径。然后使用`http.createServer`方法创建了一个HTTP服务器，并传入了一个回调函数处理请求和响应。接着定义了服务器监听的端口号，并通过`server.listen`方法来启动服务器。

接下来，我们需要完善回调函数中的逻辑，使其能够根据请求的路径返回相应的静态文件内容。以下是完整的代码：

```javascript
// 上面提到的回调函数
const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;
    if (filePath === './') {
        filePath = './index.html';
    }

    // 省略文件类型判断和读取文件的部分，详见下文
});

// 省略端口设置和服务器启动的部分
```

在上面的代码中，我们根据请求的URL构造了文件路径`filePath`，并设置了默认的文件路径为`'./index.html'`。接下来，我们需要根据文件的扩展名来确定其Content-Type，并读取文件内容，然后将文件内容作为响应返回给客户端。具体的文件类型判断和读取文件的部分如下：

```javascript
// 文件类型判断和读取文件的部分
const extname = String(path.extname(filePath)).toLowerCase();
const contentType = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    // ... 其他文件类型的Content-Type
}[extname] || 'application/octet-stream';

fs.readFile(filePath, function (error, content) {
    if (error) {
        if (error.code === 'ENOENT') { // 文件不存在
            fs.readFile('./404.html', function (error, content) {
                res.writeHead(404, {'Content-Type': 'text/html'});
                res.end(content, 'utf-8');
            });
        } else { // 其他错误
            res.writeHead(500);
            res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
            res.end();
        }
    } else { // 文件存在
        res.writeHead(200, {'Content-Type': contentType});
        res.end(content, 'utf-8');
    }
});
```

在上面的代码中，我们首先通过`path.extname`方法获取文件的扩展名，然后根据扩展名确定其Content-Type，并使用`fs.readFile`方法读取文件内容。如果读取文件出现错误，我们会返回相应的状态码和错误信息；如果文件存在，则根据Content-Type设置响应头，并将文件内容返回给客户端。

## 运行服务器

保存以上代码到一个文件（比如`server.js`），然后打开命令行，进入文件所在目录，运行以下命令启动服务器：

```bash
node server.js
```

此时，服务器会在默认端口3030上启动，你可以打开浏览器访问`http://localhost:3030/`来查看效果。如果需要修改端口，可以通过设置环境变量`PORT`来改变监听的端口号，比如：

```bash
PORT=8080 node server.js
```

## 总结

通过本篇文章，我们学习了如何使用Node.js和HTTP模块来创建一个简单的静态文件服务器。这个服务器可以用于提供HTML、CSS、JavaScript等静态文件，在开发调试和部署网站时非常有用。希望这篇文章能够帮助你更好地理解Node.js的HTTP模块以及静态文件服务器的实现原理。

## 完整代码

```javascript
const http = require('http');  // 导入内置的 http 模块
const fs = require('fs');  // 导入内置的文件系统模块
const path = require('path');  // 导入内置的路径处理模块

const server = http.createServer((req, res) => {
    let filePath = '.' + req.url;  // 构造文件路径，以当前目录为根目录
    if (filePath === './') {  // 如果文件路径为根路径
        filePath = './index.html';  // 默认返回 index.html 文件
    }

    const extname = String(path.extname(filePath)).toLowerCase();  // 获取文件的扩展名并转换为小写
    const contentType = {  // 定义不同文件类型对应的 Content-Type
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    }[extname] || 'application/octet-stream';  // 如果找不到对应的 Content-Type，默认使用 application/octet-stream

    fs.readFile(filePath, function (error, content) {  // 读取文件内容的回调函数
        if (error) {  // 如果读取文件出现错误
            if (error.code === 'ENOENT') {  // 如果文件不存在
                fs.readFile('./404.html', function (error, content) {  // 读取 404.html 文件
                    res.writeHead(404, {'Content-Type': 'text/html'});  // 返回状态码和 Content-Type
                    res.end(content, 'utf-8');  // 返回文件内容
                });
            } else {  // 其他错误
                res.writeHead(500);  // 返回状态码 500
                res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');  // 返回错误信息
                res.end();  // 结束响应
            }
        } else {  // 如果文件存在
            res.writeHead(200, {'Content-Type': contentType});  // 返回状态码和对应的 Content-Type
            res.end(content, 'utf-8');  // 返回文件内容
        }
    });

});

const port = process.env.PORT || '3030';  // 设置服务器监听的端口号，默认为 3030
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);  // 在控制台输出服务器启动信息
});
```

## 注意
运行server.js文件，需要把文件放的build目录里面。如果想要放到build目录外面则要更改
这里build的目录设置
```js
let filePath = './build' + req.url;
if (filePath === './build/') {
    filePath = './build/index.html';
}
```