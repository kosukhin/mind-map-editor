import { Result } from '@/objects/system/result/Result';
import { ResultValuableParam } from '@/objects/system/result/ResultValuable';
import { MapFile } from '@/objects/application/mapFile/MapFile';
import { ResultOf } from '@/objects/system/result/ResultOf';

export class MapFileOf implements MapFile {
  private mapFileStructure: Result<ResultValuableParam<MapFile>>;

  public constructor(mapStructure: ResultValuableParam<MapFile>) {
    this.mapFileStructure = new ResultOf(mapStructure);
  }

  public value() {
    return this.mapFileStructure;
  }
}
