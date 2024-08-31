import { MapCurrent } from '@/modules/application/map/MapCurrent';
import { Cache } from '@/modules/system/guest/Cache';
import { Guest } from '@/modules/system/guest/Guest';
import { MapObjectDocument } from '@/modules/entities/MapStructures';
import { GuestChain } from '@/modules/system/guest/GuestChain';
import { Patron } from '@/modules/system/guest/Patron';
import { Visitant } from '@/modules/system/guest/Visitant';
import { Layer } from 'konva/lib/Layer';
import { Stage } from 'konva/lib/Stage';
import { MapObjects } from '@/modules/application/mapObject/MapObject';
import { LayerBase } from '@/modules/application/layer/LayerBase';
import { BrowserCanvas } from '@/modules/integration/browser/canvas/BrowserCanvas';
import { SizeDocument } from '@/modules/entities/SizeDocument';

export class MapObjectsVisible implements MapObjects {
  private visibleObjectsCache = new Cache<MapObjectDocument[]>(this);

  public constructor(konvaStage: LayerBase, canvas: BrowserCanvas, mapCurrent: MapCurrent) {
    const chain = new GuestChain<{layer: Layer, size: SizeDocument, objects: MapObjectDocument[]}>();
    canvas.size(new Patron(chain.receiveKey('size')));
    konvaStage.layer(new Patron(chain.receiveKey('layer')));
    mapCurrent.mapObjects(new Patron(chain.receiveKey('objects')));
    chain.result(new Patron(new Visitant(({ layer, size, objects }) => {
      const stage = layer.parent as unknown as Stage;
      if (!stage) {
        return;
      }
      console.log('visible before');
      const visibleObjects = objects.filter((object) => this.isInBoundings(stage, size, object.position));
      console.log(visibleObjects);
      this.visibleObjectsCache.receive(visibleObjects);
    })));
  }

  public objects(guest: Guest<MapObjectDocument[]>) {
    this.visibleObjectsCache.receiving(guest);
    return this;
  }

  private isInBoundings(stage: Stage, size: SizeDocument, position: [number, number]) {
    const stageStartX = stage.x() + 100;
    const stageEndX = stage.x() - size.width;
    const stageStartY = stage.y() + 100;
    const stageEndY = stage.y() - size.height;
    const [objectX, objectY] = position;
    return (
      stageStartX > -objectX
      && -objectX > stageEndX
      && stageStartY > -objectY
      && -objectY > stageEndY
    );
  }
}
