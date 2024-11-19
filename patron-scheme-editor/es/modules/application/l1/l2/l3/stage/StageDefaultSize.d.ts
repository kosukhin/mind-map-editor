import { GuestAwareType, GuestObjectType } from 'patron-oop';
import { SizeDocument } from '../map/documents/SizeDocument';
export declare class StageDefaultSize implements GuestAwareType<SizeDocument> {
    value<R extends GuestObjectType<SizeDocument>>(guest: R): R;
}
