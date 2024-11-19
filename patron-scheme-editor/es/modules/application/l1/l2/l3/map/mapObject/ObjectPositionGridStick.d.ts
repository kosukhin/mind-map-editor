import { ObjectPositionType } from '../../l4/types/object/ObjectPositionType';
import { GuestObjectType, FactoryType } from 'patron-oop';
import { PointDocument } from '../documents/PointDocument';
import { MapObjectDocument } from '../documents/MapStructures';
/**
 * Правило привязки позиции объекта к сетке
 */
export declare class ObjectPositionGridStick implements ObjectPositionType {
    private baseRestriction;
    private factories;
    constructor(baseRestriction: ObjectPositionType, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    position<R extends GuestObjectType<PointDocument>>(object: MapObjectDocument, point: PointDocument, guest: R): R;
}
