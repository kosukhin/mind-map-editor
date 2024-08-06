import { MapFileStructure } from '@/objects/entities/MapStructures';
import { Result } from '@/objects/system/result/Result';
import { MapFile } from '@/objects/application/mapFile/MapFile';

/**
 * Считываем файл карты из ФС операционной системы
 */
export class MapFileFromFS implements MapFile {
  public constructor(private parent: MapFile) {}

  public value(): Result<MapFileStructure> {
    return this.parent.value();
  }
}
