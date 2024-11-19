import { PointDocument } from '../../../map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';
export interface StageMoveRestrictionType {
    position(pos: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType;
}
