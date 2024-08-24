import { KonvaStage } from '@/modules/integration/konva/KonvaStage';
import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { Value } from '@/modules/system/guest/Value';
import { Guest } from '@/modules/system/guest/Guest';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { Patron } from '@/modules/system/guest/Patron';
import { Visitant } from '@/modules/system/guest/Visitant';
import { Stage } from 'konva/lib/Stage';

export class MapObjectsVisible {
  private theMapObjects = new Value([], this);

  public constructor(konvaStage: KonvaStage, mapCurrent: MapCurrent) {
    const chain = new GuestChain<{stage: Stage, objects: MapObjectDocument[]}>();
    konvaStage.stage(new Patron(chain.receiveKey('stage')));
    mapCurrent.mapObjects(new Patron(chain.receiveKey('objects')));
    chain.result(new Patron(new Visitant(({ stage, objects }) => {
      console.log('calc visible objects', stage, objects);
    })));
  }

  public objects(guest: Guest<MapObjectDocument[]>) {
    this.theMapObjects.receiving(guest);
  }
}
