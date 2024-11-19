import { MapType } from '../../l3/map/mapCurrent/MapType';
import { LayerBase } from '../../l3/types/LayerBase';
import { PointIdDocument } from '../../l3/map/documents/PointIdDocument';
import { SizeDocument } from '../../l3/map/documents/SizeDocument';
import { PointDocument } from '../../l3/map/documents/PointDocument';
import { GuestObjectType, SourceType, FactoryType, ChainType, GuestAwareType } from 'patron-oop';
/**
 * Объект для построения отображения миникарты
 */
export declare class MiniMap {
    private map;
    private layer;
    private stageSize;
    private factories;
    private theSize;
    private thePoints;
    private viewportSizeCache;
    constructor(map: MapType, layer: LayerBase, stageSize: GuestAwareType<SizeDocument>, factories: {
        sourceEmpty: FactoryType<SourceType>;
        chain: FactoryType<ChainType<unknown>>;
        patron: FactoryType<GuestObjectType>;
        guest: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
        guestCast: FactoryType<GuestObjectType>;
    });
    viewportPosition<R extends GuestObjectType<PointDocument>>(guest: R): R;
    viewportSize<R extends GuestObjectType<SizeDocument>>(guest: R): R;
    size<R extends GuestObjectType<SizeDocument>>(guest: R): R;
    points<R extends GuestObjectType<PointIdDocument[]>>(guest: R): R;
}
