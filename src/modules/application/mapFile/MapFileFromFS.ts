import { MapFileStructure } from '@/modules/entities/MapStructures';
import { Result } from '@/modules/system/result/Result';
import { MapFile } from '@/modules/application/mapFile/MapFile';

/**
 * Считываем файл карты из ФС операционной системы
 */
export class MapFileFromFS implements MapFile {
  public constructor(private parent: MapFile) {}

  public value(): Result<MapFileStructure> {
    return this.parent.value();
  }
}
