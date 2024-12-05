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
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/patron-scheme-editor/dist/style.css" />
    <script type="importmap">
      {
        "imports": {
          "patron-oop": "https://cdn.jsdelivr.net/npm/patron-oop@1.26.0/dist/patron.min.mjs",
          "konva": "https://tbo47.github.io/konva-es.9.3.16.js",
          "@fortawesome/vue-fontawesome": "https://cdn.jsdelivr.net/npm/@fortawesome/vue-fontawesome/index.es.js",
          "@fortawesome/free-solid-svg-icons": "https://cdn.jsdelivr.net/npm/@fortawesome/free-solid-svg-icons/index.es.js",
          "@tiptap/vue-3": "https://cdn.skypack.dev/@tiptap/vue-3",
          "@tiptap/starter-kit": "https://cdn.skypack.dev/@tiptap/starter-kit",
          "@fortawesome/fontawesome-svg-core": "https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-svg-core@6.1.2/index.es.js",
          "patron-scheme-editor": "http://127.0.0.1:8081/patron.es.js",
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
