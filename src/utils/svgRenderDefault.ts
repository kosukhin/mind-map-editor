import { MapType } from '@/entities/Map';

const defaultType = {
  svg: '',
  width: '100',
  height: '100',
};

export const svgRender = (svg: string, width?: string, height?: string) => svg
  // eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${width}', width || defaultType.width)
  // eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${height}', height || defaultType.height);

export const svgRenderDefault = (type: MapType) => svgRender(
  type.svg,
  type.width.toString(),
  type.height.toString(),
);
