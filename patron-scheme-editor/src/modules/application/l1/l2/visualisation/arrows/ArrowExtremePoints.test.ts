import { ArrowExtremePoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowExtremePoints";
import { give, GuestAware } from "patron-oop";
import { expect, test } from "vitest";

test('ArrowExtremePoints.test', () => {
  const objects: any = {
    1: {
      id: 1,
      arrows: [
        { id: 2 },
        { id: 3 },
      ]
    },
    2: {
      id: 2,
      arrows: [
        { id: 1 },
      ]
    },
    3: {
      id: 3,
      arrows: []
    }
  };
  const points = new ArrowExtremePoints(
    new GuestAware((guest) => give(<any>Object.values(objects), guest)),
    new GuestAware((guest) => give(objects, guest))
  );

  points.value((arrows) => {
    expect(arrows.length).toBe(3);
    expect(arrows[0].fromObject.id).toBe(1);
    expect(arrows[0].toObject.id).toBe(2);
    expect(arrows[1].fromObject.id).toBe(1);
    expect(arrows[1].toObject.id).toBe(3);
    expect(arrows[2].fromObject.id).toBe(2);
    expect(arrows[2].toObject.id).toBe(1);
  });
});
