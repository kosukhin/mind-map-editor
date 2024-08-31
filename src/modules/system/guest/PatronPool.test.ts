import { expect, test } from 'vitest';
import { Guest } from '@/modules/system/guest/Guest';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { Patron } from '@/modules/system/guest/Patron';

test('patron pool', () => {
  const pool = new PatronPool(null);
  let receivedCount = 0;

  pool.add(new Patron(new Guest<number>((value) => {
    receivedCount += value;
  })));
  pool.add(new Patron(new Guest<number>((value) => {
    receivedCount += value;
  })));
  pool.receive(2);

  expect(receivedCount).toBe(4);
});
