import { MapObjectStructure, MapStructure, MapTypeStructure } from '@/entities/MapStructures';

const defaultType = {
  svg: '',
  width: '100',
  height: '100',
};

export const renderSvgTemplate = (object: MapObjectStructure, vMap: MapStructure) => {
  const type = vMap.types[object.type];
  let { svg } = type;
  if (object.additionalFields) {
    Object.entries(object.additionalFields).forEach(([key, value]) => {
      svg = svg.replaceAll(`\${${key}}`, value);
    });
  }
  ['width', 'height'].forEach((key) => {
    svg = svg.replaceAll(`\${${key}}`, (object as any)[key]);
  });

  return svg;
};

export const svgRender = (svg: string, width?: string, height?: string) => svg
  // eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${width}', width || defaultType.width)
  // eslint-disable-next-line no-template-curly-in-string
  .replaceAll('${height}', height || defaultType.height);

export const svgRenderDefault = (type: MapTypeStructure) => svgRender(
  type.svg,
  type.width.toString(),
  type.height.toString(),
);
