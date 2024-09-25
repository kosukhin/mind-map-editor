/**
 * @vitest-environment jsdom
 */
import { expect, test } from 'vitest';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import { MapFileFake } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileFake';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { Guest } from '@/modules/system/guest/Guest';
import { Patron } from '@/modules/system/guest/Patron';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { useFactories } from '@/composables/useFactories';
import { MapCurrentID } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentID';

test('visible object', () => {
  const factories = useFactories();
  const div = document.createElement('div');
  div.innerHTML = '<canvas height="300" width="300" />';
  const canvasEL = div.querySelector('canvas') as HTMLElement;
  const browserCanvas = new BrowserCanvas(factories);
  browserCanvas.receive(canvasEL);

  const defaultMapFileDocument = {
    current: {
      document: 'current',
      url: '/current',
      parent: '',
      progress: 0,
      parentNames: {},
      types: {},
      objects: <Record<string, MapObjectDocument>>{
        2: {
          id: '1',
          type: 'one',
          position: [100, 200],
          name: 'test',
          additionalName: 'test',
          outlink: '/test',
          linked: false,
          description: '',
          zindex: 0,
          arrows: [],
          targetBlank: false,
          lastClick: 0,
          inMenu: false,
          menuOrder: 1,
          width: 10,
          height: 10,
        },
      },
      settings: {
        colored: false,
        favoriteGroup: 'test',
        title: 'test',
      },
    },
  };

  const mapFileFake = new MapFileFake(defaultMapFileDocument);
  const mapCurrent = new MapCurrent(mapFileFake, new MapCurrentID(factories), factories);
  const layer = new KonvaLayer(browserCanvas, factories);
  const mapObjects = new MapObjectsVisible(layer, browserCanvas, mapCurrent, factories);

  mapObjects.objects(new Patron(new Guest((objects) => {
    expect(objects.length).toBe(1);
  })));
});
