import react from '@vitejs/plugin-react';
import path from 'path';
import colors from 'picocolors';
import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import CompressionWebpackPlugin from 'vite-plugin-compression';
import progress from 'vite-plugin-progress';
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    chunkSplitPlugin() /** gzip压缩 */,
    CompressionWebpackPlugin({
      algorithm: 'gzip',
      threshold: 10240, //只有大小大于该值的资源会被处理。默认值是 10k
    }),
    progress({
      format: `${colors.green(colors.bold('Bouilding'))} ${colors.cyan(
        '[:bar]',
      )} :percent`,
      total: 200,
      width: 60,
      complete: '=',
      incomplete: '',
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        // 支持内联 JavaScript
        javascriptEnabled: true,
        // 重写 less 变量，定制样式
        modifyVars: {
          '@primary-color': '#175CE6',
        },
      },
    },
  },
  //引入文件别名 这里设置了 还需要在tsconfig.app.json 配置类型，不然引用会红色警告
  //还需要提前下载types/node 依赖
  resolve: {
    alias: {
      '@pages': path.resolve(__dirname, 'src/', 'pages'),
      '@components': path.resolve(__dirname, 'src/', 'components'),
      '@stores': path.resolve(__dirname, 'src/', 'stores'),
      '@services': path.resolve(__dirname, 'src/', 'services'),
      '@utils': path.resolve(__dirname, 'src/', 'utils'),
    },
  },
  server: {
    host: '0.0.0.0', // 允许外部访问，适合 Docker 等环境
    port: 8800, // 设置端口
    open: true, // 启动后自动打开浏览器
    strictPort: true, // 在端口被占用时不自动使用其他端口
    // proxy: {
    //   '/XXX': {
    //     target: 'https://XXX',
    //     changeOrigin: true,
    //     cookieDomainRewrite: '',
    //     secure: false,
    //   },
    // },
  },
});
