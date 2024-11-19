import { MapObjectDocument } from '../../l3/map/documents/MapStructures';
import { StageMoveType } from './StageMoveType';
import { GuestObjectType } from 'patron-oop';
export declare class StagePosition implements GuestObjectType<MapObjectDocument> {
    private stageMove;
    constructor(stageMove: StageMoveType);
    give(value: MapObjectDocument): this;
}
