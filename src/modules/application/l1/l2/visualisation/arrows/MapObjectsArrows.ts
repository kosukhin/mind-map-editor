import {
  GuestObjectType, FactoryType, ChainType, SourceType,
} from 'patron-oop';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { debug } from 'debug';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { Arrow } from 'konva/lib/shapes/Arrow';
import { throttle } from 'lodash';
import { MapType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapType';
import { ArrowPathType } from '@/modules/application/l1/l2/l3/l4/types/arrow/ArrowPathType';

const localDebug = debug('MapObjectsArrows');

type ChainParamsType = {layer: KonvaLayer, map: MapDocument, objects: MapObjectDocument[]};

/**
 * Объект для отрисовки стрелок на конве
 */
export class MapObjectsArrows {
  private previouslyRenderedArrows = new Map();

  public constructor(
    private konvaLayer: LayerBase,
    private mapFile: MapFileType,
    private mapDep: MapType,
    private arrowPath: ArrowPathType,
    private factories: {
      patron: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
      chain: FactoryType<ChainType>,
      cache: FactoryType<CacheType>
    },
  ) {
    localDebug('draw arrows on canvas');
    const chain = this.factories.chain.create();

    this.konvaLayer.layer(this.factories.patron.create(chain.receiveKey('layer')));
    this.mapFile.currentMap(this.factories.patron.create(chain.receiveKey('map')));
    this.mapDep.objects(this.factories.patron.create(chain.receiveKey('objects')));

    chain.result(this.factories.patron.create(
      this.factories.guest.create(throttle(({ layer, map, objects }: ChainParamsType) => {
        const updateArrow = (
          fromObject: MapObjectDocument,
          toObject: MapObjectDocument,
        ) => {
          const toObjectType = map.types[toObject.type];

          this.arrowPath.breakPoints(
            {
              shapeGeometry: {
                width: fromObject.width,
                height: fromObject.height,
              },
              shapePosition: {
                x: fromObject.position[0],
                y: fromObject.position[1],
              },
              lookToGeometry: {
                width: toObject.width,
                height: toObject.height,
              },
              lookToPosition: {
                x: toObject.position[0],
                y: toObject.position[1],
              },
            },
            {
              shapeGeometry: {
                width: toObject.width || toObjectType.width,
                height: toObject.height || toObjectType.height,
              },
              shapePosition: {
                x: toObject.position[0],
                y: toObject.position[1],
              },
              lookToGeometry: {
                width: fromObject.width,
                height: fromObject.height,
              },
              lookToPosition: {
                x: fromObject.position[0],
                y: fromObject.position[1],
              },
            },
            this.factories.guest.create((points: number[]) => {
              const arrowKey = points.join('-');
              const arrowId = [fromObject.id, toObject.id].join('-');
              localDebug('points', points);
              localDebug(fromObject, toObject);

              if (this.previouslyRenderedArrows.has(arrowId)) {
                const savedArrow = this.previouslyRenderedArrows.get(arrowId);

                savedArrow.arrow.show();
                savedArrow.arrow.points(points);
                return;
              }

              const arrow = new Arrow({
                x: 0,
                y: 0,
                points,
                pointerLength: 20,
                pointerWidth: 10,
                fill: '#ccc',
                stroke: '#bbb',
                strokeWidth: 2,
                zIndex: 2,
              });
              this.previouslyRenderedArrows.set(arrowId, {
                arrow,
                arrowKey,
              });
              layer.add(arrow);
            }),
          );
        };

        this.arrowPath.clear();
        this.previouslyRenderedArrows.forEach((arrow) => arrow.arrow.hide());
        objects.forEach((object) => {
          if (!object.arrows) {
            return;
          }

          localDebug('visible objects', objects.length);
          object.arrows.forEach((toObjectRelation) => {
            const toObject = objects.find((mbObject) => mbObject.id === toObjectRelation.id) || map.objects[toObjectRelation.id];
            if (!toObject) {
              return;
            }

            updateArrow(object, toObject);
          });
        });
      }, 50)),
    ));
  }

  public introduction() {
    return 'patron' as const;
  }
}
