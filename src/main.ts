import App from './App.vue'
import store from './store/index'

import uView from "@/uni_modules/vk-uview-ui"

import '@/style/index.scss'

import { createSSRApp } from 'vue'

export function createApp() {
    const app = createSSRApp(App)
    app.use(store)
       .use(uView)

    return { app }
}
