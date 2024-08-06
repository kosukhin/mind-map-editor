import { MapFileStructure } from '@/entities/MapStructures';
import { BaseResult } from '@/objects/base/BaseResult';
import { MapFile } from '@/objects/mapFile/MapFile';

/**
 * Считываем файл карты из ФС операционной системы
 */
export class MapFileFromFS implements MapFile {
  public constructor(private parent: MapFile) {}

  public entity(): BaseResult<MapFileStructure> {
    return this.parent.entity();
  }
}
