import { MapFileStructure } from '@/objects/entities/MapStructures';
import { Result } from '@/objects/system/result/Result';
import { MapFile } from '@/objects/application/mapFile/MapFile';

/**
 * Считываем файл карты из сети по урлу в браузере
 */
export class MapFileFromURL implements MapFile {
  public constructor(private parent: MapFile) {}

  public value(): Result<MapFileStructure> {
    return this.parent.value();
  }
}
