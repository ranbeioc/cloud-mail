import {defineConfig,loadEnv} from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'

export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd(), 'VITE')
  return {
    server: {
      host: true,
      port: 3001,
      hmr: true,
    },
    base: env.VITE_STATIC_URL || '/',
    plugins: [vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      })
    ],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, 'src')
      }
    },
    build: {
      target: 'es2022',
      outDir: env.VITE_OUT_DIR || 'dist',
      emptyOutDir: true,
      assetsInclude: ['**/*.json']
    }
  }
})
