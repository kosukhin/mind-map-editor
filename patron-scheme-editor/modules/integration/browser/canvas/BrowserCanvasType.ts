import { GuestObjectType } from 'patron-oop';
import { SizeDocument } from '../../../application/l1/l2/l3/map/documents/SizeDocument';

export interface BrowserCanvasType extends GuestObjectType<HTMLElement> {
  canvas(guest: GuestObjectType<HTMLElement>): this;
  size(guest: GuestObjectType<SizeDocument>): this;
}
