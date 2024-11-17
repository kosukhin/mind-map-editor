import { StageMoveType } from '@/modules/application/l1/l2/visualisation/stage/StageMoveType';
import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';
import { MapDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export class StagePositionByObjectId {
  public constructor(
    private stageMove: StageMoveType,
    private factories: {
      guest: FactoryType<GuestObjectType>
    },
  ) {}

  public move(map: GuestAwareType<MapDocument>, objectId: string) {
    map.value(
      this.factories.guest.create((latestMapDocument: MapDocument) => {
        this.stageMove.move(latestMapDocument.objects[objectId]);
      }),
    );
    return this;
  }
}
