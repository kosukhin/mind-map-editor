import { MapStructure } from '@/entities/Map';
import { Stage } from 'konva/lib/Stage';
import { modelsPoolGet } from '@/modulesHigh/models/modelsPool';

export const mapController = {
  scrollToObject(id: string) {
    const map = modelsPoolGet<MapStructure>('map');
    const stage = modelsPoolGet<Stage>('stage');
    const object = map.objects[id];
    if (object) {
      // TODO Магическая математика в modules вынести
      const x = object.position[0] * -1 + 20;
      const y = object.position[1] * -1 + 20;
      stage.position({ x, y });
    }
  },
};
