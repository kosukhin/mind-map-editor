import { MapObjectDocument } from "@/modules/application/l1/l2/l3/map/documents/MapStructures";
import { ArrowDepsDocumentWithType, ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { give, GuestAwareType, GuestCast, GuestType } from "patron-oop";

export class ArrowTwoBreaksPath implements GuestAwareType<ArrowPoints> {
  public constructor(private arrowDeps: GuestAwareType<ArrowDepsDocumentWithType>) { }

  public value(guest: GuestType<ArrowPoints>): this {
    this.arrowDeps.value(
      new GuestCast(guest, (value) => {
        if (value.type !== 'twoBreaks') {
          return;
        }

        give({
          key: value.fromObject.id + '-' + value.toObject.id,
          points: this.points(value.fromObject, value.toObject)
        }, guest);
      })
    )

    return this;
  }

  private points(fromObject: MapObjectDocument, toObject: MapObjectDocument) {
    const fo = {
      startHeight: fromObject.position[1],
      startWidth: fromObject.position[0],
      midHeight: fromObject.position[1] + Math.round(fromObject.height / 2),
      midWidth: fromObject.position[0] + Math.round(fromObject.width / 2),
      fullHeight: fromObject.position[1] + fromObject.height,
      fullWidth: fromObject.position[0] + fromObject.width,
    };
    const to = {
      startHeight: toObject.position[1],
      startWidth: toObject.position[0],
      midHeight: toObject.position[1] + Math.round(toObject.height / 2),
      midWidth: toObject.position[0] + Math.round(toObject.width / 2),
      fullHeight: toObject.position[1] + toObject.height,
      fullWidth: toObject.position[0] + toObject.width,
    };

    const calcPosition = {
      'left-top': () => fo.fullWidth < to.startWidth && fo.fullHeight < to.startHeight,
      'right-top': () => to.fullWidth < fo.startWidth && fo.fullHeight < to.startHeight,
      'left-bottom': () => fo.fullWidth < to.startWidth && to.fullHeight < fo.startHeight,
      'right-bottom': () => to.fullWidth < fo.startWidth && to.fullHeight < fo.startHeight,
    } as const;

    const calcPoints = {
      'left-top': () => [fo.fullWidth, fo.midHeight, to.midWidth, fo.midHeight, to.midWidth, to.startHeight],
      'right-top': () => [fo.startWidth, fo.midHeight, to.midWidth, fo.midHeight, to.midWidth, to.startHeight
      ],
      'left-bottom': () => [fo.fullWidth, fo.midHeight, to.midWidth, fo.midHeight, to.midWidth, to.fullHeight],
      'right-bottom': () => [fo.startWidth, fo.midHeight, to.midWidth, fo.midHeight, to.midWidth, to.fullHeight],
    } as const;

    const position = Object.entries(calcPosition).reduce((acc, [pos, posCondition]) => {
      if (posCondition()) {
        acc = pos
      }
      return acc;
    }, 'left-top' as string) as keyof typeof calcPoints;

    return calcPoints[position]();
  }
}
