import { viteStaticCopy } from 'vite-plugin-static-copy'
import path from "path";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '@/assets/styles/variables.scss',
    '@/assets/styles/reset.scss',
  ],
  vite: {
    plugins: [
      viteStaticCopy({
        targets: [
          {
            src: path.resolve(__dirname, './node_modules/svgedit/dist/editor/images/*.svg'),
            dest: 'images/',
          }
        ]
      })
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
