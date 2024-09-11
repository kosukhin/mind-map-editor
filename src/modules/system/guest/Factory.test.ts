import { expect, test } from 'vitest';
import { Instance } from '@/modules/system/guest/Instance';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { Guest } from '@/modules/system/guest/Guest';

test('factory', () => {
  const sourceFactory = new Instance((value) => new FakeSource(value));

  const source = sourceFactory.create(42);

  source.data(new Guest((value) => {
    expect(value).toBe(42);
  }));
});
