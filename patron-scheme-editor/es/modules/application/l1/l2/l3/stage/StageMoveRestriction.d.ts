import { BrowserCanvasType } from '../../../../../integration/browser/canvas/BrowserCanvasType';
import { GuestAwareType, GuestObjectType, FactoryType } from 'patron-oop';
import { SizeDocument } from '../map/documents/SizeDocument';
import { PointDocument } from '../map/documents/PointDocument';
import { StageMoveRestrictionType } from '../l4/types/stage/StageMoveRestrictionType';
export declare class StageMoveRestriction implements StageMoveRestrictionType {
    private canvasDep;
    private stageSize;
    private factories;
    constructor(canvasDep: BrowserCanvasType, stageSize: GuestAwareType<SizeDocument>, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    position(pos: PointDocument, guest: GuestObjectType<PointDocument>): GuestObjectType;
}
