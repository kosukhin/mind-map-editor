import { expect, test } from 'vitest';
import { Factory } from '@/modules/system/guest/Factory';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { Visitant } from '@/modules/system/guest/Visitant';

test('factory', () => {
  const sourceFactory = new Factory((value) => new FakeSource(value));

  const source = sourceFactory.create(42);

  source.data(new Visitant((value) => {
    expect(value).toBe(42);
  }));
});
