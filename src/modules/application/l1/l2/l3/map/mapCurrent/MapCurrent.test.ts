import { expect, test } from 'vitest';
import { Guest } from '@/modules/system/guest/Guest';
import { useFactories } from '@/composables/useFactories';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapFileFake } from '../mapFile/MapFileFake';
import { MapCurrent } from './MapCurrent';

test('map current', () => {
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

  const factories = useFactories();
  const fake = new MapFileFake(defaultMapFileDocument);
  const map = new MapCurrent(fake, factories);
  map.objects(new Guest((objects: MapObjectDocument[]) => {
    expect(objects.length).toBe(0);
  }));

  map.receive({
    ...defaultMapFileDocument.current,
    objects: {
      2: {
        id: '1',
        type: 'one',
        position: [0, 0],
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
  });

  map.objects(new Guest((objects: MapObjectDocument[]) => {
    expect(objects.length).toBe(1);
  }));
});
