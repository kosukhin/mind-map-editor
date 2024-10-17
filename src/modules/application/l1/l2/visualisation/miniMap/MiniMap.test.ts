import { expect, test } from 'vitest';
import { KonvaLayer } from '@/modules/integration/konva/KonvaLayer';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { Patron } from '@/modules/system/guest/Patron';
import { Guest } from '@/modules/system/guest/Guest';
import { useFactories } from '@/composables/useFactories';
import { PointIdDocument } from '@/modules/application/l1/l2/l3/map/documents/PointIdDocument';
import { MapCurrentID } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentID';
import { StageDefaultSize } from '@/modules/application/l1/l2/l3/stage/StageDefaultSize';
import {
  StageMoveRestrictionTransfer,
} from '@/modules/application/l1/l2/l3/stage/StageMoveRestrictionTransfer';
import { MapCurrent } from '../../l3/map/mapCurrent/MapCurrent';
import { MapFileFake } from '../../l3/map/mapFile/MapFileFake';
import { MiniMap } from './MiniMap';
import { MapObjectDocument } from '../../l3/map/documents/MapStructures';

test('mini map', () => {
  const defaultMapFileDocument = {
    current: {
      document: 'current',
      url: '/current',
      parent: '',
      progress: 0,
      parentNames: {},
      types: {},
      objects: <Record<string, MapObjectDocument>>{
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
          createTimestamp: 0,
          changeTimestamp: 0,
        },
      },
      settings: {
        colored: false,
        favoriteGroup: 'test',
        title: 'test',
      },
    },
  };

  const factories = useFactories();
  const mapFileFake = new MapFileFake(defaultMapFileDocument);
  const mapCurrent = new MapCurrent(mapFileFake, new MapCurrentID(factories), factories);

  const div = document.createElement('div');
  div.innerHTML = '<canvas height="300" width="300" />';
  const canvasEL = div.querySelector('canvas') as HTMLElement;
  const browserCanvas = new BrowserCanvas(factories);
  browserCanvas.receive(canvasEL);

  const stageSize = new StageDefaultSize();

  const stageMoveRestriction = new StageMoveRestrictionTransfer();
  const konvaLayer = new KonvaLayer(browserCanvas, stageSize, stageMoveRestriction, factories);

  const miniMap = new MiniMap(mapCurrent, konvaLayer, stageSize, factories);

  miniMap.points(new Patron(new Guest((points: PointIdDocument[]) => {
    expect(points.length).toBe(1);
  })));
});
