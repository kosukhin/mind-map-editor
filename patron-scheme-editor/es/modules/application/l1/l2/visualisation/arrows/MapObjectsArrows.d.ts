import { GuestObjectType, FactoryType, ChainType, SourceType } from 'patron-oop';
import { LayerBase } from '../../l3/types/LayerBase';
import { MapFileType } from '../../l3/map/mapFile/MapFileType';
import { MapType } from '../../l3/map/mapCurrent/MapType';
import { ArrowPathType } from '../../l3/l4/types/arrow/ArrowPathType';
/**
 * Объект для отрисовки стрелок на конве
 */
export declare class MapObjectsArrows {
    private konvaLayer;
    private mapFile;
    private mapDep;
    private arrowPath;
    private factories;
    private previouslyRenderedArrows;
    constructor(konvaLayer: LayerBase, mapFile: MapFileType, mapDep: MapType, arrowPath: ArrowPathType, factories: {
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        chain: FactoryType<ChainType>;
        cache: FactoryType<SourceType>;
    });
    introduction(): "patron";
}
