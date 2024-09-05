import { GuestType } from '@/modules/system/guest/GuestType';
import { SizeDocument } from '../../../entities/SizeDocument';

export interface BrowserCanvasType extends GuestType<HTMLElement> {
  canvas(guest: GuestType<HTMLElement>): this;
  size(guest: GuestType<SizeDocument>): this;
}
