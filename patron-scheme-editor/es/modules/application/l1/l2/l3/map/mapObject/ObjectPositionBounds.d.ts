import { PointDocument } from '../documents/PointDocument';
import { GuestObjectType, FactoryType, GuestAwareType } from 'patron-oop';
import { ObjectPositionType } from '../../l4/types/object/ObjectPositionType';
import { SizeDocument } from '../documents/SizeDocument';
import { MapObjectDocument } from '../documents/MapStructures';
/**
 * Позиция объекта ограниченная границами лейера
 */
export declare class ObjectPositionBounds implements ObjectPositionType {
    private stageSize;
    private factories;
    constructor(stageSize: GuestAwareType<SizeDocument>, factories: {
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    position<R extends GuestObjectType<PointDocument>>(object: MapObjectDocument, point: PointDocument, guest: R): R;
}
