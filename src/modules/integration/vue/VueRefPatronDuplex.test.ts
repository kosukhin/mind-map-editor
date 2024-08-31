import { expect, test } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { VueRefPatronDuplex } from '@/modules/integration/vue/VueRefPatronDuplex';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';
import { Guest } from '@/modules/system/guest/Guest';

test('vue ref duplex', () => {
  const source = new FakeSource(1);
  const patron = new VueRefPatronDuplex(new VueRefPatron<number>(), source);
  source.data(patron);
  patron.ref().value = 2;
  queueMicrotask(() => {
    source.data(new Guest((value) => {
      expect(value).toBe(2);
    }));
  });
});
