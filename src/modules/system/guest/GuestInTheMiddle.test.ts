import { test, expect } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { Visitant } from '@/modules/system/guest/Visitant';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';
import { Patron } from '@/modules/system/guest/Patron';
import { GuestChain } from '@/modules/system/guest/GuestChain';

test('test guest in the middle', () => {
  const one = new FakeSource(1);

  let accumValue = 0;
  const guest = new Visitant((value: number) => {
    accumValue += value;
  });
  one.data(new GuestInTheMiddle(guest, (value) => {
    guest.receive(value + 3);
  }));

  expect(accumValue).toBe(4);
});

test('test patron in the middle', () => {
  const one = new FakeSource(1);

  let accumValue = 0;
  const guest = new Patron(new Visitant((value: number) => {
    accumValue += value;
  }));
  one.data(new GuestInTheMiddle(guest, (value) => {
    guest.receive(value + 3);
  }));
  one.receive(3);
  one.receive(3);

  expect(accumValue).toBe(16);
});

test('test chain in the middle', () => {
  const one = new FakeSource(1);
  const two = new FakeSource(2);
  const chain = new GuestChain<any>();

  one.data(new Patron(chain.receiveKey('one')));
  two.data(new Patron(chain.receiveKey('two')));

  one.receive(3);
  one.receive(4);

  const guest = new Patron(new Visitant((value: any) => {
    expect(Object.values(value).length).toBe(3);
  }));

  chain.result(new GuestInTheMiddle(guest, (value) => {
    guest.receive({ ...value, three: 99 });
  }));
});
