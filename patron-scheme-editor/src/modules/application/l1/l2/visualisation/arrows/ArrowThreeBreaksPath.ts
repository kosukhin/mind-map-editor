import { MapObjectDocument } from "@/modules/application/l1/l2/l3/map/documents/MapStructures";
import { ArrowDepsDocumentWithType, ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { give, GuestAwareType, GuestCast, GuestType } from "patron-oop";

export class ArrowThreeBreaksPath implements GuestAwareType<ArrowPoints> {
  public constructor(private arrowDeps: GuestAwareType<ArrowDepsDocumentWithType>) { }

  public value(guest: GuestType<ArrowPoints>): this {
    this.arrowDeps.value(
      new GuestCast(guest, (value) => {
        if (value.type !== 'threeBreaks') {
          return;
        }

        const startPoint = this.points(value.fromObject, value.toObject);
        const endPoint = this.points(value.toObject, value.fromObject);
        give({
          key: value.fromObject.id + '-' + value.toObject.id,
          points: [
            +startPoint.point.x + startPoint.shift.x,
            +startPoint.point.y + startPoint.shift.y,
            +startPoint.breakPoint.x + startPoint.shift.x,
            +startPoint.breakPoint.y + startPoint.shift.y,
            +endPoint.breakPoint.x + endPoint.shift.x,
            +endPoint.breakPoint.y + endPoint.shift.y,
            +endPoint.point.x + endPoint.shift.x,
            +endPoint.point.y + endPoint.shift.y,
          ]
        }, guest);
      })
    )

    return this;
  }

  private points(fromObject: MapObjectDocument, toObject: MapObjectDocument) {
    const lookToMiddle = {
      x: +toObject.position[0] + Math.round(toObject.width / 2),
      y: +toObject.position[1] + Math.round(toObject.height / 2),
    };
    const shapeMiddle = {
      x: +fromObject.position[0] + Math.round(fromObject.width / 2),
      y: +fromObject.position[1] + Math.round(fromObject.height / 2),
    };
    const dx = shapeMiddle.x - lookToMiddle.x;
    const dy = shapeMiddle.y - lookToMiddle.y;
    const isModuleDYGreater = Math.abs(dy) > Math.abs(dx);
    let x = +fromObject.position[0];
    let y = +fromObject.position[1];

    const top = isModuleDYGreater && dy >= 0;
    const right = !isModuleDYGreater && dx >= 0;
    const bottom = isModuleDYGreater && dy < 0;
    const left = !isModuleDYGreater && dx < 0;

    const breakPoint = { x: 0, y: 0 };

    let shiftX = 0;
    let shiftY = 0;

    if (top) {
      x += Math.round(fromObject.width / 2);
      breakPoint.x = x;
      breakPoint.y = (fromObject.position[1] + toObject.position[1] + toObject.height) / 2;
      shiftX = toObject.position[0] > fromObject.position[0] ? 1 : -1;
    } else if (left) {
      y += Math.round(fromObject.height / 2);
      x += +fromObject.width;
      breakPoint.x = (fromObject.position[0] + fromObject.width + toObject.position[0]) / 2;
      breakPoint.y = y;
      shiftY = toObject.position[1] > fromObject.position[1] ? 1 : -1;
    } else if (bottom) {
      x += Math.round(fromObject.width / 2);
      y += +fromObject.height;
      breakPoint.x = x;
      breakPoint.y = (fromObject.position[1] + fromObject.height + toObject.position[1]) / 2;
      shiftX = toObject.position[1] > fromObject.position[1] ? 1 : -1;
    } else if (right) {
      y += Math.round(fromObject.height / 2);
      breakPoint.x = (fromObject.position[0] + toObject.position[0] + toObject.width) / 2;
      breakPoint.y = y;
      shiftY = toObject.position[1] > fromObject.position[1] ? 1 : -1;
    }

    return {
      point: { x, y },
      breakPoint,
      shift: {
        x: 0,
        y: 0,
      },
    };
  }
}
