import { MapFile } from '@/modules/application/mapFile/MapFile';
import { MapFileContent } from '@/modules/application/mapFileContent/MapFileContent';
import { MapFileStructure, MapStructure } from '@/modules/entities/MapStructures';
import { Target } from '@/modules/system/target/Target';
import { TargetDynamic } from '@/modules/system/target/TargetDynamic';
import { TargetPool } from '@/modules/system/target/TargetPool';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';
import { RuntimeError } from '@/modules/system/error/RuntimeError';

export class MapFileOfString implements MapFile, Target<MapFileStructure> {
  private currentMapTargets = new TargetPool<MapStructure>();

  private mapFileTargets = new TargetPool<MapFileStructure>();

  public constructor(private mapFileContent: MapFileContent) {}

  public currentMap(target: Target<MapStructure>): this {
    try {
      const mapFileTarget = new TargetDynamic<MapFileStructure>((value) => {
        target.receive(value.current);
        this.currentMapTargets.receive(value.current);
      });
      this.mapFile(mapFileTarget);

      return this;
    } catch (e) {
      throw new RuntimeError('Problem while building current map in MapFileBase', { cause: e });
    }
  }

  public currentMapPool(target: Target<MapStructure>): this {
    this.currentMap(target);
    this.currentMapTargets.add(target);
    return this;
  }

  public receive(value: MapFileStructure): this {
    try {
      console.log('save map file', value);
      return this;
    } catch (e) {
      throw new RuntimeError('Problem while receiving map file structure in MapFileBase', { cause: e });
    }
  }

  public mapFile(target: Target<MapFileStructure>): this {
    try {
      const contentTarget = new TargetDynamic<string>((value) => {
        const mapFile = new TransformedFromJSON<MapFileStructure>(value).result();
        target.receive(mapFile);
        this.mapFileTargets.receive(mapFile);
      });
      this.mapFileContent.content(contentTarget);

      return this;
    } catch (e) {
      throw new RuntimeError('Problem while building map file document in MapFileBase', { cause: e });
    }
  }

  public mapFilePool(target: Target<MapFileStructure>): this {
    this.mapFile(target);
    this.mapFileTargets.add(target);
    return this;
  }
}
