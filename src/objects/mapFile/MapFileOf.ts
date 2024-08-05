import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapFile } from '@/objects/mapFile/MapFile';

export class MapFileOf implements MapFile {
  private mapFileStructure: BaseResult<BaseResultParam<MapFile>>;

  public constructor(mapStructure: BaseResultParam<MapFile>) {
    this.mapFileStructure = new BaseResult(mapStructure);
  }

  public entity() {
    return this.mapFileStructure;
  }
}
