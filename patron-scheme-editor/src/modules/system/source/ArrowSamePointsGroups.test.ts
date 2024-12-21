import { ArrowPoints } from "@/modules/application/l1/l2/visualisation/arrows/ArrowType";
import { ArrowSamePointsGroups } from "@/modules/system/source/ArrowSamePointsGroups";
import { Source } from "patron-oop";
import { expect, test } from "vitest";

test('ArrowSamePointsGroups.test', () => {
  const source = new Source(<ArrowPoints[]>[
    {
      key: 'one',
      points: [10, 20, 30, 40, 50, 60],
    },
    {
      key: 'two',
      points: [10, 20, 30, 40, 70, 80],
    },
  ]);

  const pointGroups = new ArrowSamePointsGroups(source);
  pointGroups.value((v) => {
    expect(v['1020'].length).toBe(2)
  })
});
