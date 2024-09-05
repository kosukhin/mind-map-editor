/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from '@/modules/system/guest/Guest';

test('browser canvas', () => {
  const canvasEL = document.createElement('canvas');
  const canvas = new BrowserCanvas();
  canvas.receive(canvasEL);

  canvas.size(new Guest((size) => {
    expect(size.width).toBe(0);
    expect(size.height).toBe(0);
  }));

  canvas.canvas(new Guest((innerCanvas) => {
    expect(innerCanvas).toBe(canvasEL);
  }));
});
