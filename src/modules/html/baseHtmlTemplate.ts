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
  </head>
  <body>
    <div id="app"></div>
    <script type="module">
      const content = '${baseJsonTemplate}';

      fetch('https://raw.githubusercontent.com/kosukhin/patron-scheme-editor/refs/heads/issue-28/embedable/dist/assets/index.js')
      .then(r => r.text())
      .then((scriptText) => {
        const script = document.createElement('script');
        script.type = 'module';
        script.crossorigin = true;
        script.textContent = scriptText;
        document.body.appendChild(script);
      });
    </script>
  </body>
</html>`;
