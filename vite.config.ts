import { defineConfig } from "vite"
import uni from '@dcloudio/vite-plugin-uni'
import Components from 'unplugin-vue-components/vite';
// @ts-ignore
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni()
    ],
    resolve: {
        alias: {
            // @ts-ignore
            '@': path.resolve(__dirname, 'src')
        }
    },
    css: {
        preprocessorOptions: {
            scss: {
                additionalData: `@import "@/style/index.scss";`
            }
        }
    }
})
