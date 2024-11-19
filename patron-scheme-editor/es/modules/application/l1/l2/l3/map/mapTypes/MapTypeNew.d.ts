import { GuestObjectType } from 'patron-oop';
import { MapTypeWithNameDocument } from '../documents/MapStructures';
export declare class MapTypeNew {
    private mapType;
    constructor(mapType: GuestObjectType<MapTypeWithNameDocument>);
    byName(): void;
}
