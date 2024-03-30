import { MapType } from '@/entities/Map';

export const svgRenderDefault = (type: MapType) => type.svg
  // eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${width}', type.width.toString())
// eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${height}', type.height.toString());
