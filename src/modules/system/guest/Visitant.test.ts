import { expect, test } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { Visitant } from './Visitant';

test('guest dynamic', () => {
  const one = new FakeSource(1);

  one.data(new Visitant((value) => {
    expect(value).toBe(1);
  }));
});
