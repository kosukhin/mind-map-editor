import { expect, test } from 'vitest';
import { FakeSource } from '@/modules/system/fake/FakeSource';
import { VueRefPatron } from '@/modules/integration/vue/VueRefPatron';

test('vue ref patron', () => {
  const source = new FakeSource(1);
  const patron = new VueRefPatron();
  source.data(patron);
  source.receive(22);
  expect(patron.ref().value).toBe(22);
});
