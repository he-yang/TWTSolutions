import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  build: {
    minify: 'terser', // 启用 Terser 压缩
    terserOptions: {
      compress: {
        drop_console: true, // 删除所有 console.log
        drop_debugger: true, // 删除 debugger
      },
      format: {
        comments: false, // 删除注释
        beautify: false, // 不美化输出
      },
      mangle: {
        toplevel: true, // 混淆顶级变量名
      },
    },
    // rollupOptions: {
    //   input: {
    //     main: 'forms.html', // 指定新的入口文件
    //   },
    // },
  },
})
