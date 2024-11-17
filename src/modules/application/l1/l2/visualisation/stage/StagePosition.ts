import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';
import { StageMoveType } from '@/modules/application/l1/l2/visualisation/stage/StageMoveType';
import { debug } from 'debug';
import { GuestObjectType } from 'patron-oop';

const localDebug = debug('StagePosition');

export class StagePosition implements GuestObjectType<MapObjectDocument> {
  public constructor(
    private stageMove: StageMoveType,
  ) {}

  public give(value: MapObjectDocument): this {
    localDebug('received position', value);
    this.stageMove.move(value);
    return this;
  }
}
