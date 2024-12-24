console.log('inside sw');

self.addEventListener('fetch', (event) => {
  console.log('handle fetch in worker');

  const url = new URL(event.request.url);
  if (
    event.request.method !== 'POST'
    || url.pathname !== '/share-file-handler'
  ) {
    return;
  }

  console.log('fetch fits');

  event.respondWith(
    (async () => {
      try {
        console.log('request', event.request);
        const formData = await event.request.formData();

        console.log('formData', formData);

        const htmlFiles = formData.getAll('htmlFiles');
        console.log('html', htmlFiles);
        const jsonFiles = formData.getAll('jsonFiles');
        console.log('json', jsonFiles);

        console.log('respond with worker');
      } catch (e) {
        console.log('failed fetch', e);
      }

      return Response.redirect('/', 303);
    })(),
  );
});
