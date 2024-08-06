import { ResultOf } from '@/objects/system/result/ResultOf';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapFile } from '@/objects/application/mapFile/MapFile';

export class MapFileNull implements MapFile {
  private mapFile = new ResultOf<ResultValuableParam<MapFile>>(null);

  public value() {
    return this.mapFile;
  }
}
