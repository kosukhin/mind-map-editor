import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { Rect } from 'konva/lib/shapes/Rect';
import { MapObjectType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { debug } from 'debug';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { CacheType } from '@/modules/system/guest/CacheType';

const localDebug = debug('MapObjectsRectsPatron');

export class MapObjectsRects implements GuestType<MapObjectDocument[]> {
  private previouslyRenderedRects = new Map();

  private objectIdCache: CacheType<string>;

  public constructor(
    private konvaLayer: LayerBase,
    private mapObject: MapObjectType,
    private factories: {
      patronOnce: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
      cache: FactoryType<CacheType>
    },
  ) {
    this.objectIdCache = this.factories.cache.create();
  }

  public receive(objects: MapObjectDocument[]): this {
    this.konvaLayer.layer(this.factories.patronOnce.create(
      this.factories.guest.create((layer: KonvaLayer) => {
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

          rect.on('click', () => {
            localDebug('object clicked with id', object.id);
            this.objectIdCache.receive(object.id);
          });
        });
      }),
    ));
    return this;
  }

  public objectId(guest: GuestType<string>): this {
    this.objectIdCache.receiving(guest);
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
