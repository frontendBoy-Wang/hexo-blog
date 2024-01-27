---
title: deno入门教程
categories: 
   - Deno
cover: ../img/5.png
feature: false
date: 2023-8-04 00:46:35
tags: deno runtime
---

# 下一代JavaScript Runtime
![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11bd6db37c30481e9df5677d13485ee1~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=2648&h=1008&s=370638&e=png&a=1&b=191a1c)



Deno 是一个由 Node.js 的创始人 Ryan Dahl 开发的现代化 JavaScript/TypeScript 运行时环境。它旨在提供安全、简单和高性能的方式来构建 JavaScript 和 TypeScript 应用程序。

以下是 Deno 的一些主要特点：

1.  安全性：与 Node.js 不同，Deno 默认情况下对文件系统、网络和环境变量等访问权限进行了严格的限制。在运行脚本时，用户必须显式地授予这些权限，以确保更高的安全性。
1.  支持 TypeScript：Deno 内置对 TypeScript 的原生支持，无需额外的配置或插件。这意味着您可以直接编写 TypeScript 代码，而无需先进行转换或编译。
1.  单一可执行文件：Deno 可以作为一个单一可执行文件进行分发，无需依赖于外部的运行时环境或包管理器。这使得安装和部署变得非常简单。
1.  内置工具：Deno 包含一些内置的实用工具，如便捷的标准库、调试器和测试运行器，这些使得开发过程更加高效。
1.  支持 ECMAScript 模块：Deno 使用标准的 ECMAScript 模块（ESM）语法进行模块化，无需像在 Node.js 中那样使用 CommonJS 或其他转换工具。
1.  自包含性：Deno 鼓励开发者编写自包含的应用程序，即将所有依赖项打包到一个单独的可执行文件中，从而简化部署和分发过程。

总体来说，Deno 的设计目标是提供一个安全、现代化和易用的 JavaScript/TypeScript 运行时环境，使得开发者能够更轻松地构建高质量的应用程序。

- Secure by default 
- Native support for TypeScript and JSX
- Testing, linting, formatting, and more out of the box
- High performance async I/O with Rust and Tokio
- Backwards compatible with Node.js and npm

以上就是Deno的五大特性：
- 默认情况下安全。
- 本机支持TypeScrip和JSX。
- 测试、布线、格式化以及更多开箱即用功能。
- 使用Rust和Tokio的高性能异步I/O。
- 向后兼容Node.js和NPM。

**文档传送门：**[deno官网](https://link.juejin.cn/?target=https%3A%2F%2Fdeno.land%2F "https://deno.land/")  



# 安装
**终端执行：**  
MacOS: `curl -fsSL https://deno.land/x/install/install.sh | sh`  
Window: `irm https://deno.land/install.ps1 | iex`  
Linux: `curl -fsSL https://deno.land/x/install/install.sh | sh`

```bash
# Shell (Mac, Linux):
$ curl -fsSL https://deno.land/install.sh | sh

# PowerShell (Windows):
$ iwr https://deno.land/install.ps1 -useb | iex

# Homebrew (Mac):
$ brew install deno

# Chocolatey (Windows):
$ choco install deno

# Scoop (Windows):
$ scoop install deno

# Build and install from source using Cargo:
$ cargo install deno --locked

```
## 设置环境变量

mac/linux
```bash
export DENO_INSTALL="/Users/wmq/.deno" 
export PATH="$DENO_INSTALL/bin:$PATH"
```
window   
我的电脑 -> 属性 -> 高级系统设置 -> 高级 -> 环境变量设置，上面用户变量和系统变量都可以配置。



那就需要设置在path的环境变量里添加一条



另一个环境变量就是 DENO_INSTALL了，与Linux一样，通常是$HOME/.deno，比如我的是C:\Users\Administrator.deno，把它的bin目录添加到path中。



验证一下安装是否成功
`deno -V`

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/275a6269de0b4b9089cd18191c3269d3~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=878&h=188&s=143109&e=png&a=1&b=322530)


# Hello World运行
deno不仅仅可以运行javascript，还支持直接运行ts文件
```ts

export function add(a: number, b: number): number {
    return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
    console.log("Add 2 + 3 =", add(2, 3));
}

console.log('hello world')


```


