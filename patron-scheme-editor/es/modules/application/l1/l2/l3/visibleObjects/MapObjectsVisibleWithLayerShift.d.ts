import { GuestObjectType, FactoryType, ChainType } from 'patron-oop';
import { MapObjectDocument } from '../map/documents/MapStructures';
import { LayerBase } from '../types/LayerBase';
import { MapObjectsType } from '../map/mapObject/MapObjectType';
/**
 * Видимые объекты с добавленным смешением относительно прокрутки карты
 */
export declare class MapObjectsVisibleWithLayerShift implements MapObjectsType {
    private layerDep;
    private mapObjectsVisible;
    private factories;
    constructor(layerDep: LayerBase, mapObjectsVisible: MapObjectsType, factories: {
        chain: FactoryType<ChainType>;
        guestCast: FactoryType<GuestObjectType>;
        guestInTheMiddle: FactoryType<GuestObjectType>;
    });
    objects(guest: GuestObjectType<MapObjectDocument[]>): this;
}
