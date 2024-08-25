import { Guest } from '@/modules/system/guest/Guest';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { Visitant } from '@/modules/system/guest/Visitant';
import { Rect } from 'konva/lib/shapes/Rect';
import { MapObject } from '@/modules/application/mapObject/MapObject';

/**
 * Отвечает за рендеринг квадратов для объектов карты
 */
export class MapObjectsRectsPatron implements Guest<MapObjectDocument[]> {
  private previouslyRenderedRects = new Map();

  public constructor(private konvaLayer: LayerBase, private mapObject: MapObject) {}

  public receive(objects: MapObjectDocument[]): this {
    console.log('render rects', objects, 'on konva', this.konvaLayer);
    this.konvaLayer.layer(new Visitant((layer) => {
      objects.forEach((object) => {
        if (this.previouslyRenderedRects.has(object)) {
          const rect = this.previouslyRenderedRects.get(object);
          rect.width(+object.width);
          rect.height(+object.height);
          rect.x(+object.position[0]);
          rect.y(+object.position[1]);
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
          console.log('rec drag end', e, rect.x(), rect.y());
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
