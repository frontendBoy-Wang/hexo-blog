---
title: Flutter开发环境的搭建
categories:
  - 技术
  - 环境搭建
  - Flutter
cover: ../img/2.jpeg
feature: false
date: 2023-09-04 22:46:35
tags: Flutter 跨平台 dart 环境搭建
---


![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/06f1ab08f5af4cebad7181e5d838d910~tplv-k3u1fbpfcp-watermark.image?)
### 文章目录

-   [flutter SDK](https://editor.csdn.net/md?not_checkout=1&articleId=123113604#flutter_SDK_1)
-   [Android Studio](https://editor.csdn.net/md?not_checkout=1&articleId=123113604#Android_Studio_29)
-   [最简单的创建流程](https://editor.csdn.net/md?not_checkout=1&articleId=123113604#_45)
    -   [常用命令](https://editor.csdn.net/md?not_checkout=1&articleId=123113604#_55)
    -   [在真机安装联调](https://editor.csdn.net/md?not_checkout=1&articleId=123113604#_81)

# []()flutter SDK

1.  官网下载最新的SDK `https://flutter.cn/docs/get-started/install/windows`
1.  解压到你需要安装的目录，解压就是安装了

<!---->

3. 配置环境变量（**很重要**）

<!---->
4. **你自己的路径\flutter\bin**
    1. **export** **PUB_HOSTED_URL** **=** **https://pub.flutter-io.cn**
    3.  **export** **FLUTTER_STORAGE_BASE_URL** **=** **https://storage.flutter-io.cn**
    3.  **配置ANDROID_HOME的环境变量**
4.   **你自己选择的路径\androidSDK**

<!---->

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/17e5c388b50441beb7dc26900cb191a3~tplv-k3u1fbpfcp-zoom-1.image)
6. dart SDK在 flutter/bin/cache/dart-sdk
# 检测环境搭建是否成功

终端运行`flutter doctor`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3101d8d7399f402b82eaaee2d6b8bb14~tplv-k3u1fbpfcp-zoom-1.image)
# []()Android Studio

1.  官网下载 `https://developer.android.google.cn/studio`
1.  按照安装向导提示安装即可，代理设置自动选择，也可以手动选择

<!---->

3.  ![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5443c9676381437c82f194e0bb06b391~tplv-k3u1fbpfcp-zoom-1.image)
3.  安装完成后，安装对应的flutter和dart插件

<!---->

5.  创建flutter应用，创建虚拟设备，也可以连接手机真机调试

***

# []()最简单的创建流程

-   [按照官网去装环境](https://link.juejin.cn/?target=https%3A%2F%2Fdocs.flutter.dev%2Fget-started%2Finstall%2Fmacos)
-   flutter create

<!---->

-   flutter run
-   然后会自动打开一个chrome页面 显示界面了

## []()常用命令

| 命令                                                           | 作用                               |
| ------------------------------------------------------------ | -------------------------------- |
| flutter                                                      | 列出所有命令                           |
| flutter help                                                 | 获取帮助信息                           |
| flutter --version                                            | 查看当前flutter和dart版本               |
| flutter upgrade                                              | 升级flutter                        |
| flutter doctor [-v]                                          | 检查开发环境状态                         |
| —                                                            | —                                |
| flutter create project_name                                  | 新建一个flutter项目                    |
| flutter pub/packages get                                     | 安装依赖                             |
| flutter packages upgrade                                     | 升级依赖                             |
| flutter run [-d 设备名称]                                        | 运行到指定设备                          |
| flutter clean                                                | 清空build目录                        |
| —                                                            | —                                |
| flutter emulators                                            | 列出可用的模拟器                         |
| flutter devices                                              | 列出可用的设备                          |
| open -a Simulator                                            | 打开一个模拟器                          |
| flutter emulators --launch apple_ios_simulator               | 打开一个模拟器                          |
| —                                                            | —                                |
| flutter build apk [–release --target-platform android-arm64] | 生成指定架构的apk包                      |
| flutter build ios                                            | iOS打包 这一步并不能生成ipa文件，需要使用Xcode 打包 |
| flutter install                                              | 安装app到设备                         |
| flutter run --release                                        | 发布版本测试需要连接真机方能调试。                |

## []()在真机安装联调

其他 国内需要设置镜像，否则更新下载失败，[参考](https://link.juejin.cn/?target=https%3A%2F%2Fflutter.cn%2Fcommunity%2Fchina)

[Flutter中文网](https://flutterchina.club/get-started/install/)

[Dart中文网](https://dart.cn/)

> 如果有问题欢迎评论区留言或者关注我的微信公众号：前端少年汪    
> 如果本文对您有帮助，欢迎一键三连，谢谢

