import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { Rect } from 'konva/lib/shapes/Rect';
import { MapObjectType } from '@/modules/application/mapObject/MapObjectType';
import { debug } from 'debug';
import { PatronOnce } from '@/modules/system/guest/PatronOnce';
import { GuestType } from '../../system/guest/GuestType';

const localDebug = debug('MapObjectsRectsPatron');

/**
 * Отвечает за рендеринг квадратов для объектов карты
 */
export class MapObjectsRectsPatron implements GuestType<MapObjectDocument[]> {
  private previouslyRenderedRects = new Map();

  public constructor(private konvaLayer: LayerBase, private mapObject: MapObjectType) {}

  public receive(objects: MapObjectDocument[]): this {
    this.konvaLayer.layer(new PatronOnce((layer) => {
      localDebug('rerender object rects');
      this.previouslyRenderedRects.forEach((rect) => {
        rect.hide();
      });
      objects.forEach((object) => {
        if (this.previouslyRenderedRects.has(object)) {
          const rect = this.previouslyRenderedRects.get(object);
          rect.width(+object.width);
          rect.height(+object.height);
          rect.x(+object.position[0]);
          rect.y(+object.position[1]);
          rect.show();
          return;
        }

        const rect = new Rect({
          x: +object.position[0],
          y: +object.position[1],
          width: +object.width,
          height: +object.height,
          fill: '#f00',
          name: object.id,
          draggable: true,
          objectId: object.id,
        });
        this.previouslyRenderedRects.set(object, rect);
        layer.add(rect);

        rect.on('dragend', (e) => {
          this.mapObject.receive({
            ...object,
            position: [rect.x(), rect.y()],
          });
        });

        // TODO сделать вотчер на перетаскивание и клик по ректу
        // Перетаскивание обновляет карту
        // клик должен записать выбранный id в какого-то гостя
        // Либо нужно дать возможность подписываться на выбранный ID
      });
    }));
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
