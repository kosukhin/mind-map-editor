import { expect, test } from 'vitest';
import { Source } from '@/modules/system/guest/Source';
import { PatronOnce } from '@/modules/system/guest/PatronOnce';
import { Guest } from '@/modules/system/guest/Guest';

test('patron once', () => {
  const source = new Source(42);
  let calls = 0;
  const patron = new PatronOnce(new Guest((value) => {
    calls += 1;
  }));
  source.receiving(patron);
  source.receive(22);

  expect(calls).toBe(1);
});
