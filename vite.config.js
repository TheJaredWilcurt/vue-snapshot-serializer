import { fileURLToPath, URL } from 'node:url';

import vue from '@vitejs/plugin-vue';
import { defineConfig } from 'vite';

export default defineConfig({
  base: '/vue-snapshot-serializer',
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          cheerio: ['cheerio'],
          htmlparser2: ['htmlparser2'],
          'js-beautify': ['js-beautify'],
          lodash: ['lodash.xor'],
          parse5: ['parse5'],
          vue: ['vue'],
          vtu: ['@vue/test-utils'],
          'vue-doxen': ['vue-doxen'],
          'vue3-snapshot-serializer': ['vue3-snapshot-serializer']
        }
      }
    },
    sourcemap: true
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js'
    }
  }
});
