import { expect, test } from 'vitest';
import { MiniMap } from './MiniMap';
import { MapFileFake } from '../mapFile/MapFileFake';
import { MapCurrent } from '../map/MapCurrent';
import { KonvaLayer } from '../../integration/konva/KonvaLayer';
import { BrowserCanvas } from '../../integration/browser/canvas/BrowserCanvas';
import { Patron } from '../../system/guest/Patron';
import { Guest } from '../../system/guest/Guest';

test('mini map', () => {
  const defaultMapFileDocument = {
    current: {
      document: 'current',
      url: '/current',
      parent: '',
      progress: 0,
      parentNames: {},
      types: {},
      objects: {
        0: {
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
  const mapCurrent = new MapCurrent(mapFileFake);

  const div = document.createElement('div');
  div.innerHTML = '<canvas height="300" width="300" />';
  const canvasEL = div.querySelector('canvas') as HTMLElement;
  const browserCanvas = new BrowserCanvas();
  browserCanvas.receive(canvasEL);

  const konvaLayer = new KonvaLayer(mapFileFake, browserCanvas);

  const miniMap = new MiniMap(mapCurrent, konvaLayer);

  miniMap.points(new Patron(new Guest((points) => {
    expect(points.length).toBe(1);
  })));
});
