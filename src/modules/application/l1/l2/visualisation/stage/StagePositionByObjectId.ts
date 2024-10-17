import { StageMoveType } from '@/modules/application/l1/l2/visualisation/stage/StageMoveType';
import { GuestAwareType } from '@/modules/system/guest/GuestAwareType';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { GuestType } from '@/modules/system/guest/GuestType';
import { FactoryType } from '@/modules/system/guest/FactoryType';

export class StagePositionByObjectId {
  public constructor(
    private stageMove: StageMoveType,
    private factories: {
      guest: FactoryType<GuestType>
    },
  ) {}

  public move(map: GuestAwareType<MapDocument>, objectId: string) {
    map.receiving(
      this.factories.guest.create((latestMapDocument: MapDocument) => {
        this.stageMove.move(latestMapDocument.objects[objectId]);
      }),
    );
    return this;
  }
}
