import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { ArrowSamePointsGap } from "@/modules/system/source/ArrowSamePointsGap";
import { Source } from "patron-oop";
import { expect, test } from "vitest";

test('ArrowSamePointsGap.test', () => {
  const source = new Source(<ArrowPoints[]>[
    {
      key: 'one',
      points: [10, 20, 10, 40, 50, 60],
    },
    {
      key: 'two',
      points: [10, 20, 10, 40, 70, 80],
    },
  ]);
  const pointsWithGap = new ArrowSamePointsGap(source);
  pointsWithGap.value((v) => {
    expect(v[1].points[0]).toBe(25);
  })
});
