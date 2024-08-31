import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { GuestType } from '../../system/guest/GuestType';

export interface LayerBase {
  layer(guest: GuestType<KonvaLayer>): this;
  size(guest: GuestType<SizeDocument>): this;
}
