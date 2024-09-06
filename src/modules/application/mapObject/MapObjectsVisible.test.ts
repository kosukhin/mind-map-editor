/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { MapObjectsVisible } from '@/modules/application/mapObject/MapObjectsVisible';
import { MapFileFake } from '@/modules/application/mapFile/MapFileFake';
import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { Guest } from '@/modules/system/guest/Guest';

test('visible object', () => {
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
  const mapCurrent = new MapCurrent(mapFileFake);
  const layer = new KonvaLayer(mapFileFake, browserCanvas);
  const mapObjects = new MapObjectsVisible(layer, browserCanvas, mapCurrent);

  mapObjects.objects(new Guest((objects) => {
    expect(objects.length).toBe(0);
  }));
});
