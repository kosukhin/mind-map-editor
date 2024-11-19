import { MapObjectDocument } from '../documents/MapStructures';
import { GuestObjectType } from 'patron-oop';
import { MapObjectType } from './MapObjectType';
type RelationInformation = {
    index: number;
    object: MapObjectDocument;
};
export declare class MapObjectRelationRemoved implements GuestObjectType<RelationInformation> {
    private mapObject;
    constructor(mapObject: MapObjectType);
    give(value: RelationInformation): this;
}
export {};
