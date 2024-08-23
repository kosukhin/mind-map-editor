import { expect, test } from 'vitest';
import { Visitant } from '@/modules/system/guest/Visitant';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { Patron } from '@/modules/system/guest/Patron';

test('patron pool', () => {
  const pool = new PatronPool(null);
  let receivedCount = 0;

  pool.add(new Patron(new Visitant<number>((value) => {
    receivedCount += value;
  })));
  pool.add(new Patron(new Visitant<number>((value) => {
    receivedCount += value;
  })));
  pool.receive(2);

  expect(receivedCount).toBe(4);
});
