import { GuestType } from '@/modules/system/guest/GuestType';
import { SizeDocument } from '../../../application/l1/l2/l3/map/documents/SizeDocument';

export interface BrowserCanvasType extends GuestType<HTMLElement> {
  canvas(guest: GuestType<HTMLElement>): this;
  size(guest: GuestType<SizeDocument>): this;
}
