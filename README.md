## <div align="center"><b><a href="README.md">English</a> | <a href="README_CN.md">简体中文</a></b></div>
## Technology Stack
### Vue 3 + Vite + TypeScript

## Description of Scaffolding
- This template should help get you started developing with Vue 3 in Vite. And use JavaScript(Compatibility)And TypeScript SFCs
- The template uses Vue 3 `<script setup>` SFCs, check out the [script setup docs](https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup) to learn more.

## Recommended IDE Setup
- [VS Code](https://code.visualstudio.com/)
- [WebStorm](https://www.jetbrains.com.cn/webstorm/)
- [HbuilderX](https://www.dcloud.io/hbuilderx.html)


## Project Environment

### If use **WebStorm** or **VS Code**
### you need to install packages
- `npm install` or `yarn add`

### If use arm pc
- `npm install` or `yarn add`
- copy `node_modules/esbuild-darwin-arm64` to `node_modules/esbuild-darwin-64`

### Start project
- `npm run dev`

## Functional Description
### Catalog Design
    |-- App.vue         // single page enter file
    |-- env.d.ts        // global typescript environment file
    |-- main.ts         // global enter file
    |-- manifest.json   // build config file
    |-- pages.json      // uni route map config file
    |-- uni.scss        // uni style config
    |-- api
    |   |-- index.ts    // api file for example
    |-- components
    |-- compose         // compose folder(like mixin function for vue2)
    |   |-- loading.ts  // compose file for example
    |-- pages
    |   |-- index.vue   // page file for example
    |-- static
    |-- store
    |   |-- index.ts    // global store file to export
    |   |-- modules     // modules folder of store
    |       |-- user.ts // store file with namespaced for example 
    |-- style
    |-- utils
        |-- auth.ts     // auth management file
        |-- map.ts      // golbal map for funtional
        |-- request.ts  // http management file
        |-- roll.ts     // http roll for http error(just open to run)
        |-- router.ts   // route management file

### Cautions
- Not allow `Vue.prototype.xx` to install global functions, Please import and use from `utils/compose`
- Show error of TS for third-party packages or some utils, You need to define `.d.ts` file to check global type
- You need not using `utils>roll`, Just use `request` with second argument is `true`, they will auto roll for `http error`; And the second argument default is `false`
- Store management, `mutation commit` and others please use namespaced, to prevent possible naming conflicts or state contamination
- File in vue3 please use `<script setup>` SFCs
- Compose api does not contain `setup` life-cycle, need to import other life-cycle from `vue`
- Please move reusable vue3-file into `components` folder, separate business from logic as much as possible of `page` folder

## Build Project
### config of `manifest.json` require items, check out [config guide](https://uniapp.dcloud.net.cn/collocation/manifest) to learn more

### HBuilderX
#### under list just run publish with the port with require config
- Android: Strongly recommended
- IOS: Strongly recommended
- H5
- WeChat mini-app
- Baidu mini-app
- Alipay mini-app
- ByteDance mini-app
- QQ mini-app

### IDE (Webstorm, VS Code or Other)
- Android: Deprecated
  - run `npm run build:app-android`
  - then use **Android Studio** to build apk file
- IOS: Deprecated
  - run `npm run build:app-ios`
  - then use **XCode** to build ipa file
- H5
  - run `npm run build:h5` 
  - with SSR: run `npm run build:h5:ssr`
- WeChat mini-app
  - run `npm run build:mp-weixin`
- Baidu mini-app
  - run `npm run build:mp-baidu`
- Alipay mini-app
  - run `npm run build:mp-alipay`
- ByteDance mini-app
  - run `npm run build:mp-toutiao`
- QQ mini-app
  - run `npm run build:mp-qq`
