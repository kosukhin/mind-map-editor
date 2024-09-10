import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { SizeDocument } from '@/modules/entities/SizeDocument';
import { PointDocument } from '@/modules/entities/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';

export interface LayerBase {
  layer(guest: GuestType<KonvaLayer>): this;
  size(guest: GuestType<SizeDocument>): this;
  position(guest: GuestType<PointDocument>): this;
}
