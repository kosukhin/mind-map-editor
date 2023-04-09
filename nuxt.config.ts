import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const packageJson = require('./package.json')

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: ['@/assets/styles/variables.scss', '@/assets/styles/reset.scss'],
  runtimeConfig: {
    public: {
      version: packageJson.version,
    },
  },
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(
              __dirname,
              './node_modules/svgedit/dist/editor/images/*.svg'
            ),
            dest: path.resolve(__dirname, './public/images'),
          },
          {
            src: path.resolve(__dirname, './maps/*.json'),
            dest: path.resolve(__dirname, './public/maps'),
          },
          {
            src: path.resolve(__dirname, './maps/*.json'),
            dest: path.resolve(__dirname, './.nuxt/dist/server'),
          },
          {
            src: path.resolve(__dirname, './search-index/*'),
            dest: path.resolve(__dirname, './public/search-index'),
          },
        ],
      }),
    ],
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@import "@/assets/styles/mixins.scss";',
        },
      },
    },
  },
})
