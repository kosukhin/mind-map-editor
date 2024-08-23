import { expect, test } from 'vitest';
import { Value } from '@/modules/system/guest/Value';
import { Visitant } from './Visitant';

test('value works', () => {
  const value = new Value(2, null);
  value.receiving(new Visitant((latestValue: number) => {
    expect(latestValue).toBe(2);
  }));

  value.receive(4);
  value.receiving(new Visitant((latestValue: number) => {
    expect(latestValue).toBe(4);
  }));
});
