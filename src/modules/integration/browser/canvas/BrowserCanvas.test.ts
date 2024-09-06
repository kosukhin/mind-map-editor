/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from '@/modules/system/guest/Guest';

test('browser canvas', () => {
  const div = document.createElement('div');
  div.innerHTML = '<canvas height="300" width="300" />';
  const canvasEL = div.querySelector('canvas');
  const canvas = new BrowserCanvas();
  canvas.receive(canvasEL);

  canvas.size(new Guest((size) => {
    expect(size.width).toBe(300);
    expect(size.height).toBe(300);
  }));

  canvas.canvas(new Guest((innerCanvas) => {
    expect(innerCanvas).toBe(canvasEL);
  }));
});
