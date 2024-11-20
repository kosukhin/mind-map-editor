/**
 * @vitest-environment jsdom
 */
import { useFactories } from '@/composables/useFactories';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileFake } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileFake';
import { StageDefaultSize } from '@/modules/application/l1/l2/l3/stage/StageDefaultSize';
import { StageMoveRestrictionTransfer } from '@/modules/application/l1/l2/l3/stage/StageMoveRestrictionTransfer';
import { MapObjectsVisible } from '@/modules/application/l1/l2/l3/visibleObjects/MapObjectsVisible';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { Guest, Patron } from 'patron-oop';
import { expect, test } from 'vitest';

test('visible object', () => {
  const factories = useFactories();
  const div = document.createElement('div');
  div.innerHTML = '<canvas height="300" width="300" />';
  const canvasEL = div.querySelector('canvas') as HTMLElement;
  const browserCanvas = new BrowserCanvas(factories);
  browserCanvas.give(canvasEL);

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
          createTimestamp: 0,
          changeTimestamp: 0,
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

  const stageSize = new StageDefaultSize();
  const stageMoveRestriction = new StageMoveRestrictionTransfer();
  const layer = new KonvaLayer(browserCanvas, stageSize, stageMoveRestriction, factories);
  const mapObjects = new MapObjectsVisible(layer, browserCanvas, mapFileFake, factories);

  mapObjects.objects(
    new Patron(
      new Guest((objects) => {
        expect(objects.length).toBe(1);
      }),
    ),
  );
});
