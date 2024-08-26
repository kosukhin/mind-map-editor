import { expect, test } from 'vitest';
import { Cache } from '@/modules/system/guest/Cache';
import { Visitant } from './Visitant';

test('value works', () => {
  const value = new Cache(null);
  value.receive(2);
  value.receiving(new Visitant((latestValue: number) => {
    expect(latestValue).toBe(2);
  }));

  value.receive(4);
  value.receiving(new Visitant((latestValue: number) => {
    expect(latestValue).toBe(4);
  }));
});
