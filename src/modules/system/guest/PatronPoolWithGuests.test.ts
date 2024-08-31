import { expect, test } from 'vitest';
import { Guest } from '@/modules/system/guest/Guest';
import { Patron } from '@/modules/system/guest/Patron';
import { PatronPoolWithGuests } from '@/modules/system/guest/PatronPoolWithGuests';

test('patron pool with guests', () => {
  const pool = new PatronPoolWithGuests(null);
  let receivedCount = 0;

  // 2 + 2
  pool.add(new Patron(new Guest<number>((value) => {
    receivedCount += value;
  })));
  // 2 + 2
  pool.add(new Patron(new Guest<number>((value) => {
    receivedCount += value;
  })));
  // 2
  pool.add(new Guest<number>((value) => {
    receivedCount += value;
  }));
  pool.receive(2);
  pool.receive(2);

  expect(receivedCount).toBe(10);
});
