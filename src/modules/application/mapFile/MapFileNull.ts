import { ResultOf } from '@/modules/system/result/ResultOf';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapFile } from '@/modules/application/mapFile/MapFile';

export class MapFileNull implements MapFile {
  private mapFile = new ResultOf<ResultValuableParam<MapFile>>(null);

  public value() {
    return this.mapFile;
  }
}
