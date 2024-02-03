import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import eslintPlugin from "vite-plugin-eslint";
import { viteMockServe } from 'vite-plugin-mock'
import { resolve } from "path";
import externalGlobals from "vite-plugin-external-globals";


function pathResolve(dir) {
  return resolve(process.cwd(), ".", dir);
}

// https://vitejs.dev/config/
export default defineConfig({
  base: "./",
  plugins: [
    react(),
    eslintPlugin({
      cache: false,
      failOnError: false,
      include: ["src/**/*.js", "src/**/*.tsx", "src/**/*.ts"],
    }),
    viteMockServe({// 更多配置见最下方
      logger: true,
      mockPath: "./mock/", // 文件位置
      enable: true, // 开启
      watchFiles: true, // 监听变动
    }),
    externalGlobals({
      injectTo: "body",
      integrity: true,
      crossorigin: "anonymous",
      entry: [
          {
              name: "three",
              path: "",
              var: "THREE",
          },
      ],
  }),

  ],
  css: {
    preprocessorOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
    postcss:{}
  },
  resolve: {
    alias: [
      {
        find: /@\//,
        replacement: `${pathResolve("src")}/`,
      },
    ],
  },
  server: { 
    //用来配置跨域
    host: '127.0.0.1',
    port: 8000,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1:3000',//目标服务器地址
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      },
    }
  }
})
