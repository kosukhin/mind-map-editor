import { StageMoveType } from './StageMoveType';
import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';
import { MapDocument } from '../../l3/map/documents/MapStructures';
export declare class StagePositionByObjectId {
    private stageMove;
    private factories;
    constructor(stageMove: StageMoveType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    move(map: GuestAwareType<MapDocument>, objectId: string): this;
}
