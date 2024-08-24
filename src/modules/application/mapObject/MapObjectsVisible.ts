import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { Value } from '@/modules/system/guest/Value';
import { Guest } from '@/modules/system/guest/Guest';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { Patron } from '@/modules/system/guest/Patron';
import { Visitant } from '@/modules/system/guest/Visitant';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { MapObjects } from '@/modules/application/mapObject/MapObject';
import { LayerBase } from '@/modules/application/layer/LayerBase';

export class MapObjectsVisible implements MapObjects {
  private theMapObjects = new Value<MapObjectDocument[]>([], this);

  public constructor(konvaStage: LayerBase, mapCurrent: MapCurrent) {
    const chain = new GuestChain<{layer: Layer, objects: MapObjectDocument[]}>();
    konvaStage.layer(new Patron(chain.receiveKey('layer')));
    mapCurrent.mapObjects(new Patron(chain.receiveKey('objects')));
    chain.result(new Patron(new Visitant(({ layer, objects }) => {
      const stage = layer.parent as unknown as Stage;
      if (!stage) {
        return;
      }
      const visibleObjects = objects.filter((object) => this.isInBoundings(stage, object.position));
      console.log('visible objects', visibleObjects);
      this.theMapObjects.receive(visibleObjects);
    })));
  }

  public objects(guest: Guest<MapObjectDocument[]>) {
    this.theMapObjects.receiving(guest);
    return this;
  }

  private isInBoundings(stage: Stage, position: [number, number]) {
    const stageStartX = stage.x() + 100;
    const stageEndX = stage.x() - stage.width();
    const stageStartY = stage.y() + 100;
    const stageEndY = stage.y() - stage.height();
    const [objectX, objectY] = position;
    return (
      stageStartX > -objectX
      && -objectX > stageEndX
      && stageStartY > -objectY
      && -objectY > stageEndY
    );
  }
}
