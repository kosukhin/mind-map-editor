import { MapDocument, MapFileDocument } from '../documents/MapStructures';
import { MapCurrentIDType } from '../mapCurrent/MapCurrentIDType';
import { MapFileType } from './MapFileType';
import { Transformed } from '../../../../../../system/transformed/Transformed';
import { ChainType, FactoryType, GuestObjectType, PoolType, SourceType } from 'patron-oop';
/**
 * Объект для получения карты и сохранения всего файла с картами
 */
export declare class MapFile implements MapFileType {
    private mapFileContent;
    private mapId;
    private factories;
    private currentMapPatrons;
    private mapFileCache;
    constructor(mapFileContent: SourceType<string>, mapId: MapCurrentIDType, factories: {
        pool: FactoryType<PoolType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
        guestCast: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        transformToString: FactoryType<Transformed<string>>;
        transformToObject: FactoryType<Transformed>;
        cache: FactoryType<SourceType>;
    });
    currentMap<R extends GuestObjectType<MapDocument>>(currentMapGuest: R): R;
    give(value: MapFileDocument): this;
    mapFile<R extends GuestObjectType<MapFileDocument>>(mapFileTarget: R): R;
    private createEmptyMapByName;
    private generateEmptyMapFile;
}
