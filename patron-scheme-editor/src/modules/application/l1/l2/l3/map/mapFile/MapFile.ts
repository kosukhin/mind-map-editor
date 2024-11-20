import {
  MapDocument,
  MapFileDocument,
} from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { MapCurrentIDType } from '@/modules/application/l1/l2/l3/map/mapCurrent/MapCurrentIDType';
import { MapFileType } from '@/modules/application/l1/l2/l3/map/mapFile/MapFileType';
import { Transformed } from '@/modules/system/transformed/Transformed';
import { debug } from 'debug';
import { ChainType, FactoryType, GuestObjectType, PoolType, SourceType } from 'patron-oop';

const localDebug = debug('MapFileOfContent');
type CurrentMapChainProps = { mapId: string; mapFile: MapFileDocument };

/**
 * Объект для получения карты и сохранения всего файла с картами
 */
export class MapFile implements MapFileType {
  private currentMapPatrons: PoolType<MapDocument>;

  private mapFileCache: SourceType;

  public constructor(
    private mapFileContent: SourceType<string>,
    private mapId: MapCurrentIDType,
    private factories: {
      pool: FactoryType<PoolType>;
      guest: FactoryType<GuestObjectType>;
      chain: FactoryType<ChainType>;
      guestCast: FactoryType<GuestObjectType>;
      patron: FactoryType<GuestObjectType>;
      guestInTheMiddle: FactoryType<GuestObjectType>;
      transformToString: FactoryType<Transformed<string>>;
      transformToObject: FactoryType<Transformed>;
      cache: FactoryType<SourceType>;
    },
  ) {
    this.currentMapPatrons = factories.pool.create(this);
    this.mapFileCache = factories.cache.create(false);
    mapFileContent.value(
      factories.patron.create((fileContent: string) => {
        if (!fileContent) {
          return;
        }
        const mapFile = this.factories.transformToObject.create(fileContent).result();
        localDebug('get map file', mapFile);
        this.mapFileCache.give(mapFile);
      }),
    );
  }

  public currentMap<R extends GuestObjectType<MapDocument>>(currentMapGuest: R): R {
    const chain = this.factories.chain.create();
    this.mapId.id(this.factories.guestCast.create(currentMapGuest, chain.receiveKey('mapId')));
    this.mapFile(this.factories.guestCast.create(currentMapGuest, chain.receiveKey('mapFile')));
    chain.result(
      this.factories.guestInTheMiddle.create(
        currentMapGuest,
        ({ mapId, mapFile }: CurrentMapChainProps) => {
          localDebug('get current map', mapId, mapFile, typeof mapFile);
          if (!mapFile[mapId]) {
            this.createEmptyMapByName(mapId, currentMapGuest);
          } else {
            const mapObject = mapFile[mapId];
            this.currentMapPatrons.distribute(
              mapObject?.structure ? mapObject.structure : mapObject,
              currentMapGuest,
            );
          }
        },
      ),
    );
    return currentMapGuest;
  }

  public give(value: MapFileDocument): this {
    localDebug('save map file document', value);
    this.mapFileContent.give(this.factories.transformToString.create(value).result());
    return this;
  }

  public mapFile<R extends GuestObjectType<MapFileDocument>>(mapFileTarget: R) {
    this.mapFileCache.value(mapFileTarget);
    return mapFileTarget;
  }

  private createEmptyMapByName(mapName: string, guest: GuestObjectType<MapDocument>) {
    localDebug('creating empty map by name', mapName);
    const mapFileTemplate = this.factories.transformToObject
      .create(this.generateEmptyMapFile())
      .result() as { current: MapDocument };
    this.mapFile(
      this.factories.guest.create((mapFile: MapFileDocument) => {
        this.give({
          ...mapFile,
          [mapName]: mapFileTemplate.current,
        });
        guest.give(mapFileTemplate.current);
      }),
    );
  }

  private generateEmptyMapFile(): string {
    return '{"current":{"progress":0,"settings":{"colored":false,"title":"current"},"objects":{},"types":{},"url":"/current","parent":""}}';
  }
}
