import { ArrowThreeBreaksPath } from "@/modules/application/l1/l2/visualisation/arrows/ArrowThreeBreaksPath";
import { give, GuestAware } from "patron-oop";
import { expect, test } from "vitest";

test('ArrowThreeBreaksPath.test', () => {
  const deps = new GuestAware((guest) => {
    give({
      fromObject: {
        width: 100,
        height: 100,
        position: [0, 0]
      },
      toObject: {
        width: 100,
        height: 100,
        position: [200, 200]
      },
      type: 'threeBreaks',
    }, guest)
  });

  const arrow = new ArrowThreeBreaksPath(deps);

  arrow.value((points) => {
    expect(JSON.stringify(points.points)).toBe('[100,50,150,50,150,250,200,250]');
  })
})
