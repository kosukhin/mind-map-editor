import { Result } from '@/modules/system/result/Result';
import { ResultValuableParam } from '@/modules/system/result/ResultValuable';
import { MapFile } from '@/modules/application/mapFile/MapFile';
import { ResultOf } from '@/modules/system/result/ResultOf';

export class MapFileOf implements MapFile {
  private mapFileStructure: Result<ResultValuableParam<MapFile>>;

  public constructor(mapStructure: ResultValuableParam<MapFile>) {
    this.mapFileStructure = new ResultOf(mapStructure);
  }

  public setup(): MapFile {
    return this;
  }

  public value() {
    return this.mapFileStructure;
  }
}
