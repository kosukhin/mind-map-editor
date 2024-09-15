import { expect, test } from 'vitest';
import { Factory } from '@/modules/system/guest/Factory';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { Guest } from '@/modules/system/guest/Guest';

test('factory', () => {
  const sourceFactory = new Factory((value) => new FakeSource(value));

  const source = sourceFactory.create(42);

  source.data(new Guest((value) => {
    expect(value).toBe(42);
  }));
});
