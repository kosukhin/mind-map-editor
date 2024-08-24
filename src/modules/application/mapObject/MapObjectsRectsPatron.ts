import { Guest } from '@/modules/system/guest/Guest';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { LayerBase } from '@/modules/application/layer/LayerBase';

/**
 * Отвечает за рендеринг квадратов
 */
export class MapObjectsRectsPatron implements Guest<MapObjectDocument[]> {
  public constructor(private konvaLayer: LayerBase) {
  }

  public receive(value: MapObjectDocument[]): this {
    console.log('render rects', value, 'on konva', this.konvaLayer);
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
