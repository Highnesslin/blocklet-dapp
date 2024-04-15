import path from 'path';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import react from '@vitejs/plugin-react';
import { createBlockletPlugin } from 'vite-plugin-blocklet';

// https://vitejs.dev/config/
export default defineConfig(() => {
  return {
    plugins: [react(), createBlockletPlugin(), svgr()],
    build: {
      // 禁止 preload 可以解决 js 的请求没有 referer 的问题
      cssCodeSplit: false,
      commonjsOptions: {
        transformMixedEsModules: true,
      },
    },
    resolve: {
      alias: {
        "@":path.resolve(__dirname,'./src')
      }
    }
  };
});
