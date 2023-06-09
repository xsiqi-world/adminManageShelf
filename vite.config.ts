import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import { resolve } from 'path';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import viteCompression from 'vite-plugin-compression';

function pathResolve (dir: string) {
  return resolve(process.cwd(), '.', dir)
}

// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      // {
      //   find: 'vue-i18n',
      //   replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
      // },
      // /@/xxxx => src/xxxx
      {
        find: /\/@\//,
        replacement: pathResolve('src') + '/',
      },
      // /#/xxxx => types/xxxx
      {
        find: /\/#\//,
        replacement: pathResolve('types') + '/',
      },
    ],
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  build: {
    target: 'es2015',
    chunkSizeWarningLimit: 500,
    rollupOptions: {
      input: {
        index: pathResolve('index.html')
      },
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]',
        manualChunks(id) {
          // https://rollupjs.org/guide/en/#outputmanualchunks
          if (id.includes('node_modules')) {
            // console.log(id.toString());
            console.log(id.toString().split('node_modules/')[1]);
            // console.log(id.toString().split('node_modules/')[1].split('/')[0].toString());
            return id.toString().split('node_modules/')[1].split('/')[0].toString();
          }
        }
      },
    },
    brotliSize: true
  },
  server: {
    proxy: {
      // 选项写法
      '/api': {
        target: 'http://127.0.0.1:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  },
  plugins: [
    vue(),
    vueJsx(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    viteCompression()
  ],
  optimizeDeps: {
    // @iconify/iconify: The dependency is dynamically and virtually loaded by @purge-icons/generated, so it needs to be specified explicitly
    // include: [
    //   '@element-plus/icons-vue',
    //   'element-plus',
    // ],
  },
})
