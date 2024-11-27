import { SourceDynamic } from '@/modules/system/source/SourceDynamic';
import { Source } from 'patron-oop';
import { expect, test } from 'vitest';

test('SourceDynamic.ofSource.test', () => {
  const source = new Source(1);
  const sourceDynamic = new SourceDynamic(source, source);

  sourceDynamic.value((value) => {
    expect(value).toBe(1);
  });

  sourceDynamic.give(2);

  sourceDynamic.value((value) => {
    expect(value).toBe(2);
  });
});
