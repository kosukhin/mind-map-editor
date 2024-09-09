import { MapFileType } from '@/modules/application/mapFile/MapFileType';
import { MapFileContentType } from '@/modules/application/mapFileContent/MapFileContentType';
import { MapDocument, MapFileDocument } from '@/modules/entities/MapStructures';
import { PatronPool } from '@/modules/system/guest/PatronPool';
import { TransformedFromJSON } from '@/modules/system/transformed/TransformedFromJSON';
import { RuntimeError } from '@/modules/system/error/RuntimeError';
import { TransformedToJSON } from '@/modules/system/transformed/TransformedToJSON';
import { debug } from 'debug';
import { GuestInTheMiddle } from '@/modules/system/guest/GuestInTheMiddle';
import { GuestType } from '../../system/guest/GuestType';

const localDebug = debug('MapFileOfContent');

export class MapFileOfContent implements MapFileType {
  private currentMapPatrons = new PatronPool<MapDocument>(this);

  private mapFilePatrons = new PatronPool<MapFileDocument>(this);

  public constructor(
    private mapFileContent: MapFileContentType,
  ) {}

  public currentMap(currentMapGuest: GuestType<MapDocument>): this {
    this.mapFile(new GuestInTheMiddle(currentMapGuest, (value: MapFileDocument) => {
      this.currentMapPatrons.distribute(value.current, currentMapGuest);
    }));
    return this;
  }

  public receive(value: MapFileDocument): this {
    localDebug('save map file document', value);
    try {
      this.mapFileContent.receive(new TransformedToJSON(value).result());
      return this;
    } catch (e) {
      throw new RuntimeError('Problem while receiving map file structure in MapFileBase', { cause: e });
    }
  }

  public mapFile(mapFileTarget: GuestType<MapFileDocument>): this {
    this.mapFileContent.content(new GuestInTheMiddle<string>(mapFileTarget, (value) => {
      const mapFile = new TransformedFromJSON<MapFileDocument>(value).result();
      this.mapFilePatrons.distribute(mapFile, mapFileTarget);
    }));
    return this;
  }
}
