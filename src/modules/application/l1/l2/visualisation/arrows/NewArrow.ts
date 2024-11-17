import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import {
  GuestAwareType, FactoryType, SourceType, GuestObjectType,
  removePatronFromPools,
} from 'patron-oop';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { LayerBase } from '@/modules/application/l1/l2/l3/types/LayerBase';
import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { ArrowPathType } from '@/modules/application/l1/l2/l3/l4/types/arrow/ArrowPathType';
import { Arrow } from 'konva/lib/shapes/Arrow';
import { debug } from 'debug';

const localDebug = debug('NewArrow');

const arrowGeometry = {
  width: 10,
  height: 10,
};

/**
 * Новая стрелка, появляется при создании новой связи
 */
export class NewArrow {
  private cursorGuest: SourceType<GuestObjectType>;

  private arrowCache: SourceType;

  public constructor(
    private konvaLayer: LayerBase,
    private cursorPosition: GuestAwareType<PointDocument>,
    private arrowPath: ArrowPathType,
    private factories: {
      cache: FactoryType<SourceType>,
      patron: FactoryType<GuestObjectType>,
      guest: FactoryType<GuestObjectType>,
    },
  ) {
    this.cursorGuest = this.factories.cache.create(this);
    this.arrowCache = this.factories.cache.create(this);
  }

  /**
   * Создать новую стрелку для объекта
   */
  public forObject(object: MapObjectDocument) {
    localDebug('start watch cursor');
    this.cursorGuest.value(
      this.factories.guest.create((guest: GuestObjectType) => {
        removePatronFromPools(guest);
      }),
    );

    let arrow: Arrow | null = null;
    const patron = this.factories.patron.create(
      this.factories.guest.create((cursorPosition: PointDocument) => {
        localDebug('cursor moves');
        this.konvaLayer.layer(
          this.factories.guest.create((layer: KonvaLayer) => {
            localDebug('cursor moves in layer');
            // TODO сделать отрисовку стрелки
            this.arrowPath.breakPoints(
              {
                shapeGeometry: {
                  width: object.width,
                  height: object.height,
                },
                shapePosition: {
                  x: object.position[0],
                  y: object.position[1],
                },
                lookToGeometry: arrowGeometry,
                lookToPosition: cursorPosition,
              },
              {
                lookToGeometry: {
                  width: object.width,
                  height: object.height,
                },
                lookToPosition: {
                  x: object.position[0],
                  y: object.position[1],
                },
                shapeGeometry: arrowGeometry,
                shapePosition: cursorPosition,
              },
              this.factories.guest.create((points: number[]) => {
                if (arrow) {
                  arrow.points(points);
                  return;
                }
                arrow = new Arrow({
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
                layer.add(arrow);
                this.arrowCache.give(arrow);
              }),
            );
          }),
        );
        this.arrowPath.clear();
      }),
    );
    this.cursorPosition.value(patron);
    this.cursorGuest.give(patron);
  }

  /**
   * Отмена стрелки
   */
  public dispose() {
    this.cursorGuest.value(
      this.factories.guest.create((guest: GuestObjectType) => {
        removePatronFromPools(guest);
      }),
    );
    this.arrowCache.value(
      this.factories.guest.create((arrow: Arrow) => {
        arrow.remove();
      }),
    );
  }
}
