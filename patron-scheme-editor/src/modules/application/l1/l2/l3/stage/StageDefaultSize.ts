import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { give, GuestAwareObjectType, GuestType } from 'patron-oop';

const layerGeometry = {
  height: 3000,
  width: 3000,
};

export class StageDefaultSize implements GuestAwareObjectType<SizeDocument> {
  value<R extends GuestType<SizeDocument>>(guest: R): R {
    give(layerGeometry, guest);
    return guest;
  }
}
