import { MapStructure, MapType } from '@/entities/Map';
import { Mutable } from '@/modules/eo/targets/system/Mutable';
import { Observer } from '@/modules/eo/targets/system/Observer';

export class MapTypeObserver implements Observer<MapType> {
  constructor(private map: Mutable<MapStructure>) {}

  notify(type: MapType): void {
    console.log('mutate map with type', type);
  }
}
