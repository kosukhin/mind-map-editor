export const documentNormalize = (document: string | null) => {
  if (document && document.includes('/')) {
    document = '_' + document.replaceAll('/', '_')
  }
  return document && document.toLowerCase()
}
