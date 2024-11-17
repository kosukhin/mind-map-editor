import { GuestAwareType, GuestObjectType } from 'patron-oop';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';

const layerGeometry = {
  height: 3000,
  width: 3000,
};

export class StageDefaultSize implements GuestAwareType<SizeDocument> {
  value<R extends GuestObjectType<SizeDocument>>(guest: R): R {
    guest.give(layerGeometry);
    return guest;
  }
}
