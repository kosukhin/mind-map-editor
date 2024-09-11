import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { PointDocument } from '@/modules/application/l1/l2/l3/map/documents/PointDocument';
import { GuestType } from '@/modules/system/guest/GuestType';

export interface LayerBase {
  layer(guest: GuestType<KonvaLayer>): this;
  size(guest: GuestType<SizeDocument>): this;
  position(guest: GuestType<PointDocument>): this;
}
