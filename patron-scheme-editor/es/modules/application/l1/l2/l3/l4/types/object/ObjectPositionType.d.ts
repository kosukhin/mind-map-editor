import { GuestObjectType } from 'patron-oop';
import { PointDocument } from '../../../map/documents/PointDocument';
import { MapObjectDocument } from '../../../map/documents/MapStructures';
export interface ObjectPositionType {
    position(object: MapObjectDocument, point: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType<PointDocument>;
}
