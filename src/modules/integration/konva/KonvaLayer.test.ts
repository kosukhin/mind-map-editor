/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Guest } from '@/modules/system/guest/Guest';
import { Layer } from 'konva/lib/Layer';
import { useFactories } from '@/composables/useFactories';

test('konva layer', () => {
  const factories = useFactories();
  const canvasEL = document.createElement('canvas');
  const browserCanvas = new BrowserCanvas(factories);
  browserCanvas.receive(canvasEL);
  const layer = new KonvaLayer(browserCanvas, factories);

  layer.layer(new Guest((latestLayer: Layer) => {
    latestLayer.x(10);
    latestLayer.y(20);

    expect(latestLayer.x()).toBe(10);
    expect(latestLayer.y()).toBe(20);
  }));
});
