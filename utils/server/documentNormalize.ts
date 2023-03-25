export const documentNormalize = (document: string | null) => {
  if (document && document.includes('/')) {
    document = '_' + document.replace('/', '_');
  }

  return document;
}
