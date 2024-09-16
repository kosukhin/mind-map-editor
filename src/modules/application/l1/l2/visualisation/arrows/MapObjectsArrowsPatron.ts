import { GuestType } from '@/modules/system/guest/GuestType';
import {
  MapDocument,
  MapObjectDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { FactoryType } from '@/modules/system/guest/FactoryType';
import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { debug } from 'debug';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { ChainType } from '@/modules/system/guest/ChainType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { Arrow } from 'konva/lib/shapes/Arrow';
import debounce from 'lodash/debounce';

const localDebug = debug('MapObjectsArrowsPatron');

type ChainParamsType = {layer: KonvaLayer, map: MapDocument};

export class MapObjectsArrowsPatron implements GuestType<MapObjectDocument[]> {
  private previouslyRenderedArrows = new Map();

  public constructor(
    private konvaLayer: LayerBase,
    private mapFile: MapFileType,
    private factories: {
      patronOnce: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
      chain: FactoryType<ChainType>
    },
  ) {}

  public receive(objects: MapObjectDocument[]): this {
    localDebug('draw arrows on canvas');
    const chain = this.factories.chain.create();
    setTimeout(() => {
      this.konvaLayer.layer(this.factories.patronOnce.create(chain.receiveKey('layer')));
      this.mapFile.currentMap(this.factories.patronOnce.create(chain.receiveKey('map')));
      chain.result(this.factories.patronOnce.create(
        this.factories.guest.create(debounce(({ layer, map }: ChainParamsType) => {
          const updateArrow = (
            fromObject: MapObjectDocument,
            toObject: MapObjectDocument,
          ) => {
            const toObjectType = map.types[toObject.type];

            const startPoint = this.arrowPointPosition(
              {
                width: fromObject.width,
                height: fromObject.height,
              },
              {
                x: fromObject.position[0],
                y: fromObject.position[1],
              },
              {
                width: toObject.width,
                height: toObject.height,
              },
              {
                x: toObject.position[0],
                y: toObject.position[1],
              },
            );
            const endPoint = this.arrowPointPosition(
              {
                width: toObject.width || toObjectType.width,
                height: toObject.height || toObjectType.height,
              },
              {
                x: toObject.position[0],
                y: toObject.position[1],
              },
              {
                width: fromObject.width,
                height: fromObject.height,
              },
              {
                x: fromObject.position[0],
                y: fromObject.position[1],
              },
            );

            const points = [
              +startPoint.x,
              +startPoint.y,
              +endPoint.x,
              +endPoint.y,
            ];
            const arrowKey = points.join('-');
            const arrowId = [fromObject.id, toObject.id].join('-');
            localDebug(fromObject, toObject);

            if (this.previouslyRenderedArrows.has(arrowId)) {
              const savedArrow = this.previouslyRenderedArrows.get(arrowId);

              savedArrow.arrow.remove();
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
            });
            this.previouslyRenderedArrows.set(arrowId, {
              arrow,
              arrowKey,
            });
            layer.add(arrow);
          };

          objects.forEach((object) => {
            if (!object.arrows) {
              return;
            }

            object.arrows.forEach((toObjectRelation) => {
              const toObject = map.objects[toObjectRelation.id];
              if (!toObject) {
                return;
              }

              updateArrow(object, toObject);
            });
          });
        }, 100)),
      ));
    }, 200);
    return this;
  }

  public introduction() {
    return 'patron' as const;
  }

  private arrowPointPosition(
    shapeGeometry: SizeDocument,
    shapePosition: PointDocument,
    lookToGeometry: SizeDocument,
    lookToPosition: PointDocument,
  ): PointDocument {
    const dx = (shapePosition.x + Math.round(shapeGeometry.width / 2)) - (lookToPosition.x + Math.round(lookToGeometry.width / 2));
    const dy = (shapePosition.y + Math.round(shapeGeometry.height / 2)) - (lookToPosition.y + Math.round(lookToGeometry.height / 2));
    const isModuleDYGreater = Math.abs(dy) > Math.abs(dx);
    let { x, y } = shapePosition;

    const top = isModuleDYGreater && dy >= 0;
    const right = !isModuleDYGreater && dx >= 0;
    const bottom = isModuleDYGreater && dy < 0;
    const left = !isModuleDYGreater && dx < 0;

    if (top) {
      x += Math.round(shapeGeometry.width / 2);
    } else if (left) {
      y += Math.round(shapeGeometry.height / 2);
      x += shapeGeometry.width;
    } else if (bottom) {
      x += Math.round(shapeGeometry.width / 2);
      y += shapeGeometry.height;
    } else if (right) {
      y += Math.round(shapeGeometry.height / 2);
    }

    return { x, y };
  }
}
