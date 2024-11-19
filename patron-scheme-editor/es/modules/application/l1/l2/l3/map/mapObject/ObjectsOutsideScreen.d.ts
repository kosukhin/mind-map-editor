import { MapType } from '../mapCurrent/MapType';
import { GuestAwareType, FactoryType, ChainType, GuestObjectType } from 'patron-oop';
import { SizeDocument } from '../documents/SizeDocument';
import { LayerBase } from '../../types/LayerBase';
type ObjectsConfig = {
    axis: 'x' | 'y';
    direction: 'positive' | 'negative';
};
export type CountDocument = {
    count: number;
    nearestObjectId: string;
};
export declare class ObjectsOutsideScreen {
    private map;
    private stageSize;
    private layer;
    private factories;
    constructor(map: MapType, stageSize: GuestAwareType<SizeDocument>, layer: LayerBase, factories: {
        chain: FactoryType<ChainType<unknown>>;
        guestCast: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    count<R extends GuestObjectType<CountDocument>>(config: ObjectsConfig, guest: R): R;
}
export {};
