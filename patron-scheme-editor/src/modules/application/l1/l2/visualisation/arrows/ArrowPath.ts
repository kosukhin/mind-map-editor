import {
  ArrowPathType,
  ArrowPointDocument,
} from '@/modules/application/l1/l2/l3/l4/types/arrow/ArrowPathType';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { GuestObjectType } from 'patron-oop';

/**
 * Путь между двумя объектами
 */
export class ArrowPath implements ArrowPathType {
  private filledPoints = new Map();

  public clear() {
    this.filledPoints.clear();
  }

  public breakPoints(
    fromPoint: ArrowPointDocument,
    toPoint: ArrowPointDocument,
    pointsGuest: GuestObjectType<number[]>,
  ): this {
    const startPoint = this.arrowPointPosition(
      fromPoint.shapeGeometry,
      fromPoint.shapePosition,
      fromPoint.lookToGeometry,
      fromPoint.lookToPosition,
    );
    const endPoint = this.arrowPointPosition(
      toPoint.shapeGeometry,
      toPoint.shapePosition,
      toPoint.lookToGeometry,
      toPoint.lookToPosition,
    );

    pointsGuest.give([
      +startPoint.point.x + startPoint.shift.x,
      +startPoint.point.y + startPoint.shift.y,
      +startPoint.breakPoint.x + startPoint.shift.x,
      +startPoint.breakPoint.y + startPoint.shift.y,
      +endPoint.breakPoint.x + endPoint.shift.x,
      +endPoint.breakPoint.y + endPoint.shift.y,
      +endPoint.point.x + endPoint.shift.x,
      +endPoint.point.y + endPoint.shift.y,
    ]);

    return this;
  }

  private arrowPointPosition(
    shapeGeometry: SizeDocument,
    shapePosition: PointDocument,
    lookToGeometry: SizeDocument,
    lookToPosition: PointDocument,
  ) {
    return this.arrowPointPositionNear(
      shapeGeometry,
      shapePosition,
      lookToGeometry,
      lookToPosition
    );
  }

  private arrowPointPositionNear(
    shapeGeometry: SizeDocument,
    shapePosition: PointDocument,
    lookToGeometry: SizeDocument,
    lookToPosition: PointDocument,
  ) {
    const lookToMiddle = {
      x: +lookToPosition.x + Math.round(lookToGeometry.width / 2),
      y: +lookToPosition.y + Math.round(lookToGeometry.height / 2),
    };
    const shapeMiddle = {
      x: +shapePosition.x + Math.round(shapeGeometry.width / 2),
      y: +shapePosition.y + Math.round(shapeGeometry.height / 2),
    };
    const dx = shapeMiddle.x - lookToMiddle.x;
    const dy = shapeMiddle.y - lookToMiddle.y;
    const isModuleDYGreater = Math.abs(dy) > Math.abs(dx);
    let x = +shapePosition.x;
    let y = +shapePosition.y;

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
      breakPoint.y = (shapePosition.y + lookToPosition.y + lookToGeometry.height) / 2;
      shiftX = lookToPosition.x > shapePosition.x ? 1 : -1;
    } else if (left) {
      y += Math.round(shapeGeometry.height / 2);
      x += +shapeGeometry.width;
      breakPoint.x = (shapePosition.x + shapeGeometry.width + lookToPosition.x) / 2;
      breakPoint.y = y;
      shiftY = lookToPosition.y > shapePosition.y ? 1 : -1;
    } else if (bottom) {
      x += Math.round(shapeGeometry.width / 2);
      y += +shapeGeometry.height;
      breakPoint.x = x;
      breakPoint.y = (shapePosition.y + shapeGeometry.height + lookToPosition.y) / 2;
      shiftX = lookToPosition.x > shapePosition.x ? 1 : -1;
    } else if (right) {
      y += Math.round(shapeGeometry.height / 2);
      breakPoint.x = (shapePosition.x + lookToPosition.x + lookToGeometry.width) / 2;
      breakPoint.y = y;
      shiftY = lookToPosition.y > shapePosition.y ? 1 : -1;
    }

    const pointKey = [x, y].join('-');
    const pointsCount = this.filledPoints.get(pointKey) || 0;
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
