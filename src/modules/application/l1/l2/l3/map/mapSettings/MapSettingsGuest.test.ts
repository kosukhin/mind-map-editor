import { expect, test } from 'vitest';
import { MapFileFake } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileFake';
import { MapCurrent } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/l1/l2/l3/map/mapSettings/MapSettingsGuest';
import { Guest } from '@/modules/system/guest/Guest';
import { useFactories } from '@/composables/useFactories';
import { MapFileDocument } from '../documents/MapStructures';

test('map settings guest', () => {
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
  const settingsGuest = new MapSettingsGuest(fake, map, factories);

  settingsGuest.receive({
    ...defaultMapFileDocument.current.settings,
    title: 'changed',
  });

  fake.mapFile(new Guest((mapFile: MapFileDocument) => {
    expect(mapFile.current.settings.title).toBe('changed');
  }));
});
