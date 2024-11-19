import { Layer } from 'konva/lib/Layer';
import { BrowserCanvasType } from '../browser/canvas/BrowserCanvasType';
import { GuestObjectType, SourceType, ChainType, FactoryType, GuestAwareType, GuestValueType } from 'patron-oop';
import { KonvaPointDocument } from './KonvaPointDocument';
import { LayerBase } from '../../application/l1/l2/l3/types/LayerBase';
import { SizeDocument } from '../../application/l1/l2/l3/map/documents/SizeDocument';
import { StageMoveRestrictionType } from '../../application/l1/l2/l3/l4/types/stage/StageMoveRestrictionType';
export declare class KonvaLayer implements LayerBase {
    private canvasDep;
    private stageMoveRestriction;
    private factories;
    private guestChain;
    private positionCache;
    private layerCache;
    constructor(canvasDep: BrowserCanvasType, stageSizeDep: GuestAwareType<SizeDocument>, stageMoveRestriction: StageMoveRestrictionType, factories: {
        chain: FactoryType<ChainType<{
            canvas: HTMLElement;
        }>>;
        cache: FactoryType<SourceType>;
        sourceEmpty: FactoryType<SourceType>;
        guest: FactoryType<GuestObjectType>;
        patron: FactoryType<GuestObjectType>;
        guestSync: FactoryType<GuestValueType>;
    });
    layer<R extends GuestObjectType<Layer>>(guest: R): R;
    position<R extends GuestObjectType<KonvaPointDocument>>(guest: R): R;
    give(value: Layer): this;
}
