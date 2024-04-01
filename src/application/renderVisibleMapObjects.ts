import { calculateVisibleObjects } from '@/application/layerDragObjectHandler';
import { KonvaLayerObject } from '@/entities/Konva';
import { addObjectToLayer, removeAllLayerObjects } from '@/utils/konva';

export const renderVisibleMapObjects = (
  layerObjects: any,
  vStage: any,
  vMap: any,
  vLayer: any,
) => {
  const [visible] = calculateVisibleObjects(vMap, vStage);
  requestAnimationFrame(() => {
    removeAllLayerObjects(layerObjects);
  });
  requestAnimationFrame(() => {
    visible.forEach(async (object) => {
      const objects = await addObjectToLayer(vLayer, object, vMap, false);
      layerObjects.set(object.id, objects as KonvaLayerObject[]);
    });
  });
};
