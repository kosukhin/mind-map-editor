import { MapObjectDocument } from '@/modules/application/l1/l2/l3/map/documents/MapStructures';

export interface StageMoveType {
  move(point: MapObjectDocument): void;
}
