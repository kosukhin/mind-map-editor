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
import { CacheType } from '@/modules/system/guest/CacheType';

const localDebug = debug('MapObjectsArrowsPatron');

type ChainParamsType = {layer: KonvaLayer, map: MapDocument, objects: MapObjectDocument[]};

export class MapObjectsArrows implements GuestType<MapObjectDocument[]> {
  private previouslyRenderedArrows = new Map();

  private filledPoints = new Map();

  private visibleObjectsCache: CacheType<MapObjectDocument[]>;

  public constructor(
    private konvaLayer: LayerBase,
    private mapFile: MapFileType,
    private factories: {
      patron: FactoryType<GuestType>,
      guest: FactoryType<GuestType>,
      chain: FactoryType<ChainType>,
      cache: FactoryType<CacheType>
    },
  ) {
    localDebug('draw arrows on canvas');
    const chain = this.factories.chain.create();
    this.visibleObjectsCache = this.factories.cache.create(this);

    this.konvaLayer.layer(this.factories.patron.create(chain.receiveKey('layer')));
    this.mapFile.currentMap(this.factories.patron.create(chain.receiveKey('map')));
    this.visibleObjectsCache.receiving(this.factories.patron.create(chain.receiveKey('objects')));

    chain.result(this.factories.patron.create(
      this.factories.guest.create(debounce(({ layer, map, objects }: ChainParamsType) => {
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
            +startPoint.point.x + startPoint.shift.x,
            +startPoint.point.y + startPoint.shift.y,
            +startPoint.breakPoint.x + startPoint.shift.x,
            +startPoint.breakPoint.y + startPoint.shift.y,
            +endPoint.breakPoint.x + endPoint.shift.x,
            +endPoint.breakPoint.y + endPoint.shift.y,
            +endPoint.point.x + endPoint.shift.x,
            +endPoint.point.y + endPoint.shift.y,
          ];
          const arrowKey = points.join('-');
          const arrowId = [fromObject.id, toObject.id].join('-');
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
          });
          this.previouslyRenderedArrows.set(arrowId, {
            arrow,
            arrowKey,
          });
          layer.add(arrow);
        };

        this.filledPoints.clear();
        objects.forEach((object) => {
          if (!object.arrows) {
            return;
          }

          // this.previouslyRenderedArrows.forEach((arrow) => {
          //   arrow.arrow.hide();
          // });
          localDebug('visible objects', objects.length);
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
  }

  public receive(objects: MapObjectDocument[]): this {
    this.visibleObjectsCache.receive(objects);
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
  ) {
    const lookToMiddle = {
      x: lookToPosition.x + Math.round(lookToGeometry.width / 2),
      y: lookToPosition.y + Math.round(lookToGeometry.height / 2),
    };
    const shapeMiddle = {
      x: shapePosition.x + Math.round(shapeGeometry.width / 2),
      y: shapePosition.y + Math.round(shapeGeometry.height / 2),
    };
    const dx = shapeMiddle.x - lookToMiddle.x;
    const dy = shapeMiddle.y - lookToMiddle.y;
    const isModuleDYGreater = Math.abs(dy) > Math.abs(dx);
    let { x, y } = shapePosition;

    const top = isModuleDYGreater && dy >= 0;
    const right = !isModuleDYGreater && dx >= 0;
    const bottom = isModuleDYGreater && dy < 0;
    const left = !isModuleDYGreater && dx < 0;

    const breakPoint = { x: 0, y: 0 };

    let shiftX = 0;
    let shiftY = 0;

    if (top) {
      x += Math.round(shapeGeometry.width / 2);
      breakPoint.x = x;
      breakPoint.y = (lookToMiddle.y + shapeMiddle.y) / 2;
      shiftX = lookToPosition.x > shapePosition.x ? 1 : -1;
    } else if (left) {
      y += Math.round(shapeGeometry.height / 2);
      x += shapeGeometry.width;
      breakPoint.x = (lookToMiddle.x + shapeMiddle.x) / 2;
      breakPoint.y = y;
      shiftY = lookToPosition.y > shapePosition.y ? 1 : -1;
    } else if (bottom) {
      x += Math.round(shapeGeometry.width / 2);
      y += shapeGeometry.height;
      breakPoint.x = x;
      breakPoint.y = (lookToMiddle.y + shapeMiddle.y) / 2;
      shiftX = lookToPosition.x > shapePosition.x ? 1 : -1;
    } else if (right) {
      y += Math.round(shapeGeometry.height / 2);
      breakPoint.x = (lookToMiddle.x + shapeMiddle.x) / 2;
      breakPoint.y = y;
      shiftY = lookToPosition.y > shapePosition.y ? 1 : -1;
    }

    const pointKey = [x, y].join('-');
    const pointsCount = this.filledPoints.get((pointKey)) || 0;
    this.filledPoints.set(pointKey, pointsCount + 1);

    return {
      point: { x, y },
      breakPoint,
      shift: {
        x: shiftX * pointsCount * 10,
        y: shiftY * pointsCount * 10,
      },
    };
  }
}
