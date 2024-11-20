import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import path from 'path';
import dts from 'vite-plugin-dts';

export default defineConfig({
  build: {
    outDir: 'es',
    minify: false,
    rollupOptions: {
      external: ['vue', 'patorn-oop'],
      output: {
        globals: {
          vue: 'Vue',
        },
        dir: 'dist',
      },
    },
    lib: {
      entry: './src/index.ts',
      name: 'patron',
      fileName: 'patron',
      formats: ['es'],
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
    }),
  ],
});
