import { Guest } from '@/modules/system/guest/Guest';
import { Layer as KonvaLayer } from 'konva/lib/Layer';

export interface LayerBase {
  layer(guest: Guest<KonvaLayer>): this;
}
