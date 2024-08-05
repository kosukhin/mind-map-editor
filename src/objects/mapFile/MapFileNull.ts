import { BaseResult } from '@/objects/base/BaseResult';
import { BaseResultParam } from '@/objects/base/BaseResultEntity';
import { MapFile } from '@/objects/mapFile/MapFile';

export class MapFileNull implements MapFile {
  private mapFile = new BaseResult<BaseResultParam<MapFile>>(null);

  public entity() {
    return this.mapFile;
  }
}
