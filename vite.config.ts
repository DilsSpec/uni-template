import { defineConfig } from "vite"
import uni from '@dcloudio/vite-plugin-uni'
import styleImport, { VantResolve } from "vite-plugin-style-import"
// @ts-ignore
import path from "path"

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        uni(),
        styleImport({
            resolves: [VantResolve()],
        }),
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
