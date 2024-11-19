import { MapCurrentIDType } from './MapCurrentIDType';
import { MapType } from './MapType';
import { ChainType, FactoryType, GuestObjectType, SourceType } from 'patron-oop';
import { MapDocument } from '../documents/MapStructures';
import { MapFileType } from '../mapFile/MapFileType';
/**
 * История изменения карты
 */
export declare class MapHistory implements GuestObjectType<MapDocument> {
    private mapFile;
    private map;
    private mapId;
    private factories;
    private mapsHistory;
    private historyIndex;
    constructor(mapFile: MapFileType, map: MapType, mapId: MapCurrentIDType, factories: {
        cache: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
        patron: FactoryType<GuestObjectType>;
    });
    give(value: MapDocument): this;
    isPrevPossible<R extends GuestObjectType<boolean>>(guest: R): R;
    prev(): void;
    isNextPossible<R extends GuestObjectType<boolean>>(guest: R): R;
    next(): void;
}
