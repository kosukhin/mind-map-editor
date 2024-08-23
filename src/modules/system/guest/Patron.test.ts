import { expect, test } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';
import { Patron } from '@/modules/system/guest/Patron';

test('patron always guest', () => {
  const one = new FakeSource(1);
  let patronCalledTimes = 0;
  const patron = new Patron(new GuestDynamic(() => {
    patronCalledTimes += 1;
  }));
  one.data(patron);
  one.receive(2);

  queueMicrotask(() => {
    expect(patronCalledTimes).toBe(2);
  });
});
