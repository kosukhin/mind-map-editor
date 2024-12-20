import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { give, GuestAwareType, GuestCast, GuestType } from "patron-oop";

export class ArrowSamePointsGap implements GuestAwareType<ArrowPoints[]> {
  public constructor(private basePoints: GuestAwareType<ArrowPoints[]>) { }

  public value(guest: GuestType<ArrowPoints[]>) {
    const startGroups: Record<string, ArrowPoints[]> = {};
    const endGroups: Record<string, ArrowPoints[]> = {};

    this.basePoints.value(
      new GuestCast(guest, (points) => {
        points.forEach(point => {
          const startKey = '' + point.points.at(0) + point.points.at(1);
          if (!startGroups[startKey]) {
            startGroups[startKey] = [];
          }
          startGroups[startKey].push(point);
          const endKey = '' + point.points.at(-2) + point.points.at(-1);
          if (!endGroups[endKey]) {
            endGroups[endKey] = [];
          }
          endGroups[endKey].push(point);
        });

        Object.values(startGroups).forEach(s => {
          if (s.length <= 1) {
            return;
          }
          s.forEach((point, index) => {
            point.points[0] = point.points[0] + index * 10;
            point.points[1] = point.points[1] + index * 10;
            point.points[2] = point.points[0] + index * 10;
            point.points[3] = point.points[1] + index * 10;
          })
        });

        Object.values(endGroups).forEach(s => {
          if (s.length <= 1) {
            return;
          }
          s.forEach((point, index) => {
            const lastX = point.points.length - 2;
            const lastY = point.points.length - 1;
            const breakX = point.points.length - 4;
            const breakY = point.points.length - 3;
            point.points[lastX] = point.points[lastX] + index * 10;
            point.points[lastY] = point.points[lastY] + index * 10;
            point.points[breakX] = point.points[breakX] + index * 10;
            point.points[breakY] = point.points[breakY] + index * 10;
          })
        });

        give(points, guest);
      })
    )

    return this;
  }
}
