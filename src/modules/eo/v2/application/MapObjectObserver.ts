import { MapObject, MapStructure } from '@/entities/Map';
import { Mutable } from '@/modules/eo/targets/system/Mutable';
import { Observer } from '@/modules/eo/targets/system/Observer';

export class MapObjectObserver implements Observer<MapObject> {
  constructor(private map: Mutable<MapStructure>) {}

  notify(object: MapObject): void {
    console.log('mutate map with object', object);
  }
}
