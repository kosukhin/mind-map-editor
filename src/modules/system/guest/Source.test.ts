import { expect, test } from 'vitest';
import { Source } from '@/modules/system/guest/Source';
import { Guest } from '@/modules/system/guest/Guest';

test('source', () => {
  const source = new Source(42);

  source.receiving(new Guest((value) => {
    expect(value).toBe(42);
  }));
});
