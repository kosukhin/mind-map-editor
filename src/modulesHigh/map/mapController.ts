import { MapStructure } from '@/entities/MapStructures';
import { Stage } from 'konva/lib/Stage';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';
import { renderingMath } from '@/modules/rendering/renderingMath';

export const mapController = {
  scrollToObject(id: string) {
    const map = modelsPoolGet<MapStructure>('map');
    const stage = modelsPoolGet<Stage>('stage');
    const object = map.objects[id];
    if (object) {
      const [x, y] = object.position;
      stage.position({
        x: renderingMath.objectPositionOffset(x),
        y: renderingMath.objectPositionOffset(y),
      });
    }
  },
};
