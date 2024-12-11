import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { chunkSplitPlugin } from 'vite-plugin-chunk-split';
import CompressionWebpackPlugin from 'vite-plugin-compression';
import progress from 'vite-plugin-progress';
import colors from 'picocolors';
import path from 'path';
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
  resolve: {
    alias: {
      '~': path.resolve(__dirname, 'src/'),
    },
  },
  server: {
    host: '0.0.0.0', // 允许外部访问，适合 Docker 等环境
    port: 8800, // 设置端口
    open: true, // 启动后自动打开浏览器
    strictPort: true, // 在端口被占用时不自动使用其他端口
  },
});
