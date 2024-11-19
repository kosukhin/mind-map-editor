import { GuestObjectType, FactoryType, SourceType } from 'patron-oop';
import { MapCurrentIDType } from './MapCurrentIDType';
export declare class MapCurrentID implements MapCurrentIDType {
    private idCache;
    constructor(factories: {
        cache: FactoryType<SourceType>;
    });
    id<R extends GuestObjectType<string>>(guest: R): R;
    give(value: string): this;
}
