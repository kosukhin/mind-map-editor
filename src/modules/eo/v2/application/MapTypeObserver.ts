import { Mutable } from '@/modules/eo/targets/system/Mutable';
import { Observer } from '@/modules/eo/targets/system/Observer';
import { MapStructure, MapType } from '@/entities/Map';
bserver';

export class MapTypeObserver implements Observer<MapType> {
  constructor(private map: Mutable<MapStructure>) {}

  notify(type: MapType): void {
    console.log('mutate map with type', type);
  }
}
