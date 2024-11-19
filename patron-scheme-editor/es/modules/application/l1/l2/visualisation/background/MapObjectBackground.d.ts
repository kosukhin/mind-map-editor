import { MapDocument } from '../../l3/map/documents/MapStructures';
import { MapFileType } from '../../l3/map/mapFile/MapFileType';
import { LayerBase } from '../../l3/types/LayerBase';
import { FactoryType, GuestObjectType, SourceType } from 'patron-oop';
export declare class MapObjectBackground implements GuestObjectType<MapDocument> {
    private konvaLayer;
    private mapFile;
    private zIndex;
    private factories;
    private mapNameCache;
    constructor(konvaLayer: LayerBase, mapFile: MapFileType, zIndex: GuestObjectType<() => void>, factories: {
        cache: FactoryType<SourceType>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        patronOnce: FactoryType<GuestObjectType>;
    });
    give(value: MapDocument): this;
}
