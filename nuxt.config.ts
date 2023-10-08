import path from 'path'
import { viteStaticCopy } from 'vite-plugin-static-copy'

const packageJson = require('./package.json')
const lastArg = process.argv[process.argv.length - 1]

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  css: [
    '@fortawesome/fontawesome-svg-core/styles.css',
    '@/assets/styles/variables.scss',
    '@/assets/styles/reset.scss',
    '@/assets/styles/transitions.scss',
  ],
  modules: ['@nuxtjs/i18n'],
  i18n: {
    vueI18n: './i18n.config.ts',
  },
  runtimeConfig: {
    public: {
      version: packageJson.version,
      isDemo: lastArg === '--demo',
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
