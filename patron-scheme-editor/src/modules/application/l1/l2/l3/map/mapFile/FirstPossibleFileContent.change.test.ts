import { useFactories } from '@/composables/useFactories';
import { FirstPossibleFileContent } from '@/modules/application/l1/l2/l3/map/mapFile/FirstPossibleFileContent';
import { Guest, GuestObjectType, PatronOnce } from 'patron-oop';
import { expect, test } from 'vitest';

const factories = useFactories();

test('FirstPossibleFileContent.change.test', () => {
  const contentOne = {
    value: null,
    content(target: GuestObjectType<string>) {
      target.give('one');
      return this;
    },
    canBeUsed(guest: GuestObjectType<boolean>) {
      guest.give(true);
      return guest;
    },
    give(value: unknown) {
      this.value = value as null;
      return this;
    },
  };

  const possibleContent = new FirstPossibleFileContent([contentOne], factories);

  possibleContent.canBeUsed(
    new PatronOnce((value) => {
      expect(value).toBe(true);
    }),
  );

  possibleContent.content(
    new Guest((value) => {
      expect(value).toBe('one');
    }),
  );

  possibleContent.give('changed');

  possibleContent.content(
    new Guest((value) => {
      expect(value).toBe('changed');
    }),
  );
});
