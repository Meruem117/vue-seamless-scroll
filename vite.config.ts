import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts()
  ],
  build: {
    lib: {
      entry: 'packages/index.ts',
      name: 'vue-simple-scroll',
      fileName: (format) => `vue-simple-scroll.${format}.js`,
    },
    rollupOptions: {
      external: ['vue'],
      output: {
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  server: {
    port: 3000
  },
})
