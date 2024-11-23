import { expect, test } from 'vitest';
import { GuestObjectType, Guest } from 'patron-oop';
import { useFactories } from '@/composables/useFactories';
import { FirstPossibleFileContent } from '@/modules/application/l1/l2/l3/map/mapFile/FirstPossibleFileContent';

const factories = useFactories();

test('FirstPossibleFileContent.impossible.test', () => {
  const contentOne = {
    value: null,
    content(target: GuestObjectType<string>) {
      target.give('one');
      return this;
    },
    canBeUsed(guest: GuestObjectType<boolean>) {
      guest.give(false);
      return guest;
    },
    give(value: unknown) {
      this.value = value as null;
      return this;
    },
  };
  const contentTwo = {
    value: null,
    content(target: GuestObjectType<string>) {
      target.give('two');
      return this;
    },
    canBeUsed(guest: GuestObjectType<boolean>) {
      guest.give(false);
      return guest;
    },
    give(value: unknown) {
      this.value = value as null;
      return this;
    },
  };

  const possibleContent = new FirstPossibleFileContent([contentOne, contentTwo], factories);

  possibleContent.canBeUsed(
    new Guest((value) => {
      expect(value).toBe(false);
    }),
  );

  possibleContent.content(
    new Guest((value) => {
      expect(value).toBe('');
    }),
  );
});
