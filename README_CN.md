## <div align="center"><b><a href="README.md">English</a> | <a href="README_CN.md">简体中文</a></b></div>
## 技术栈
### Vue 3 + Vite + TypeScript

## 脚手架描述
- 该脚手架基于**Vue3**，通过**Vite**编译构建，脚本语言用JS（向下兼容）以及**TS**语法糖 
- Vue3模版最好基于`<script setup>`SFCs，[学习更多](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup)

## 推荐IDE
- [VS Code](https://code.visualstudio.com/)
- [WebStorm](https://www.jetbrains.com.cn/webstorm/)
- [HbuilderX](https://www.dcloud.io/hbuilderx.html)


## 项目环境

### 如果使用 **WebStorm** 或者 **VS Code**
### 你需要运行以下命令用来安装第三方包
- `npm install` 或者 `yarn add`

### 如果使用arm架构的运行环境
- `npm install` 或者 `yarn add`
- 复制`node_modules/esbuild-darwin-arm64`到`node_modules/esbuild-darwin-64`

### 运行项目
- `npm run dev`

## 功能描述
### 目录设计
    |-- App.vue         // 单页面入口文件
    |-- env.d.ts        // 全局ts配置文件
    |-- main.ts         // 项目入口文件
    |-- manifest.json   // 打包配置相关
    |-- pages.json      // UNI路由映射配置
    |-- uni.scss        // UNI样式文件
    |-- api
    |   |-- index.ts    // http请求访问  示例
    |-- components
    |-- compose         // 组合式函数文件夹（功能类似vue2中的mixin）
    |   |-- loading.ts  // 组合式函数  示例
    |-- pages
    |   |-- index.vue   // vue3文件  示例
    |-- static
    |-- store
    |   |-- index.ts    // 全局状态暴露文件
    |   |-- modules     // 状态module列表
    |       |-- user.ts // 作用域module  示例
    |-- style
    |-- utils
        |-- auth.ts     // Token（Auth）管理文件
        |-- map.ts      // 函数外挂映射表（方便维护）
        |-- request.ts  // http请求封装
        |-- roll.ts     // http请求轮询功能（通过发布订阅者模式，手动开启，仅仅断网时生效）
        |-- router.ts   // 路由跳转文件
### 注意事项
- 不允许`Vue.prototype.xxx`挂载全局方法，统一从`utils/compose`引入调用
- TS类型报错，个别第三方包，函数挂载，需要定义`.d.ts`文件进行全局类型检查
- `utils>roll`无需调用，请求接口时接受第二个参数为`true`时默认在`http error`时会自动重试访问，第二个参数默认为`false`
- 状态访问以及`mutation commit`请用作用域访问，防止命名冲突以及状态污染等问题出现
- vue3文件建议用`<script setup>`语法糖
- compose组合式函数内不包含`setup`生命周期，需要从`vue`引入其他生命周期，详情查看示例
- 功能性vue3文件拆分移入到`component`文件夹内，与`pages`文件夹尽可能做到业务与逻辑分离


## 打包项目
### 配置`manifest.json`必填项，参考[配置指南](https://uniapp.dcloud.net.cn/collocation/manifest)

### HbuilderX
#### 配置好`manifest.json`并运行 发行-到指定端
- Android: 墙裂建议
- IOS: 墙裂建议
- H5
- 微信小程序
- 百度小程序
- 支付宝小程序
- 字节跳动小程序
- QQ小程序

### IDE（Webstorm、VS Code 或者其他IDE）
- Android: 不建议
    - 运行 `npm run build:app-android`
    - 然后使用 **Android Studio** 生成apk文件
- IOS: 不建议
    - 运行 `npm run build:app-ios`
    - 然后使用 **XCode** 生成ipa文件
- H5
    - 运行 `npm run build:h5`
    - 使用SSR: 运行 `npm run build:h5:ssr`
- 微信小程序
  - 运行 `npm run build:mp-weixin`
- 百度小程序
  - 运行 `npm run build:mp-baidu`
- 支付宝小程序
  - 运行 `npm run build:mp-alipay`
- 字节跳动小程序
  - 运行 `npm run build:mp-toutiao`
- QQ小程序
  - 运行 `npm run build:mp-qq`
