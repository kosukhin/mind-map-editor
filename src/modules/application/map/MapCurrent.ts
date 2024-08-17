import { Map } from '@/modules/application/map/Map';
import { Guest } from '@/modules/system/guest/Guest';
import { MapDocument, MapFileDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { GuestDynamic } from '@/modules/system/guest/GuestDynamic';
import { PatronPool } from '@/modules/system/guest/PatronPool';

export class MapCurrent implements Map {
  private mapSettingsPatrons = new PatronPool<MapSettingsDocument>();

  public constructor(private mapFile: MapFile) {}

  public mapSettings(guest: Guest<MapSettingsDocument>) {
    this.mapFile.currentMap(new GuestDynamic((value: MapDocument) => {
      this.mapSettingsPatrons.distributeReceiving(value.settings, guest);
    }, 'mapSettingGuest'));

    return this;
  }

  public receive(value: MapDocument) {
    const name = value.document;
    this.mapFile.mapFile(new GuestDynamic((latestMapFile: MapFileDocument) => {
      this.mapFile.receive({
        ...latestMapFile,
        [name]: value,
      });
    }, 'mapCurrentObjectGuest'));
    return this;
  }

  public introduction() {
    return 'guest' as const;
  }
}
