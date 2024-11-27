import { Jsoned } from '@/modules/system/json/Jsoned';
import { Source } from 'patron-oop';
import { expect, test } from 'vitest';

test('Jsoned', () => {
  const source = new Source({
    hello: 'world',
  });
  const json = new Jsoned(source);

  json.value((value) => {
    expect(value).toBe('{"hello":"world"}');
  });

  json.give('{"hello":"earth"}');

  source.value((value) => {
    expect(value.hello).toBe('earth');
  });

  json.give('{"hello":"world"}');
  json.give('{"hello":"world"}');

  source.value((value) => {
    expect(value.hello).toBe('world');
  });
});
