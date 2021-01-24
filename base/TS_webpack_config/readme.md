awesome-typescript-loader:

friendly-errors-webpack-plugin:

webpack-build-notifier

const WebpackBuildNotifierPlugin = require("webpack-build-notifier")

new WebpackBuildNotifierPlugin({
    title: 'My Webpack Build',
    logo: "",
    suppressSuccess: true
});


react-hooks-fetch:

-  mobx-react-lite 

- mobx

- nestjs

- backstopjs ui测试 ： cmd ： backstops  test


- @testing-library/react
-@types/jest  单元测试


- mocha
- mochawesome

- jest-mocha-reporter

### 一些必须了解的概念

#### FAAS(Function as a service)

函数即服务。每一个函数都是一个服务，函数可以由任何语言编写，除此之外不需要关心任何运维细节，比如：计算资源，弹性扩容，而且可以按量计费，且支持事件驱动。

#### BAAS（Backend as a Service）

后端即服务。集成了许多中间件技术，可以无视环境调用服务，比如数据即服务（数据库服务），缓存服务等。虽然下面还有很多XASS，但组成serverless概念的只有FAAS+BAAS

#### PAAS （Platform as a service）

平台即服务。用户只要上传源码就可以自动持续集成并享受高可用服务，如果速度足够快，可以认为是类似Serverless。但随着以Docker为代表的容器技术兴起，以容器为粒度的PAAS部署逐渐成为主流，是最常用的应用部署方式，比如中间件，数据库，操作系统等。

#### DAAS （Data as a Service）
数据即服务，将数据采集，治理，聚合，服务打包起来提供出去，DASS服务可以应用Serverless的架构