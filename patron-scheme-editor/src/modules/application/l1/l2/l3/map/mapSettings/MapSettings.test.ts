import { expect, test } from 'vitest';
import { MapFileFake } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileFake';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettings } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettings';
import { Guest } from 'patron-oop';
import { useFactories } from '@/composables/useFactories';
import { MapCurrentID } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentID';
import { MapFileDocument } from '../documents/MapStructures';

test('map settings', () => {
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
  const map = new MapCurrent(fake, new MapCurrentID(factories), factories);
  const settingsGuest = new MapSettings(fake, map, factories);

  settingsGuest.give({
    ...defaultMapFileDocument.current.settings,
    title: 'changed',
  });

  fake.mapFile(new Guest((mapFile: MapFileDocument) => {
    expect(mapFile.current.settings.title).toBe('changed');
  }));
});