![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e0f33db8823b45d58267a987074991f5~tplv-k3u1fbpfcp-jj-mark:0:0:0:0:q75.image#?w=1522&h=1030&s=1757937&e=png&a=1&b=0d1019)
# deno常用运行命令

和node一样，要查看帮助说明，敲一下demo -h就会出现

```cmd

Usage: deno [OPTIONS] [COMMAND]

Commands:
  run          Run a JavaScript or TypeScript program
  bench        Run benchmarks
  bundle       Bundle module and dependencies into single file
  cache        Cache the dependencies
  check        Type-check the dependencies
  compile      Compile the script into a self contained executable
  completions  Generate shell completions
  coverage     Print coverage reports
  doc          Show documentation for a module
  eval         Eval script
  fmt          Format source files
  init         Initialize a new project
  info         Show info about cache or info related to source file
  install      Install script as an executable
  jupyter      Deno kernel for Jupyter notebooks
  uninstall    Uninstall a script previously installed with deno install
  lsp          Start the language server
  lint         Lint source files
  repl         Read Eval Print Loop
  task         Run a task defined in the configuration file
  test         Run tests
  types        Print runtime TypeScript declarations
  upgrade      Upgrade deno executable to given version
  vendor       Vendor remote modules into a local directory
  help         Print this message or the help of the given subcommand(s)

Options:
      --unstable
          Enable unstable features and APIs
      --unstable-bare-node-builtins
          Enable unstable bare node builtins feature [env:
          DENO_UNSTABLE_BARE_NODE_BUILTINS=]
      --unstable-byonm
          Enable unstable 'bring your own node_modules' feature [env:
          DENO_UNSTABLE_BYONM=]
      --unstable-broadcast-channel
          Enable unstable `BroadcastChannel` API
      --unstable-ffi
          Enable unstable FFI APIs
      --unstable-fs
          Enable unstable file system APIs
      --unstable-kv
          Enable unstable Key-Value store APIs
      --unstable-net
          Enable unstable net APIs
      --unstable-http
          Enable unstable HTTP APIs
      --unstable-worker-options
          Enable unstable Web Worker APIs
      --unstable-cron
          Enable unstable Deno.cron API
  -q, --quiet
          Suppress diagnostic output
  -h, --help
          Print help (see more with '--help')
  -V, --version
          Print version

ENVIRONMENT VARIABLES:
    DENO_AUTH_TOKENS     A semi-colon separated list of bearer tokens and
                         hostnames to use when fetching remote modules from
                         private repositories
                         (e.g. "abcde12345@deno.land;54321edcba@github.com")
    DENO_TLS_CA_STORE    Comma-separated list of order dependent certificate
                         stores. Possible values: "system", "mozilla".
                         Defaults to "mozilla".
    DENO_CERT            Load certificate authority from PEM encoded file
    DENO_DIR             Set the cache directory
    DENO_INSTALL_ROOT    Set deno install's output directory
                         (defaults to $HOME/.deno/bin)
    DENO_REPL_HISTORY    Set REPL history file path
                         History file is disabled when the value is empty
                         (defaults to $DENO_DIR/deno_history.txt)
    DENO_NO_PACKAGE_JSON Disables auto-resolution of package.json
    DENO_NO_PROMPT       Set to disable permission prompts on access
                         (alternative to passing --no-prompt on invocation)
    DENO_NO_UPDATE_CHECK Set to disable checking if a newer Deno version is
                         available
    DENO_V8_FLAGS        Set V8 command line options
    DENO_JOBS            Number of parallel workers used for the --parallel
                         flag with the test subcommand. Defaults to number
                         of available CPUs.
    HTTP_PROXY           Proxy address for HTTP requests
                         (module downloads, fetch)
    HTTPS_PROXY          Proxy address for HTTPS requests
                         (module downloads, fetch)
    NPM_CONFIG_REGISTRY  URL to use for the npm registry.
    NO_COLOR             Set to disable color
    NO_PROXY             Comma-separated list of hosts which do not use a proxy
                         (module downloads, fetch)
```
使用方法大大概是和node差不多的，没有什么上手的难度和负担。


# deno权限


默认情况下，Deno是安全的。因此 Deno 模块没有文件、网络或环境的访问权限，除非您为它授权。在命令行参数中为 deno 进程授权后才能访问安全敏感的功能。 在以下示例中，mod.ts 只被授予文件系统的只读权限。它无法对其进行写入，或执行任何其他对安全性敏感的操作。 deno run --allow-read mod.ts

## 权限列表

以下权限是可用的： 
- -A, --allow-all 允许所有权限，这将禁用所有安全限制。
- --allow-env 允许环境访问，例如读取和设置环境变量。 
- --allow-hrtime 允许高精度时间测量，高精度时间能够在计时攻击和特征识别中使用。
- `--allow-net=<allow-net>` 允许网络访问。您可以指定一系列用逗号分隔的域名，来提供域名白名单。 
- --allow-plugin 允许加载插件。请注意：这是一个不稳定功能。 
- `--allow-read=<allow-read>` 允许读取文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。    
- --allow-run 允许运行子进程。请注意，子进程不在沙箱中运行，因此没有与 deno 进程相同的安全限制，请谨慎使用。 
- `--allow-write=<allow-write>` 允许写入文件系统。您可以指定一系列用逗号分隔的目录或文件，来提供文件系统白名单。

## 权限白名单

Deno 还允许您使用白名单控制权限的粒度。 这是一个用白名单限制文件系统访问权限的示例，仅允许访问 /usr 目录，但它会在尝试访问 /etc 目录时失败。

```bash
$ deno run --allow-read=/usr https://deno.land/std/examples/cat.ts /etc/passwderror: Uncaught PermissionDenied: read access to "/etc/passwd", run again with the --allow-read flag► $deno$/dispatch_json.ts:40:11    at DenoError ($deno$/errors.ts:20:5)    ...
```

改为 `/etc`目录，赋予正确的权限，再试一次： `deno run --allow-read=/etc https://deno.land/std/examples/cat.ts /etc/passwd --allow-write`也一样，代表写入权限。

## 网络访问

```bash
fetch.ts:const result = await fetch("https://deno.land/");
```

这是一个设置 host 或 url 白名单的示例：

```bash
deno run --allow-net=github.com,deno.land fetch.ts
```

如果 fetch.ts 尝试与其他域名建立网络连接，那么这个进程将会失败。 允许访问任意地址：

```bash
deno run --allow-net fetch.ts
```


# 创建deno项目
使用 Deno 开始一个新项目一直非常简单：你只需要一个单独的文件就可以开始了。无需任何配置文件、依赖清单或者构建脚本。

来自其他生态系统的用户通常不习惯这种简单性——他们经常寻找一个工具来生成一个基本的项目结构，并使他们在正确的方向上开始。`deno init` 子命令创建了一个基本的 Deno 项目脚手架。

```bash
$ deno init
✅ 项目已初始化
运行以下命令来开始

  // 运行程序
  deno run main.ts

  // 运行程序并监视文件更改
  deno task dev

  // 运行测试
  deno test

  // 运行基准测试
  deno bench

$ deno run main.ts
Add 2 + 3 = 5

$ deno test
检查文件:///dev/main_test.ts
main_test.ts 执行 1 个测试
addTest ... ok (6ms)

ok | 1 passed | 0 failed (29ms)
```
这个子命令会创建两个文件(`main.ts`和 `main_test.ts`)。这些文件提供了一个编写 Deno 程序和编写测试的基本示例。`main.ts` 文件导出一个 `add` 函数，它将两个数字相加，而 `main_test.ts` 文件包含此函数的一个测试。

你也可以给 `deno init` 指定一个参数来在特定目录中初始化一个项目：

```
$ deno init my_deno_project
✅ 项目已初始化

运行以下命令来开始

  cd my_deno_project

  // 运行程序
  deno run main.ts

  // 运行程序并监视文件更改
  deno task dev

  // 运行测试
  deno test

  // 运行基准测试
  deno bench
```

在创建项目之后会有一个main.ts文件里面有一些示例代码
```ts

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://deno.land/manual/examples/module_metadata#concepts
if (import.meta.main) {
  console.log("Add 2 + 3 =", add(2, 3));
}

```
在 Deno 中，import.meta 对象包含了与模块加载相关的元数据信息。其中，import.meta.main 是一个布尔值，用于指示模块是否被直接执行（即作为入口模块）。如果一个模块被直接执行，则 import.meta.main 的值为 true，否则为 false。


# 导入导出模块
在 Deno 中，导入和导出模块的语法与 Node.js 有一些不同之处。 

### 导入模块

在 Deno 中，要导入其他模块，可以使用类似于 ES 模块的 import 语法。例如：

```javascript
import { someFunction } from './someModule.ts';
```

与 Node.js 不同的是，Deno 默认支持 ES 模块，因此不需要像在 Node.js 中那样使用 `require` 函数。此外，Deno 支持在代码中直接引用 URL 进行远程模块的导入，这是 Node.js 所不具备的特性。

### 导出模块

在 Deno 中，模块的导出方式也与 Node.js 有所不同。在 Deno 中，默认情况下所有声明都是私有的，如果要将某些内容导出，需要使用 `export` 关键字进行显式导出。例如：

```javascript
// someModule.ts
export function someFunction() {
  // ...
}
```

在 Node.js 中，可以使用 `module.exports` 或 `exports` 导出模块内容，而在 Deno 中，使用 `export` 关键字则可以明确指定要导出的内容。

另外，Deno 也支持使用默认导出（default export）的方式，与 Node.js 中的 `module.exports = ...` 以及 `export default ...` 语法类似，但具体的语法细节和使用方式可能会有所不同。

 Deno 中的模块导入导出语法更加符合标准的 ES 模块规范，并且对远程模块的支持更为友好，这是与 Node.js 最主要的区别之一。


# 第三方模块导入
在 Deno 中，您可以使用 ES 模块语法导入第三方依赖。以下是一些常见的导入第三方依赖的方式：

1. 从 URL 导入：您可以直接从公共 URL 导入依赖项。例如：
```javascript
import { serve } from "https://deno.land/std/http/server.ts";
```

2. 从本地文件系统导入：您可以将第三方库下载到本地，并使用相对或绝对路径进行导入。例如：
```javascript
import { serve } from "./path/to/library.ts";
```
请确保您已将第三方库下载到正确的位置并提供正确的路径。

3. 使用 URL 和版本号导入：如果您希望使用特定版本的依赖项，可以在 URL 后添加版本号。例如：
```javascript
import { serve } from "https://deno.land/std@0.100.0/http/server.ts";
```
这将导入 std 库的 0.100.0 版本中的 serve 函数。

4. 使用 import maps 导入：您还可以在 Deno 的 import map 中设置别名来导入第三方依赖项。首先，在项目根目录创建一个名为 `import_map.json` 的文件，然后添加依赖项的别名和 URL。例如：
```json
{
  "imports": {
    "lodash": "https://cdn.skypack.dev/lodash"
  }
}
```
然后，您可以在代码中使用别名导入依赖项：
```javascript
import _ from "lodash";
```
这会将 lodash 库导入为 `_`。

请确保网络连接正常，以便 Deno 能够从指定的 URL 导入依赖项。此外，还要注意您导入的第三方库是否与 Deno 兼容。



# deno.json

在 Deno 中，`deno.json` 是一个用于配置项目的文件，类似于其他项目中常见的 `package.json` 或 `tsconfig.json`。它用于指定 Deno 项目的依赖项、脚本入口点等信息。以下是 `deno.json` 文件可能包含的一些常见配置选项：

1. `"name"`：指定项目的名称。

2. `"main"`：指定项目的主入口文件。

3. `"scripts"`：定义一组脚本命令，以便在项目中运行特定的任务或操作。

4. `"dependencies"`：列出项目所依赖的第三方模块及其版本信息。

5. `"importmap"`：指定 import map 的路径，用于配置模块的别名或重定向。

6. `"permissions"`：指定项目所需的权限，例如文件系统访问、网络访问等。

一个简单的 `deno.json` 文件可能如下所示：
```json
{
  "name": "my-deno-project",
  "main": "main.ts",
  "scripts": {
    "start": "deno run main.ts"
  },
  "dependencies": {
    "lodash": "4.17.21"
  },
  "importmap": "import_map.json",
  "permissions": {
    "net": true,
    "read": true
  }
}
```

 `deno.json` 的具体结构和支持的配置选项可能会根据 Deno 版本的更新而有所变化，因此建议查阅官方文档以获取最新的信息和用法说明。

# Deno和Node的区别
 Deno 和 Node.js 的区别，主要有以下几点：

1. **语言支持**：
   - Node.js 最初是专注于 JavaScript，后来添加了对 TypeScript 的支持。而 Deno 则内置支持 TypeScript，无需额外配置即可直接运行 TypeScript 代码。

2. **包管理**：
   - 在 Node.js 中，使用 npm 或 yarn 等包管理器来安装和管理依赖。而在 Deno 中，模块的导入直接使用 URL，不需要像 Node.js 那样依赖于包管理器。

3. **安全性**：
   - Deno 默认情况下运行在沙盒环境中，只能访问明确授权的文件和网络资源，提供了更强大的安全性保障。而 Node.js 的安全性主要依赖于操作系统权限和开发者的注意。

4. **标准库**：
   - Deno 内置了许多常见的功能，如文件操作、HTTP 服务器等，因此在一定程度上减少了对外部库的依赖。而 Node.js 的核心功能相对较少，需要依赖第三方模块来实现更复杂的功能。

5. **API 设计**：
   - Deno 设计上更加现代化，采用了 Promise 风格的 API，并且避免了回调地狱（Callback Hell）的问题。而 Node.js 在早期主要采用回调函数的方式处理异步操作，后来引入了 Promise 和 async/await。

6. **工具支持**：
   - Deno 内置了一些实用工具，如代码格式化工具（deno fmt）、代码检测工具（deno lint）等，减少了对第三方工具的依赖。而 Node.js 需要依赖外部工具和插件来实现类似的功能。

7. **生态系统**：
   - Node.js 有着庞大的生态系统和成熟的社区支持，拥有丰富的第三方模块和工具。而 Deno 相对来说还比较年轻，生态系统尚在发展阶段，虽然也有一些优秀的模块，但整体规模不及 Node.js。

这些是 Deno 和 Node.js 的一些主要区别，每个运行时环境都有其自身的优势和适用场景。选择使用哪个取决于具体的项目需求、团队技能和偏好等因素。