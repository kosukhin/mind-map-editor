import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { Rect } from 'konva/lib/shapes/Rect';
import {
  MapObjectsType,
  MapObjectType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { debug } from 'debug';
import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { MapObjectCurrentType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrentType';
import { ObjectPositionType } from '@/modules/application/l1/l2/l3/l4/types/object/ObjectPositionType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';

const localDebug = debug('MapObjectsRectsPatron');

/**
 * Объект для рендеринга квадратов на конве
 */
export class MapObjectsRects implements GuestObjectType<MapObjectDocument[]> {
  private previouslyRenderedRects = new Map();

  public constructor(
    private konvaLayer: LayerBase,
    private mapFile: MapFileType,
    private mapObject: MapObjectType,
    mapObjectsVisible: MapObjectsType,
    private mapObjectCurrent: MapObjectCurrentType,
    private mapObjectForRendering: MapObjectType,
    private objectPosition: ObjectPositionType,
    private factories: {
      patronOnce: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
      cache: FactoryType<SourceType>;
    },
  ) {
    mapObjectsVisible.objects(this);
  }

  public give(objects: MapObjectDocument[]): this {
    this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((layer: KonvaLayer) => {
          this.mapFile.currentMap(
            this.factories.guest.create((latestMap: MapDocument) => {
              localDebug('rerender object rects');
              this.previouslyRenderedRects.forEach((rect) => {
                rect.hide();
              });
              objects.forEach((object) => {
                const type = latestMap.types[object.type];
                const width = +object.width || +type.width || 100;
                const height = +object.height || +type.height || 100;

                if (this.previouslyRenderedRects.has(object)) {
                  const rect = this.previouslyRenderedRects.get(object);
                  rect.width(width);
                  rect.height(height);
                  rect.x(+object.position[0]);
                  rect.y(+object.position[1]);
                  rect.show();
                  return;
                }

                localDebug('rect object', object, type);
                const rect = new Rect({
                  x: +object.position[0],
                  y: +object.position[1],
                  width,
                  height,
                  name: object.id,
                  draggable: true,
                  objectId: object.id,
                  zIndex: 3,
                });

                this.previouslyRenderedRects.set(object, rect);
                layer.add(rect);

                rect.on('mouseenter', () => {
                  layer.getStage().container().style.cursor = 'pointer';
                });

                rect.on('mouseleave', () => {
                  layer.getStage().container().style.cursor = 'default';
                });

                rect.on('dragend', () => {
                  localDebug('drag ended');
                  this.objectPosition.position(
                    object,
                    {
                      x: rect.x(),
                      y: rect.y(),
                    },
                    this.factories.guest.create((point: PointDocument) => {
                      this.mapObject.give({
                        ...object,
                        position: [point.x, point.y],
                      });
                    }),
                  );
                });

                rect.on('dragmove', () => {
                  localDebug('dragmove works', rect.x(), rect.y());
                  layer.getStage().container().style.cursor = 'move';
                  this.objectPosition.position(
                    object,
                    {
                      x: rect.x(),
                      y: rect.y(),
                    },
                    this.factories.guest.create((point: PointDocument) => {
                      this.mapObjectForRendering.give({
                        ...object,
                        position: [point.x, point.y],
                      });
                    }),
                  );
                });

                rect.on('click', () => {
                  localDebug('object clicked with id', object.id);
                  this.mapObjectCurrent.give(object.id);
                });
              });
            }),
          );
        }),
      ),
    );
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }
}
