import { StageMoveType } from '../../application/l1/l2/visualisation/stage/StageMoveType';
import { LayerBase } from '../../application/l1/l2/l3/types/LayerBase';
import { FactoryType, GuestObjectType, GuestAwareType } from 'patron-oop';
import { SizeDocument } from '../../application/l1/l2/l3/map/documents/SizeDocument';
import { BrowserCanvas } from '../browser/canvas/BrowserCanvas';
import { MapObjectDocument } from '../../application/l1/l2/l3/map/documents/MapStructures';
import { StageMoveRestrictionType } from '../../application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
/**
 * Сдвиг стейджа в новую позицию
 */
export declare class KonvaMove implements StageMoveType {
    private layer;
    private canvas;
    private stageSize;
    private stageMoveRestriction;
    private factories;
    constructor(layer: LayerBase, canvas: BrowserCanvas, stageSize: GuestAwareType<SizeDocument>, stageMoveRestriction: StageMoveRestrictionType, factories: {
        guest: FactoryType<GuestObjectType>;
    });
    move(object: MapObjectDocument): void;
}
