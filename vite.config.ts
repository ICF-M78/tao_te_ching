import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import UnoCSS from 'unocss/vite'
import packageJson from './package.json'

export default defineConfig({
  base: `/${packageJson.name}/`,
  build: {
    outDir: `./${packageJson.name}`,
  },
  plugins: [vue(), UnoCSS()],
  server: {
    open: true,
    port: 6060,
    proxy: {
      '^/dev': {
        target: 'http://192.168.12.86:8080/',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/dev/, ''),
      },
    },
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
})
