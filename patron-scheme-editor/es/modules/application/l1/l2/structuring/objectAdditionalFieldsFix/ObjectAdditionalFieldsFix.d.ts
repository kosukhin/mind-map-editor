import { GuestObjectType, FactoryType } from 'patron-oop';
import { MapObjectCurrentType } from '../../l3/map/mapObject/MapObjectCurrentType';
import { MapFileType } from '../../l3/map/mapFile/MapFileType';
import { MapObjectType } from '../../l3/map/mapObject/MapObjectType';
export declare class ObjectAdditionalFieldsFix implements GuestObjectType<string> {
    private mapFile;
    private mapObject;
    private factories;
    constructor(objectCurrent: MapObjectCurrentType, mapFile: MapFileType, mapObject: MapObjectType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    give(value: string): this;
    introduction(): "patron";
}
