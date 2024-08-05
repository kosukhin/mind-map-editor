import { MapObjectStructure, MapStructure } from '@/entities/MapStructures';
import { Mutable } from '@/modules/eo/targets/system/Mutable';
import { Observer } from '@/modules/eo/targets/system/Observer';

export class MapObjectObserver implements Observer<MapObjectStructure> {
  constructor(private map: Mutable<MapStructure>) {}

  notify(object: MapObjectStructure): void {
    console.log('mutate map with object', object);
  }
}
