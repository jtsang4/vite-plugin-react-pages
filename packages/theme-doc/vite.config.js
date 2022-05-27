import { resolve } from 'path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import {
  AntdResolve,
  createStyleImportPlugin,
} from '@jtsang/vite-plugin-style-import'

export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.tsx'),
      formats: ['cjs', 'es'],
      fileName: 'index',
    },
    rollupOptions: {
      external: [
        'react',
        'react-dom',
        'react-router-dom',
        '@jtsang/vite-plugin-react-pages',
        '@mdx-js/react',
      ],
    },
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    react(),
    createStyleImportPlugin({
      exclude: /\.css$/,
      resolves: [AntdResolve()],
    }),
  ],
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          'ant-prefix': 'vp-antd',
        },
        javascriptEnabled: true,
      },
      module: {
        generateScopedName: 'vp-local-[local]',
      },
      extract: 'index.css',
    },
  },
})
