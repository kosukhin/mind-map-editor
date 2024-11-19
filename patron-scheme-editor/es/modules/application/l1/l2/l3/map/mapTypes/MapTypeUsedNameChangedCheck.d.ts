import { CheckType } from '../checks/CheckType';
import { MapTypeWithNameDocument } from '../documents/MapStructures';
import { FactoryType, GuestObjectType } from 'patron-oop';
export declare class MapTypeUsedNameChangedCheck implements CheckType<MapTypeWithNameDocument> {
    private mapTypeUsedCheck;
    private factories;
    constructor(mapTypeUsedCheck: CheckType<MapTypeWithNameDocument>, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    check(value: MapTypeWithNameDocument, guest: GuestObjectType<true | string>): this;
}
