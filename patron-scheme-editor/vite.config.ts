import vue from '@vitejs/plugin-vue';
import path, { resolve } from 'path';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';
import EnvironmentPlugin from 'vite-plugin-environment';

export default defineConfig({
  plugins: [
    vue(),
    dts({ rollupTypes: true }),
    EnvironmentPlugin({
      NODE_ENV: 'production',
    }),
  ],
  build: {
    lib: {
      name: 'patron',
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: (format) => `patron.${format}.js`,
    },
    emptyOutDir: true,
    rollupOptions: {
      external: ['vue', /^konva.*/, /^@tiptap.*/, /^@fortawesome.*/, /^prosemirror-.*/],
      output: {
        exports: 'named',
        globals: {
          vue: 'Vue',
        },
      },
    },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
