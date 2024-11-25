import { useFactories } from '@/composables/useFactories';
import { FirstPossibleFileContent } from '@/modules/application/l1/l2/l3/map/mapFile/FirstPossibleFileContent';
import { GuestObjectType, PatronOnce } from 'patron-oop';
import { expect, test } from 'vitest';

const factories = useFactories();

test('FirstPossibleFileContent.async.test', () => {
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
      setTimeout(() => {
        guest.give(true);
      });
      return guest;
    },
    give(value: unknown) {
      this.value = value as null;
      return this;
    },
  };

  const possibleContent = new FirstPossibleFileContent([contentOne, contentTwo], factories);

  possibleContent.canBeUsed(
    new PatronOnce((value) => {
      expect(value).toBe(true);
    }),
  );

  possibleContent.content(
    new PatronOnce((value) => {
      expect(value).toBe('two');
    }),
  );
});
