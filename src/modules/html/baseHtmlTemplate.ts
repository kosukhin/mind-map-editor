import baseJsonTemplate from '@/modules/json/baseJsonTemplate';

export default `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta
      name="viewport"
      content="width=device-width, initial-scale=1.0"
    />
    <title>PatronSchemeEditor</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/patron-scheme-editor@0.0.2/dist/style.css" />
    <script type="importmap">
      {
        "imports": {
          "patron-oop": "https://cdn.jsdelivr.net/npm/patron-oop@1.26.0/dist/patron.min.mjs",
          "patron-scheme-editor": "https://cdn.jsdelivr.net/npm/patron-scheme-editor@0.0.2/dist/patron.es.js",
          "vue": "https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.38/vue.esm-browser.prod.min.js",
          "vue-i18n": "https://cdnjs.cloudflare.com/ajax/libs/vue-i18n/9.14.1/vue-i18n.esm-browser.prod.min.js"
        }
      }
    </script>
  </head>
  <body>
    <div id="app">
      <div style="position: relative; width: 100vw; height: 100vh;">
        <patron-scheme-editor v-model="content" readonly />
      </div>
      }
    </div>
    <script type="module">
      import { createApp } from 'vue';
      import { PatronSchemeEditor } from 'patron-scheme-editor';
      import { createI18n } from 'vue-i18n';

      const content = '${baseJsonTemplate}';

      Promise.all([
        fetch('https://raw.githubusercontent.com/kosukhin/patron-scheme-editor/refs/heads/main/src/locales/ru.json').then(r => r.json()),
        fetch('https://raw.githubusercontent.com/kosukhin/patron-scheme-editor/refs/heads/main/src/locales/en.json').then(r => r.json()),
      ]).then(([ru, en]) => {
        createApp({
          data() {
            return {
              content,
            };
          },
          components: {
            PatronSchemeEditor,
          }
        })
          .use(
            createI18n({
              legacy: false,
              locale: 'ru',
              fallbackLocale: 'ru',
              globalInjection: true,
              messages: {
                ru,
                en,
              },
            })
          )
          .mount('#app')
        ;
      });
    </script>
  </body>
</html>`;
