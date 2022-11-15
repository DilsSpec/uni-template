import App from './App.vue'
import store from './store/index'

import { createSSRApp } from 'vue'

import uView from "@/uni_modules/vk-uview-ui"

export function createApp() {
    const app = createSSRApp(App)
    app.use(store)
       .use(uView)

    return { app }
}
