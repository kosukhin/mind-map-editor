let sharedFileContent = null;

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);

  if (event.request.method === 'GET' && url.pathname === '/share-file-content') {
    event.respondWith(Response.json({
      data: sharedFileContent,
    }));
    return;
  }

  if (
    event.request.method !== 'POST'
    || url.pathname !== '/share-file-handler'
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        const formData = await event.request.formData();

        const file = { value: null };
        const [htmlFile] = formData.getAll('htmlFiles');
        if (htmlFile) {
          file.value = htmlFile;
        }

        const [jsonFile] = formData.getAll('jsonFiles');
        if (jsonFile) {
          file.value = jsonFile;
        }

        if (file.value) {
          const reader = new FileReader();
          reader.readAsText(file.value);
          reader.onload = () => {
            sharedFileContent = {
              name: file.value.name,
              content: reader.result,
              mime: file.value.type,
            };
          };
        }
      } catch (e) {
        console.warn('SW failed fetch', e);
      }

      return Response.redirect('/', 303);
    })(),
  );
});
