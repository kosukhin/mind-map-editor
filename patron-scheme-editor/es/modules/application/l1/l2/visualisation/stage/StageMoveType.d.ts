import { MapObjectDocument } from '../../l3/map/documents/MapStructures';
export interface StageMoveType {
    move(point: MapObjectDocument): void;
}
