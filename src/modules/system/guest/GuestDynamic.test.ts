import { expect, test } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';

test('guest dynamic', () => {
  const one = new FakeSource(1);

  one.data(new GuestDynamic((value) => {
    expect(value).toBe(1);
  }));
});
