export const svgRenderDefault = (svg: string) => svg
  // eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${width}', '100')
// eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${height}', '100');
