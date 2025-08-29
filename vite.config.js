import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';
import vueDevTools from 'vite-plugin-vue-devtools';
import vueDevToolsAccessibility from 'vue-dev-tools-accessibility';

export default defineConfig({
  base: '/vue-snapshot-serializer',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cheerio: ['cheerio'],
          htmlparser2: ['htmlparser2'],
          lodash: ['lodash.xor'],
          parse5: ['parse5'],
          vue: ['vue'],
          'vue-doxen': ['vue-doxen'],
          'vue-options-api-constants-plugin': ['vue-options-api-constants-plugin'],
          'vue3-snapshot-serializer': ['vue3-snapshot-serializer'],
          zenscroll: ['zenscroll']
        }
      }
    },
    sourcemap: true
  },
  plugins: [
    vue(),
    vueDevTools(),
    vueDevToolsAccessibility()
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
});
