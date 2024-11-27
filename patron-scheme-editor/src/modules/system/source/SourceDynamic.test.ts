import { SourceDynamic } from '@/modules/system/source/SourceDynamic';
import { give, Guest, GuestAware } from 'patron-oop';
import { expect, test } from 'vitest';

test('SourceDynamic', () => {
  let theValue = 1;
  const sourceDynamic = new SourceDynamic(
    new Guest((value: number) => {
      theValue = value;
    }),
    new GuestAware((guest) => {
      give(theValue, guest);
    }),
  );

  sourceDynamic.value((value) => {
    expect(value).toBe(1);
  });

  sourceDynamic.give(2);

  setTimeout(() => {
    expect(theValue).toBe(2);
  });
});
