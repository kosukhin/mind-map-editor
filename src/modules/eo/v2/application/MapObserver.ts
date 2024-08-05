import { Observer } from '@/modules/eo/targets/system/Observer';
import { Optional } from '@/modules/eo/targets/system/Optional';
import { Saveable } from '@/modules/eo/targets/system/Saveable';
import { Valueable } from '@/modules/eo/targets/system/Valueable';
import { mapUrlToName } from '@/utils/mapUrlToName';
import { MapFile, MapStructure } from '@/entities/Map';
lToName';

export class MapObserver implements Observer<MapStructure> {
  constructor(private mapFile: Saveable<MapFile, Optional<boolean>> & Valueable<Optional<MapFile>>) {}

  notify(map: MapStructure): void {
    this.mapFile.value().filled((mapFile) => {
      const mapName = mapUrlToName(map.url);
      console.log('map mutated', map, mapFile);
      this.mapFile.save({
        ...mapFile,
        [mapName]: map,
      } as MapFile).filled((saveResult) => {
        console.log('do notify', saveResult);
      });
    });
  }
}
