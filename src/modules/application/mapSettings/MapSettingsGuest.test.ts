import { expect, test } from 'vitest';
import { MapFileFake } from '@/modules/application/mapFile/MapFileFake';
import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { MapSettingsGuest } from '@/modules/application/mapSettings/MapSettingsGuest';
import { Guest } from '@/modules/system/guest/Guest';

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

  const fake = new MapFileFake(defaultMapFileDocument);
  const map = new MapCurrent(fake);
  const settingsGuest = new MapSettingsGuest(fake, map);

  settingsGuest.receive({
    ...defaultMapFileDocument.current.settings,
    title: 'changed',
  });

  fake.mapFile(new Guest((mapFile) => {
    expect(mapFile.current.settings.title).toBe('changed');
  }));
});
