/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { MapFileFake } from '@/modules/application/mapFile/MapFileFake';
import { Guest } from '@/modules/system/guest/Guest';

test('konva layer', () => {
  const canvasEL = document.createElement('canvas');
  const browserCanvas = new BrowserCanvas();
  browserCanvas.receive(canvasEL);
  const defaultMapFileDocument = {
    current: {
      document: 'current',
      url: '/current',
      parent: '',
      progress: 0,
      parentNames: {},
      types: {},
      objects: {},
      settings: {
        colored: false,
        favoriteGroup: 'test',
        title: 'test',
      },
    },
  };
  const mapFileFake = new MapFileFake(defaultMapFileDocument);
  const layer = new KonvaLayer(mapFileFake, browserCanvas);

  layer.layer(new Guest((value) => {
    console.log('layer', value);
    expect(true).toBe(true);
  }));
});
