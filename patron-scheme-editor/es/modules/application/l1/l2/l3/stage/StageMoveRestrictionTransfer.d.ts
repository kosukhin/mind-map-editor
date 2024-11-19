import { StageMoveRestrictionType } from '../l4/types/stage/StageMoveRestrictionType';
import { PointDocument } from '../map/documents/PointDocument';
import { GuestObjectType } from 'patron-oop';
export declare class StageMoveRestrictionTransfer implements StageMoveRestrictionType {
    position(pos: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType;
}
