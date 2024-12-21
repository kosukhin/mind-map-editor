import { ArrowTwoBreaksPath } from "@/modules/application/l1/l2/visualisation/arrows/ArrowTwoBreaksPath";
import { give, GuestAware } from "patron-oop";
import { expect, test } from "vitest";

test('ArrowTwoBreaksPath.test', () => {
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
      type: 'twoBreaks',
    }, guest)
  });

  const arrow = new ArrowTwoBreaksPath(deps);

  arrow.value((arrowPath) => {
    expect(JSON.stringify(arrowPath.points)).toBe('[100,50,250,50,250,200]');
  })
})
