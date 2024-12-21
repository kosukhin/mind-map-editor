import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { ArrowSamePointsGroups } from "@/modules/system/source/ArrowSamePointsGroups";
import { give, GuestAwareType, GuestCast, GuestChain, GuestType } from "patron-oop";

const gapSize = 15;

type ShiftPoint = {
  arrowIndex: number,
  pointStartIndex: number,
  breakPointStartIndex: number,
}

export class ArrowSamePointsGap implements GuestAwareType<ArrowPoints[]> {
  private pointGroups: ArrowSamePointsGroups;

  public constructor(private basePoints: GuestAwareType<ArrowPoints[]>) {
    this.pointGroups = new ArrowSamePointsGroups(basePoints);
  }

  public value(guest: GuestType<ArrowPoints[]>) {
    const chain = new GuestChain<{ pointGroups: Record<string, ShiftPoint[]>, basePoints: ArrowPoints[] }>();
    this.pointGroups.value(new GuestCast(guest, chain.receiveKey('pointGroups')));
    this.basePoints.value(new GuestCast(guest, chain.receiveKey('basePoints')));
    chain.result(
      new GuestCast(guest, ({ pointGroups, basePoints }) => {
        Object.values(pointGroups).forEach(s => {
          if (s.length <= 1) {
            return;
          }

          console.log('shift', s);

          s.forEach((point, index) => {
            const extraPointX = basePoints[point.arrowIndex].points[point.pointStartIndex];
            const extraPointY = basePoints[point.arrowIndex].points[point.pointStartIndex + 1];
            const breakPointX = basePoints[point.arrowIndex].points[point.breakPointStartIndex];
            const breakPointY = basePoints[point.arrowIndex].points[point.breakPointStartIndex + 1];

            const xShift = extraPointX > breakPointX ? -1 : extraPointX < breakPointX ? 1 : 0;
            const yShift = extraPointY > breakPointY ? -1 : extraPointY < breakPointY ? 1 : 0;

            console.log('xshift', xShift, extraPointX, breakPointX);
            console.log('yshift', yShift, extraPointY, breakPointY);

            if (xShift !== 0) {
              basePoints[point.arrowIndex].points[point.pointStartIndex + 1] = basePoints[point.arrowIndex].points[point.pointStartIndex + 1] + index * xShift * gapSize;
              basePoints[point.arrowIndex].points[point.breakPointStartIndex + 1] = basePoints[point.arrowIndex].points[point.breakPointStartIndex + 1] + index * xShift * gapSize;
            }

            if (yShift !== 0) {
              basePoints[point.arrowIndex].points[point.pointStartIndex] = basePoints[point.arrowIndex].points[point.pointStartIndex] + index * yShift * gapSize;
              basePoints[point.arrowIndex].points[point.breakPointStartIndex] = basePoints[point.arrowIndex].points[point.breakPointStartIndex] + index * yShift * gapSize;
            }
          })
        });

        give(basePoints, guest);
      })
    )

    return this;
  }
}
