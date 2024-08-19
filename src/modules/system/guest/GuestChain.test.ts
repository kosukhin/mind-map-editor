import { expect, test } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';

test('chain guest returns 2 values', () => {
  const one = new FakeSource(1);
  const two = new FakeSource(2);
  const chain = new GuestChain(2);
  chain.result(new GuestDynamic((value) => {
    expect(value.join()).toBe('1,2');
  }));
  one.data(chain);
  two.data(chain);
});

test('chain guest too many receives', () => {
  const one = new FakeSource(1);
  const two = new FakeSource(2);
  const chain = new GuestChain(1);
  chain.result(new GuestDynamic((value) => {
    expect(value.join()).toBe('1');
  }));
  one.data(chain);
  expect(() => two.data(chain)).toThrowError();
});
