/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from 'patron-oop';
import { useFactories } from '@/composables/useFactories';

test('browser canvas', () => {
  const factories = useFactories();
  const div = document.createElement('div');
  div.innerHTML = '<canvas height="300" width="300" />';
  const canvasEL = div.querySelector('canvas') as HTMLElement;
  const canvas = new BrowserCanvas(factories);
  canvas.give(canvasEL);

  canvas.size(
    new Guest((size) => {
      expect(size.width).toBe(300);
      expect(size.height).toBe(300);
    }),
  );

  canvas.canvas(
    new Guest((innerCanvas) => {
      expect(innerCanvas).toBe(canvasEL);
    }),
  );
});
