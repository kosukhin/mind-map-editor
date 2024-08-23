import { Map } from '@/modules/application/map/Map';
import { Guest } from '@/modules/system/guest/Guest';
import { MapDocument, MapFileDocument, MapSettingsDocument } from '@/modules/entities/MapStructures';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { Visitant } from '@/modules/system/guest/Visitant';
import { PatronPool } from '@/modules/system/guest/PatronPool';

export class MapCurrent implements Map {
  private mapSettingsPatrons = new PatronPool<MapSettingsDocument>();

  public constructor(private mapFile: MapFile) {}

  public mapSettings(guest: Guest<MapSettingsDocument>) {
    this.mapFile.currentMap(new Visitant((value: MapDocument) => {
      this.mapSettingsPatrons.distributeReceiving(value.settings, guest);
    }, 'mapSettingGuest'));

    return this;
  }

  public receive(value: MapDocument) {
    // TODO тут временно current позже нужен объект Text которые будет представлять имя из ссылки
    const name = 'current';
    this.mapFile.mapFile(new Visitant((latestMapFile: MapFileDocument) => {
      console.log('send map file changed');
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
