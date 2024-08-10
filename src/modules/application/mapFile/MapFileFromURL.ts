import { MapFileStructure } from '@/modules/entities/MapStructures';
import { Result } from '@/modules/system/result/Result';
import { MapFile } from '@/modules/application/mapFile/MapFile';

/**
 * Считываем файл карты из сети по урлу в браузере
 */
export class MapFileFromURL implements MapFile {
  public constructor(private parent: MapFile) {}

  public setup(): MapFile {
    console.log('read from url', this.parent.value());
    return this;
  }

  public value(): Result<MapFileStructure> {
    return this.parent.value();
  }
}
