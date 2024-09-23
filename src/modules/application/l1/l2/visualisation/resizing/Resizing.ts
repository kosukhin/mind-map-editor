import { GuestType, ReceiveOptions } from '@/modules/system/guest/GuestType';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class Resizing implements GuestType<MapDocument> {
  receive(value: MapDocument, options?: ReceiveOptions): this {
    const resizeObserver = new ResizeObserver((entries, observer) => {
      console.log(entries);
    });
    return this;
  }
}
