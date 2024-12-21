import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { ArrowSamePointsGroups, ShiftPoint } from "@/modules/system/source/ArrowSamePointsGroups";
import { give, GuestAwareType, GuestCast, GuestChain, GuestType } from "patron-oop";

const gapSize = 15;

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

          s.sort((b, a) => basePoints[a.arrowIndex].points[a.pointEndIndex] - basePoints[b.arrowIndex].points[b.pointEndIndex])

          let nIndex = 0;
          let pIndex = 0;
          s.forEach((point, index) => {
            const extraPointX = basePoints[point.arrowIndex].points[point.pointStartIndex];
            const extraPointY = basePoints[point.arrowIndex].points[point.pointStartIndex + 1];
            const endPointX = basePoints[point.arrowIndex].points[point.pointEndIndex];
            const endPointY = basePoints[point.arrowIndex].points[point.pointEndIndex + 1];
            const breakPointX = basePoints[point.arrowIndex].points[point.breakPointStartIndex];
            const breakPointY = basePoints[point.arrowIndex].points[point.breakPointStartIndex + 1];

            const xShift = extraPointX > breakPointX ? -1 : extraPointX < breakPointX ? 1 : 0;
            const yShift = extraPointY > breakPointY ? -1 : extraPointY < breakPointY ? 1 : 0;
            const xShiftEnd = extraPointX > endPointX ? -1 : extraPointX < endPointX ? 1 : 0;
            const yShiftEnd = extraPointY > endPointY ? -1 : extraPointY < endPointY ? 1 : 0;

            if (xShift !== 0) {
              let theIndex = 0;
              if (index !== 0) {
                if (yShiftEnd > 0) {
                  pIndex += 1;
                  theIndex = pIndex;
                } else {
                  nIndex += 1;
                  theIndex = nIndex;
                }
              }
              if (yShiftEnd)
                basePoints[point.arrowIndex].points[point.pointStartIndex + 1] = basePoints[point.arrowIndex].points[point.pointStartIndex + 1] + theIndex * yShiftEnd * gapSize;
              basePoints[point.arrowIndex].points[point.breakPointStartIndex + 1] = basePoints[point.arrowIndex].points[point.breakPointStartIndex + 1] + theIndex * yShiftEnd * gapSize;
            }

            if (yShift !== 0) {
              let theIndex = 0;
              if (index !== 0) {
                if (xShiftEnd > 0) {
                  pIndex += 1;
                  theIndex = pIndex;
                } else {
                  nIndex += 1;
                  theIndex = nIndex;
                }
              }
              basePoints[point.arrowIndex].points[point.pointStartIndex] = basePoints[point.arrowIndex].points[point.pointStartIndex] + theIndex * xShiftEnd * gapSize;
              basePoints[point.arrowIndex].points[point.breakPointStartIndex] = basePoints[point.arrowIndex].points[point.breakPointStartIndex] + theIndex * xShiftEnd * gapSize;
            }
          })
        });

        give(basePoints, guest);
      })
    )

    return this;
  }
}
