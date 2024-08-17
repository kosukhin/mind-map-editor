import { MapFile } from '@/modules/application/mapFile/MapFile';
import { MapFileContent } from '@/modules/application/mapFileContent/MapFileContent';
import { MapFileDocument, MapDocument } from '@/modules/entities/MapStructures';
import { Target } from '@/modules/system/target/Target';
import { TargetDynamic } from '@/modules/system/target/TargetDynamic';
import { TargetPool } from '@/modules/system/target/TargetPool';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';
import { RuntimeError } from '@/modules/system/error/RuntimeError';

export class MapFileOfString implements MapFile, Target<MapFileDocument> {
  private currentMapTargets = new TargetPool<MapDocument>();

  private mapFileTargets = new TargetPool<MapFileDocument>();

  public constructor(private mapFileContent: MapFileContent) {}

  public currentMap(target: Target<MapDocument>): this {
    try {
      const mapFileTarget = new TargetDynamic<MapFileDocument>((value) => {
        target.receive(value.current);
        this.currentMapTargets.receive(value.current);
      });
      this.mapFile(mapFileTarget);

      return this;
    } catch (e) {
      throw new RuntimeError('Problem while building current map in MapFileBase', { cause: e });
    }
  }

  public currentMapPool(target: Target<MapDocument>): this {
    this.currentMap(target);
    this.currentMapTargets.add(target);
    return this;
  }

  public receive(value: MapFileDocument): this {
    try {
      console.log('save map file', value);
      return this;
    } catch (e) {
      throw new RuntimeError('Problem while receiving map file structure in MapFileBase', { cause: e });
    }
  }

  public mapFile(target: Target<MapFileDocument>): this {
    try {
      const contentTarget = new TargetDynamic<string>((value) => {
        const mapFile = new TransformedFromJSON<MapFileDocument>(value).result();
        target.receive(mapFile);
        this.mapFileTargets.receive(mapFile);
      });
      this.mapFileContent.content(contentTarget);

      return this;
    } catch (e) {
      throw new RuntimeError('Problem while building map file document in MapFileBase', { cause: e });
    }
  }

  public mapFilePool(target: Target<MapFileDocument>): this {
    this.mapFile(target);
    this.mapFileTargets.add(target);
    return this;
  }
}
