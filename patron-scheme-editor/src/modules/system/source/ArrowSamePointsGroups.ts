import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { give, GuestAwareType, GuestCast, GuestType } from "patron-oop";

export type ShiftPoint = {
  arrowIndex: number,
  pointStartIndex: number,
  pointEndIndex: number,
  breakPointStartIndex: number,
};

export class ArrowSamePointsGroups implements GuestAwareType<Record<string, ShiftPoint[]>> {
  public constructor(private basePoints: GuestAwareType<ArrowPoints[]>) { }

  public value(guest: GuestType<Record<string, ShiftPoint[]>>) {

    this.basePoints.value(
      new GuestCast(guest, (points) => {
        const pointGroups: Record<string, ShiftPoint[]> = {};

        points.forEach((point, index) => {
          const startKey = '' + point.points.at(0) + point.points.at(1);
          if (!pointGroups[startKey]) {
            pointGroups[startKey] = [];
          }
          pointGroups[startKey].push({
            arrowIndex: index,
            pointStartIndex: 0,
            breakPointStartIndex: 2,
            pointEndIndex: point.points.length - 2,
          });
          const endKey = '' + point.points.at(-2) + point.points.at(-1);
          if (!pointGroups[endKey]) {
            pointGroups[endKey] = [];
          }
          pointGroups[endKey].push({
            arrowIndex: index,
            pointStartIndex: point.points.length - 2,
            breakPointStartIndex: point.points.length - 4,
            pointEndIndex: 0,
          });
        });

        give(pointGroups, guest);
      })
    )

    return this;
  }
}
