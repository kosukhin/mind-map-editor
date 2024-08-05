import { MapStructure } from '@/entities/MapStructures';
import { KonvaEventObject } from 'konva/lib/Node';

type Params = [KonvaEventObject<DragEvent>, MapStructure]

export const layerDragHandler = ([vDrag, vMap]: Params) => {
  const currentObject = vMap.objects[vDrag.target.attrs.objectId];
  return [
    currentObject,
    {
      x: vDrag.target.attrs.x,
      y: vDrag.target.attrs.y,
    },
  ] as const;
};
