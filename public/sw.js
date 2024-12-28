console.log('SW inside sw');

let sharedFileContent = null;

self.addEventListener('fetch', (event) => {
  const url = new URL(event.request.url);
  console.log('SW handle fetch in worker', url.pathname, event.request.method);

  if (event.request.method === 'GET' && url.pathname === '/share-file-content') {
    console.log('SW response as json');

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

  console.log('SW fetch fits');

  event.respondWith(
    (async () => {
      try {
        console.log('SW request', event.request);
        const formData = await event.request.formData();

        console.log('SW formData', formData);

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
            console.log('SW file', file.value);

            console.log('SW reader res', reader.result);
            sharedFileContent = {
              name: file.value.name,
              content: reader.result,
              mime: file.value.type,
            };
          };
        }

        console.log('SW respond with worker', file.value);
      } catch (e) {
        console.log('SW failed fetch', e);
      }

      return Response.redirect('/', 303);
    })(),
  );
});
