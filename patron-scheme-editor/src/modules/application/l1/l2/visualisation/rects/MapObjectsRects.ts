import { EditorSettings } from '@/modules/application/l1/l2/l3/l4/editor/EditorSettings';
import { ObjectPositionType } from '@/modules/application/l1/l2/l3/l4/types/object/ObjectPositionType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { MapObjectCurrentType } from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectCurrentType';
import {
  MapObjectsType,
  MapObjectType,
} from '@/modules/application/l1/l2/l3/map/mapObject/MapObjectType';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { debug } from 'debug';
import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { Rect } from 'konva/lib/shapes/Rect';
import { ChainType, FactoryType, GuestAwareType, GuestObjectType, SourceType } from 'patron-oop';

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
    private settings: GuestAwareType<EditorSettings>,
    private factories: {
      patronOnce: FactoryType<GuestObjectType>;
      guest: FactoryType<GuestObjectType>;
      cache: FactoryType<SourceType>;
      chain: FactoryType<ChainType>;
    },
  ) {
    mapObjectsVisible.objects(this);
  }

  public give(objects: MapObjectDocument[]): this {
    this.konvaLayer.layer(
      this.factories.patronOnce.create(
        this.factories.guest.create((layer: KonvaLayer) => {
          const chain = this.factories.chain.create();
          this.mapFile.currentMap(chain.receiveKey('map'));
          this.settings.value(chain.receiveKey('settings'));
          chain.result(
            this.factories.guest.create((props: { map: MapDocument; settings: EditorSettings }) => {
              const { map: latestMap, settings } = props;
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
                  draggable: !settings.readonly,
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
