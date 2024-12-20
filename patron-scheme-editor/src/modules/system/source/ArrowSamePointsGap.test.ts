import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { ArrowSamePointsGap } from "@/modules/system/source/ArrowSamePointsGap";
import { Source } from "patron-oop";
import { test } from "vitest";

test('ArrowSamePointsGap.test', () => {
  const source = new Source(<ArrowPoints[]>[
    {
      key: 'one',
      points: [1, 2, 3, 4, 5, 6],
    },
    {
      key: 'two',
      points: [1, 2, 3, 4, 7, 8],
    },
    {
      key: 'three',
      points: [11, 22, 3, 4, 55, 66],
    },
    {
      key: 'four',
      points: [111, 222, 3, 4, 55, 66],
    },
  ]);
  const pointsWithGap = new ArrowSamePointsGap(source);
  pointsWithGap.value((v) => {
    console.log(v);
  })
});
