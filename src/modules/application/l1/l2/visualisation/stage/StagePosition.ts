import { GuestType } from '@/modules/system/guest/GuestType';
import { StageMoveType } from '@/modules/application/l1/l2/visualisation/stage/StageMoveType';
import { debug } from 'debug';
import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

const localDebug = debug('StagePosition');

export class StagePosition implements GuestType<MapObjectDocument> {
  public constructor(
    private stageMove: StageMoveType,
  ) {}

  public receive(value: MapObjectDocument): this {
    localDebug('received position', value);
    this.stageMove.move(value);
    return this;
  }
}
