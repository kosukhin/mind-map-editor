import { Guest } from '@/modules/system/guest/Guest';
import { Layer as KonvaLayer } from 'konva/lib/Layer';
import { SizeDocument } from '@/modules/entities/SizeDocument';

export interface LayerBase {
  layer(guest: Guest<KonvaLayer>): this;
  size(guest: Guest<SizeDocument>): this;
}
