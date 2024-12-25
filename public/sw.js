console.log('SW inside sw');

self.addEventListener('fetch', (event) => {
  console.log('SW handle fetch in worker');

  const url = new URL(event.request.url);
  if (
    event.request.method !== 'POST'
    || url.pathname !== '/share-file-handler'
  ) {
    return;
  }

  console.log('SW fetch fits');
  const swChannel = new BroadcastChannel('sw-channel');

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
            console.log('SW reader res', reader.result);
            swChannel.postMessage({
              name: file.value.name,
              content: reader.result,
            });
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
