import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { SizeDocument } from '@/modules/application/l1/l2/l3/map/documents/SizeDocument';
import { GuestType } from '@/modules/system/guest/GuestType';

const layerGeometry = {
  height: 3000,
  width: 3000,
};

export class StageDefaultSize implements GuestAwareType<SizeDocument> {
  receiving<R extends GuestType<SizeDocument>>(guest: R): R {
    guest.receive(layerGeometry);
    return guest;
  }
}
